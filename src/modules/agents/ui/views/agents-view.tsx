"use client";

import { useRouter } from "next/navigation";

import { DataTable } from "@/components/global/data-table";
import { EmptyState } from "@/components/global/empty-state";
import { ErrorState } from "@/components/global/error-state";
import { LoadingState } from "@/components/global/loading-state";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { agentsColumns } from "@/modules/agents/ui/components/agents-columns";
import { DataPagination } from "@/modules/agents/ui/components/data-pagination";
import { api } from "@/trpc/react";

export const AgentsView = () => {
	const [filters, setFilters] = useAgentsFilters();

	const router = useRouter();

	const [data] = api.agents.getMany.useSuspenseQuery({ ...filters });

	return (
		<div className="flex flex-1 flex-col gap-4 px-4 pb-4 md:px-8">
			<DataTable
				columns={agentsColumns}
				data={data.items}
				onRowClick={(row) => router.push(`/agents/${row.id}`)}
			/>

			<DataPagination
				page={filters.page}
				totalPages={data.totalPages}
				onPageChange={(page) => setFilters({ page })}
			/>

			{data.items.length === 0 && (
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
