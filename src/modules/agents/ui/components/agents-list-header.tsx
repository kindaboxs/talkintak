"use client";

import { useState } from "react";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

export const AgentsListHeader = () => {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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
			</div>
		</>
	);
};
