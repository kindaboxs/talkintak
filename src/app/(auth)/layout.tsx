import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

interface Props {
	children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) return redirect("/");

	return (
		<div className="bg-muted flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
			<main className="w-full max-w-sm md:max-w-3xl">{children}</main>
		</div>
	);
}
