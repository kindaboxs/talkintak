import { redirect } from "next/navigation";

import { getSessionAction } from "@/actions/get-session-action";
import { HomeView } from "@/modules/home/ui/views/home-view";

export default async function HomePage() {
	const session = await getSessionAction();

	if (!session) return redirect("/sign-in");

	return <HomeView />;
}
