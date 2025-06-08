"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signOut, signUp, useSession } from "@/lib/auth/client";

export default function HomePage() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const router = useRouter();

	const { data: session } = useSession();

	const handleSignUp = async () => {
		await signUp.email(
			{
				name,
				email,
				password,
			},
			{
				onSuccess: () => {
					window.alert("Sign up successfully");
				},
				onError: (ctx) => {
					window.alert(`Sign up failed, ${ctx.error.message}`);
				},
			}
		);
	};

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

	const handleSignIn = async () => {
		await signIn.email(
			{
				email,
				password,
			},
			{
				onSuccess: () => {
					window.alert("Sign in successfully");
				},
				onError: (ctx) => {
					window.alert(`Sign in failed, ${ctx.error.message}`);
				},
			}
		);
	};

	if (session) {
		return (
			<div className="flex flex-col gap-4 p-4">
				<h1>You are signed in as {session.user.name}</h1>
				<Button onClick={handleSignOut}>Sign Out</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8 p-4">
			<div className="flex flex-col gap-4 p-4">
				<Input
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<Input
					value={password}
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<Button onClick={handleSignIn}>Sign In</Button>
			</div>
			<div className="flex flex-col gap-4 p-4">
				<Input
					value={name}
					type="text"
					onChange={(e) => setName(e.target.value)}
					placeholder="Name"
				/>
				<Input
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<Input
					value={password}
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<Button onClick={handleSignUp}>Sign Up</Button>
			</div>
		</div>
	);
}
