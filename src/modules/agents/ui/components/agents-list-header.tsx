"use client";

import { useState } from "react";

import { PlusIcon, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE } from "@/constants";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { AgentsSearchFilter } from "@/modules/agents/ui/components/agents-search-filter";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

export const AgentsListHeader = () => {
	const [filters, setFilters] = useAgentsFilters();
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const isAnyFilterModified = !!filters.search;

	const onClearFilters = async () => {
		await setFilters({ search: "", page: DEFAULT_PAGE });
	};

	return (
		<>
			<NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
			<div className="flex flex-col gap-y-4 p-4 md:px-8">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">My Agents</h2>
					<Button onClick={() => setIsDialogOpen((prev) => !prev)}>
						<PlusIcon />
						New Agent
					</Button>
				</div>

				<div className="flex items-center gap-x-2 p-1">
					<AgentsSearchFilter />
					{isAnyFilterModified && (
						<Button onClick={onClearFilters} variant="outline" size="sm">
							<XCircleIcon />
							Clear
						</Button>
					)}
				</div>
			</div>
		</>
	);
};
