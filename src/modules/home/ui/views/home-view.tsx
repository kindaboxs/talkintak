"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth/client";
import { api } from "@/trpc/react";

export const HomeView = () => {
	const router = useRouter();

	const { data: session, isPending, error } = useSession();

	const [helo] = api.post.hello.useSuspenseQuery({ text: "Kotak" });

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					router.refresh();
				},
				onError: (ctx) => {
					window.alert(`Sign out failed, ${ctx.error.message}`);
				},
			},
		});
	};

	if (isPending) {
		return (
			<div className="flex flex-col gap-4 p-4">
				<h1>Loading...</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col gap-4 p-4">
				<h1>Error: {error.message}</h1>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 p-4">
			<h1>You are signed in as {session?.user?.name}</h1>
			<h1>{helo.greeting}</h1>
			<Button onClick={handleSignOut}>Sign Out</Button>
		</div>
	);
};
