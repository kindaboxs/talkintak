import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import {
	AgentIdView,
	AgentsIdViewError,
	AgentsIdViewLoading,
} from "@/modules/agents/ui/views/agent-id-view";
import { api, HydrateClient } from "@/trpc/server";

interface Props {
	params: Promise<{ agentId: string }>;
}

export default async function AgentDetailPage({ params }: Props) {
	const { agentId } = await params;

	void api.agents.getOne.prefetch({ id: agentId });

	return (
		<>
			<HydrateClient>
				<Suspense fallback={<AgentsIdViewLoading />}>
					<ErrorBoundary fallback={<AgentsIdViewError />}>
						<AgentIdView agentId={agentId} />
					</ErrorBoundary>
				</Suspense>
			</HydrateClient>
		</>
	);
}
