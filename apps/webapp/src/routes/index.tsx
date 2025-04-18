import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const { data, isLoading, isError } = useQuery(trpc.user.list.queryOptions());
	const {
		data: userData,
		isLoading: loadingUsers,
		isError: isErrorUser,
		error,
	} = useQuery(trpc.user.privateData.queryOptions());

	return (
		<div className="container space-y-2">
			<h3>Welcome Home!</h3>
			<div>
				<h3>Información publica</h3>
				{isLoading && <p>Cargando información publica ...</p>}
				{(!data || isError) && <p>Ocurrió un error</p>}
				{data && data.users.length === 0 && <p>No hay usuarios creados</p>}
				{data && data.users.length > 0 && (
					<p>{data.users.map((user) => user.name).join(", ")}</p>
				)}
			</div>

			<div>
				<h3>Información privada</h3>

				{loadingUsers && <p>Cargando información privada ...</p>}
				{(!data || isErrorUser) && <p>Error: {error?.message}</p>}
				{userData && (
					<p>
						{userData.user.id} - {userData.user.username}
					</p>
				)}
			</div>
		</div>
	);
}
