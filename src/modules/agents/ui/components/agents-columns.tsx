"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";

import { GeneratedAvatar } from "@/components/global/generated-avatar";
import { Badge } from "@/components/ui/badge";
import type { AgentGetManyResponse } from "@/modules/agents/types";

export const agentsColumns: ColumnDef<AgentGetManyResponse[number]>[] = [
	{
		accessorKey: "name",
		header: "Agent Name",
		cell: ({ row }) => (
			<div className="flex flex-col gap-y-1">
				<div className="flex items-center gap-x-2">
					<GeneratedAvatar
						seed={row.original.name}
						variant="bottts-neutral"
						className="size-6"
					/>

					<span className="font-semibold capitalize">{row.original.name}</span>
				</div>

				<div className="flex items-center gap-x-2">
					<CornerDownRightIcon className="text-muted-foreground size-3" />
					<span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
						{row.original.instructions}
					</span>
				</div>
			</div>
		),
	},
	{
		accessorKey: "meetingCount",
		header: "Meetings",
		cell: ({ row }) => (
			<Badge
				variant="outline"
				className="flex items-center gap-x-2 [&>svg]:size-4"
			>
				<VideoIcon className="text-blue-700" />
				{row.original.meetingCount}{" "}
				{row.original.meetingCount === 1 ? "meeting" : "meetings"}
			</Badge>
		),
	},
];
