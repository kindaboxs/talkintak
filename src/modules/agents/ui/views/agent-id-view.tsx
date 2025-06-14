"use client";

import { VideoIcon } from "lucide-react";

import { ErrorState } from "@/components/global/error-state";
import { GeneratedAvatar } from "@/components/global/generated-avatar";
import { LoadingState } from "@/components/global/loading-state";
import { Badge } from "@/components/ui/badge";
import { AgentIdViewHeader } from "@/modules/agents/ui/components/agent-id-view-header";
import { api } from "@/trpc/react";

interface Props {
	agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
	const [data] = api.agents.getOne.useSuspenseQuery({ id: agentId });

	return (
		<div className="flex flex-1 flex-col gap-y-4 p-4 md:px-8">
			<AgentIdViewHeader
				agentId={agentId}
				agentName={data.name}
				onEdit={() => {}}
				onRemove={() => {}}
			/>

			<div className="bg-background rounded-lg border">
				<div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
					<div className="flex items-center gap-x-3">
						<GeneratedAvatar
							variant="bottts-neutral"
							seed={data.name}
							className="size-10"
						/>

						<h2 className="text-2xl font-medium">{data.name}</h2>
					</div>

					<Badge
						variant="outline"
						className="flex items-center gap-x-2 [&>svg]:size-4"
					>
						<VideoIcon />
						{data.meetingCount}{" "}
						{data.meetingCount === 1 ? "meeting" : "meetings"}
					</Badge>

					<div className="flex flex-col gap-y-4">
						<p className="text-lg font-medium">Instructions</p>
						<p className="text-muted-foreground">{data.instructions}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export const AgentsIdViewLoading = () => {
	return (
		<LoadingState
			title="Load Agent"
			description="This may take a few seconds"
		/>
	);
};

export const AgentsIdViewError = () => {
	return (
		<ErrorState
			title="Error Loading Agent"
			description="This may be a temporary issue, please try again later"
		/>
	);
};
