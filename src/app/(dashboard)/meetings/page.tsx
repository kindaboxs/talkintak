import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ErrorBoundary } from "react-error-boundary";

import { getSessionAction } from "@/actions/get-session-action";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import {
	MeetingsView,
	MeetingsViewError,
	MeetingsViewLoading,
} from "@/modules/meetings/ui/views/meetings-view";
import { api, HydrateClient } from "@/trpc/server";

export default async function MeetingsPage() {
	const session = await getSessionAction();

	if (!session) return redirect("/sign-in");

	void api.meetings.getMany.prefetch({});

	return (
		<>
			<MeetingsListHeader />
			<HydrateClient>
				<Suspense fallback={<MeetingsViewLoading />}>
					<ErrorBoundary fallback={<MeetingsViewError />}>
						<MeetingsView />
					</ErrorBoundary>
				</Suspense>
			</HydrateClient>
		</>
	);
}
