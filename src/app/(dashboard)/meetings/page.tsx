import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import {
	MeetingsView,
	MeetingsViewError,
	MeetingsViewLoading,
} from "@/modules/meetings/ui/views/meetings-view";
import { api, HydrateClient } from "@/trpc/server";

export default async function MeetingsPage() {
	void api.meetings.getMany.prefetch({});

	return (
		<HydrateClient>
			<Suspense fallback={<MeetingsViewLoading />}>
				<ErrorBoundary fallback={<MeetingsViewError />}>
					<MeetingsView />
				</ErrorBoundary>
			</Suspense>
		</HydrateClient>
	);
}
