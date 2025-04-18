import { sha256 } from "@oslojs/crypto/sha2";
import {
	encodeBase32LowerCaseNoPadding,
	encodeHexLowerCase,
} from "@oslojs/encoding";
import { db } from "@train/database";
import { type Session, sessionTable, userTable } from "@train/database/schemas";
import { eq } from "drizzle-orm";

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 days

export function generateSessionToken() {
	const bytes = new Uint8Array(20);

	crypto.getRandomValues(bytes);

	const token = encodeBase32LowerCaseNoPadding(bytes);

	return token;
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const session: Session = {
		id: sessionId,
		userId: userId,
		expiresAt: new Date(Date.now() + SESSION_DURATION),
	};

	await db.insert(sessionTable).values(session);

	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const [dbSession] = await db
		.select({ user: userTable, session: sessionTable })
		.from(sessionTable)
		.innerJoin(userTable, eq(sessionTable.userId, userTable.id))
		.where(eq(sessionTable.id, sessionId));

	if (!dbSession) {
		return { session: null, user: null };
	}

	const { user, session } = dbSession;

	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessionTable).where(eq(sessionTable.id, session.id));

		return { session: null, user: null };
	}

	if (Date.now() >= session.expiresAt.getTime() - SESSION_DURATION / 2) {
		session.expiresAt = new Date(Date.now() + SESSION_DURATION);

		await db
			.update(sessionTable)
			.set({
				expiresAt: session.expiresAt,
			})
			.where(eq(sessionTable.id, session.id));
	}

	return { session, user };
}

export async function invalidateSession(sessionId: string) {
	await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export function setSessionTokenCookie(headers: Headers, token: string): void {
	if (process.env.NODE_ENV === "production") {
		// When deployed over HTTPS
		headers.append(
			"Set-Cookie",
			`session=${token}; HttpOnly; SameSite=Lax; Expires=${SESSION_DURATION}; Path=/; Secure;`,
		);
	} else {
		// When deployed over HTTP (localhost)
		headers.append(
			"Set-Cookie",
			`session=${token}; HttpOnly; SameSite=Lax; Expires=${SESSION_DURATION}; Path=/`,
		);
	}
}

export function deleteSessionTokenCookie(headers: Headers): void {
	if (process.env.NODE_ENV === "production") {
		// When deployed over HTTPS
		headers.append(
			"Set-Cookie",
			"session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;",
		);
	} else {
		// When deployed over HTTP (localhost)
		headers.append(
			"Set-Cookie",
			"session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/",
		);
	}
}
