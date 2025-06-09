"use client";

import { ErrorState } from "@/components/global/error-state";
import { LoadingState } from "@/components/global/loading-state";
import { api } from "@/trpc/react";

export const AgentsView = () => {
	const [data] = api.agents.getMany.useSuspenseQuery();

	return (
		<div>
			<h1>AgentsView</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
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
