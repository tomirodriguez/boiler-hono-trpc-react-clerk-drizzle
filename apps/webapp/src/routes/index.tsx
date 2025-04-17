import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const greetingQuery = useQuery(trpc.hello.queryOptions());

	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<p>{greetingQuery.data?.greeting}</p>
		</div>
	);
}
