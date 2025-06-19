"use client";

import { DataTable } from "@/components/global/data-table";
import { EmptyState } from "@/components/global/empty-state";
import { ErrorState } from "@/components/global/error-state";
import { LoadingState } from "@/components/global/loading-state";
import { meetingsColumns } from "@/modules/meetings/ui/components/meetings-columns";
import { api } from "@/trpc/react";

export const MeetingsView = () => {
	const [data] = api.meetings.getMany.useSuspenseQuery({});

	return (
		<div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
			<DataTable data={data.items} columns={meetingsColumns} />

			{data.items.length === 0 && (
				<EmptyState
					title="Create your first meeting"
					description="Schedule a meeting to connect with others. Each meeting let's you collaborate, share ideas, and interact with participants in real-time."
				/>
			)}
		</div>
	);
};

export const MeetingsViewLoading = () => {
	return (
		<LoadingState
			title="Load Meetings"
			description="This may take a few seconds"
		/>
	);
};

export const MeetingsViewError = () => {
	return (
		<ErrorState
			title="Error Loading Meetings"
			description="This may be a temporary issue, please try again later"
		/>
	);
};
