import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ErrorBoundary } from "react-error-boundary";

import { getSessionAction } from "@/actions/get-session-action";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import {
	AgentsView,
	AgentsViewError,
	AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { api, HydrateClient } from "@/trpc/server";

export default async function AgentsPage() {
	const session = await getSessionAction();

	if (!session) return redirect("/sign-in");

	void api.agents.getMany.prefetch();

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
