"use client";

import { ErrorState } from "@/components/global/error-state";
import { LoadingState } from "@/components/global/loading-state";
import { api } from "@/trpc/react";

export const MeetingsView = () => {
	const [data] = api.meetings.getMany.useSuspenseQuery({});

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
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
