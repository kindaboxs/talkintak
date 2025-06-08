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
import { signIn } from "@/lib/auth/client";
import { signInSchema, type SignInSchemaType } from "@/modules/auth/schemas";
import { SocialSignInButtons } from "@/modules/auth/ui/components/social-sign-in-buttons";

export const SignInView = () => {
	const [pending, setPending] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();

	const form = useForm<SignInSchemaType>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "all",
	});

	const onSubmitForm = async (data: SignInSchemaType) => {
		await signIn.email(
			{
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
									<h1 className="text-2xl font-bold">Welcome back</h1>
									<p className="text-muted-foreground text-balance">
										Sign in to your account
									</p>
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

								{error && (
									<Alert
										variant="destructive"
										className="bg-destructive/10 border-none"
									>
										<AlertCircleIcon />
										<AlertTitle>Sign in failed</AlertTitle>
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
									Sign in
								</Button>

								<div className="flex items-center justify-center gap-2">
									<Separator className="flex-1" />
									<span className="text-muted-foreground">
										or continue with
									</span>
									<Separator className="flex-1" />
								</div>

								<SocialSignInButtons onPending={pending} />

								<div className="flex items-center justify-center gap-2">
									<p className="text-muted-foreground text-sm">
										Don&apos;t have an account?
									</p>
									<Button variant="link" size="sm" className="p-0" asChild>
										<Link href="/sign-up">Sign up</Link>
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
				<p className="text-muted-foreground">By signing in, you agree to our</p>
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
