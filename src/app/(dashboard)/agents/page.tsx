import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import {
	AgentsView,
	AgentsViewError,
	AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { api, HydrateClient } from "@/trpc/server";

export default async function AgentsPage() {
	void api.agents.getMany.prefetch();

	return (
		<HydrateClient>
			<Suspense fallback={<AgentsViewLoading />}>
				<ErrorBoundary fallback={<AgentsViewError />}>
					<AgentsView />
				</ErrorBoundary>
			</Suspense>
		</HydrateClient>
	);
}
