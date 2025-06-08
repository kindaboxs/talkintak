"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { BoxsIcon } from "@/components/global/boxs-icon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn, signUp } from "@/lib/auth/client";
import { signUpSchema, type SignUpSchemaType } from "@/modules/auth/schemas";
import { SocialSignInButtons } from "@/modules/auth/ui/components/social-sign-in-buttons";

export const SignUpView = () => {
	const [pending, setPending] = useState<boolean>(false);
	const [socialPending, setSocialPending] = useState<
		"github" | "google" | null
	>(null);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();

	const form = useForm<SignUpSchemaType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "all",
	});

	const onSubmitForm = async (data: SignUpSchemaType) => {
		await signUp.email(
			{
				name: data.name,
				email: data.email,
				password: data.password,
			},
			{
				onRequest: () => {
					setPending(true);
				},
				onSuccess: () => {
					setPending(false);
					router.push("/");
				},
				onError: (ctx) => {
					setPending(false);
					setError(ctx.error?.message);
				},
			}
		);
	};

	const onSocialSignIn = async (provider: "github" | "google") => {
		await signIn.social(
			{ provider, callbackURL: "/" },
			{
				onRequest: () => {
					setSocialPending(provider);
				},
				onSuccess: () => {
					setSocialPending(null);
				},
				onError: (ctx) => {
					setSocialPending(null);
					setError(ctx.error?.message);
				},
			}
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<Card className="overflow-hidden p-0">
				<CardContent className="grid grid-cols-1 p-0 md:grid-cols-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmitForm)}
							className="p-6 md:p-8"
						>
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<h1 className="text-2xl font-bold">Let&apos;s get started</h1>
									<p className="text-muted-foreground text-balance">
										Create your account
									</p>
								</div>

								<div className="grid gap-3">
									<FormField
										name="name"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														type="text"
														placeholder="Name"
														className="w-full"
														disabled={pending}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										name="email"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="Email"
														className="w-full"
														disabled={pending}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										name="password"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="Password"
														className="w-full"
														disabled={pending}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										name="confirmPassword"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Confirm Password</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="Password"
														className="w-full"
														disabled={pending}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{error && (
									<Alert
										variant="destructive"
										className="bg-destructive/10 border-none"
									>
										<AlertCircleIcon />
										<AlertTitle>Sign up failed</AlertTitle>
										<AlertDescription>
											<p>{error}</p>
										</AlertDescription>
									</Alert>
								)}

								<Button
									type="submit"
									className="w-full"
									disabled={pending || form.formState.isSubmitting}
								>
									Sign up
								</Button>

								<div className="flex items-center justify-center gap-2">
									<Separator className="flex-1" />
									<span className="text-muted-foreground">
										or continue with
									</span>
									<Separator className="flex-1" />
								</div>

								<SocialSignInButtons
									onPending={pending}
									onSocialSignIn={onSocialSignIn}
									onSocialPending={socialPending}
								/>

								<div className="flex items-center justify-center gap-2">
									<p className="text-muted-foreground text-sm">
										Already have an account?
									</p>
									<Button variant="link" size="sm" className="p-0" asChild>
										<Link href="/sign-in">Sign in</Link>
									</Button>
								</div>
							</div>
						</form>
					</Form>

					<div className="relative hidden flex-col items-center justify-center gap-4 bg-radial from-neutral-700 to-neutral-900 md:flex">
						<BoxsIcon className="size-24" />
						<p className="text-4xl font-semibold">Talkintak</p>
					</div>
				</CardContent>
			</Card>

			<div className="flex items-center justify-center gap-2 text-xs">
				<p className="text-muted-foreground">By signing up, you agree to our</p>
				<Button variant="link" size="sm" className="p-0 text-xs" asChild>
					<Link href="#">Terms of Service</Link>
				</Button>
				<p className="text-muted-foreground">and</p>
				<Button variant="link" size="sm" className="p-0 text-xs" asChild>
					<Link href="#">Privacy Policy</Link>
				</Button>
			</div>
		</div>
	);
};
