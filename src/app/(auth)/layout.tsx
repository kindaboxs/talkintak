import { redirect } from "next/navigation";

import { getSessionAction } from "@/actions/get-session-action";

interface Props {
	children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
	const session = await getSessionAction();

	if (!!session) return redirect("/");

	return (
		<div className="bg-muted flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
			<main className="w-full max-w-sm md:max-w-3xl">{children}</main>
		</div>
	);
}
