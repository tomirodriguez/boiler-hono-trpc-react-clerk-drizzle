import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const {
		data: publicData,
		isLoading: isLoadingPublicData,
		isError: isPublicDataError,
		error: publicDataError,
	} = useQuery(trpc.user.list.queryOptions());
	const {
		data: privateData,
		isLoading: isLoadingPrivateData,
		isError: isPrivateDataError,
		error: privateDataError,
	} = useQuery(trpc.user.privateData.queryOptions());

	return (
		<div className="container space-y-2">
			<h3>Welcome Home!</h3>
			<div>
				<h3>Información publica</h3>
				{isLoadingPublicData && <p>Cargando información publica ...</p>}
				{((!isLoadingPublicData && !publicData) || isPublicDataError) && (
					<p>Error: {publicDataError?.message ?? "Error desconocido"}r</p>
				)}
				{publicData && publicData.users.length === 0 && (
					<p>No hay usuarios creados</p>
				)}
				{publicData && publicData.users.length > 0 && (
					<p>{publicData.users.map((user) => user.name).join(", ")}</p>
				)}
			</div>

			<div>
				<h3>Información privada</h3>

				{isLoadingPrivateData && <p>Cargando información privada ...</p>}
				{((!isLoadingPrivateData && !publicData) || isPrivateDataError) && (
					<p>Error: {privateDataError?.message ?? "Error desconocido"}</p>
				)}
				{privateData && (
					<p>
						{privateData.user.id} - {privateData.user.username}
					</p>
				)}
			</div>
		</div>
	);
}
