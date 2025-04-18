import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const { data, isLoading, isError } = useQuery(trpc.user.list.queryOptions());

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError || !data) {
		return <div>Ocurrió un error</div>;
	}

	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			{data.users.length === 0 ? (
				<p>No hay usuarios creados</p>
			) : (
				<p>{data.users.map((user) => user.name).join(", ")}</p>
			)}
		</div>
	);
}
