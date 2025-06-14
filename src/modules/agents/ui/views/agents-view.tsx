"use client";

import { EmptyState } from "@/components/global/empty-state";
import { ErrorState } from "@/components/global/error-state";
import { LoadingState } from "@/components/global/loading-state";
import { columns } from "@/modules/agents/ui/components/columns";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { api } from "@/trpc/react";

export const AgentsView = () => {
	const [data] = api.agents.getMany.useSuspenseQuery();

	return (
		<div className="flex flex-1 flex-col gap-4 px-4 pb-4 md:px-8">
			<DataTable columns={columns} data={data} />
			{data.length === 0 && (
				<EmptyState
					title="Create your first agent"
					description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
				/>
			)}
		</div>
	);
};

export const AgentsViewLoading = () => {
	return (
		<LoadingState
			title="Load Agents"
			description="This may take a few seconds"
		/>
	);
};

export const AgentsViewError = () => {
	return (
		<ErrorState
			title="Error Loading Agents"
			description="This may be a temporary issue, please try again later"
		/>
	);
};
