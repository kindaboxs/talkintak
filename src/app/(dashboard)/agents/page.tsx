import { Suspense } from "react";
import { redirect } from "next/navigation";

import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";

import { getSessionAction } from "@/actions/get-session-action";
import { loadAgentsSearchParams } from "@/modules/agents/params";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import {
	AgentsView,
	AgentsViewError,
	AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { api, HydrateClient } from "@/trpc/server";

interface Props {
	searchParams: Promise<SearchParams>;
}

export default async function AgentsPage({ searchParams }: Props) {
	const filters = await loadAgentsSearchParams(searchParams);

	const session = await getSessionAction();

	if (!session) return redirect("/sign-in");

	void api.agents.getMany.prefetch({ ...filters });

	return (
		<>
			<AgentsListHeader />
			<HydrateClient>
				<Suspense fallback={<AgentsViewLoading />}>
					<ErrorBoundary fallback={<AgentsViewError />}>
						<AgentsView />
					</ErrorBoundary>
				</Suspense>
			</HydrateClient>
		</>
	);
}
