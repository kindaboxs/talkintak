import { redirect } from "next/navigation";

import { getSessionAction } from "@/actions/get-session-action";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { api, HydrateClient } from "@/trpc/server";

export default async function HomePage() {
	const session = await getSessionAction();

	if (!session) return redirect("/sign-in");

	void api.post.hello.prefetch({ text: "Kotak" });

	return (
		<HydrateClient>
			<HomeView />
		</HydrateClient>
	);
}
