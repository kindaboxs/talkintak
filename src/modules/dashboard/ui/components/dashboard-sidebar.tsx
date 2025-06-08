"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import { toast } from "sonner";

import { BoxsIcon } from "@/components/global/boxs-icon";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth/client";
import { cn } from "@/lib/utils";
import { DashboardUserButton } from "@/modules/dashboard/ui/components/dashboard-user-button";

const firstSection = [
	{
		label: "Meetings",
		icon: VideoIcon,
		href: "/meetings",
	},
	{
		label: "Agents",
		icon: BotIcon,
		href: "/agents",
	},
];

const secondSection = [
	{
		label: "Upgrade",
		icon: StarIcon,
		href: "/upgrade",
	},
];

export const DashboardSidebar = () => {
	const pathname = usePathname();
	const router = useRouter();

	const { data: session, isPending } = useSession();
	const { isMobile } = useSidebar();

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					router.refresh();
				},
				onError: (ctx) => {
					toast.error("Sign out failed", {
						id: "sign-out-error",
						description: ctx.error.message,
					});
				},
			},
		});
	};

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							className="text-sidebar-accent-foreground cursor-pointer"
							asChild
						>
							<Link href="/">
								<div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-transparent">
									<BoxsIcon className="size-7" />
								</div>
								<span className="text-2xl font-bold">TalkIntak</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup className="group-data-[collapsible=icon]:hidden">
					<SidebarGroupLabel>Applications</SidebarGroupLabel>
					<SidebarGroupContent className="flex flex-col gap-2">
						<SidebarMenu>
							{firstSection.map((item, index) => (
								<SidebarMenuItem key={index}>
									<SidebarMenuButton
										className={cn("transition-all duration-300 ease-in-out", {
											"bg-primary text-primary-foreground":
												pathname === item.href,
										})}
										tooltip={item.label}
										asChild
									>
										<Link href={item.href}>
											<item.icon />
											<span className="text-sm font-medium tracking-tight">
												{item.label}
											</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{secondSection.map((item, index) => (
								<SidebarMenuItem key={index}>
									<SidebarMenuButton
										className={cn("transition-all duration-300 ease-in-out", {
											"bg-primary text-primary-foreground":
												pathname === item.href,
										})}
										tooltip={item.label}
										asChild
									>
										<Link href={item.href}>
											<item.icon />
											<span className="text-sm font-medium tracking-tight">
												{item.label}
											</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						{isPending || !session?.user ? (
							<Skeleton className="h-12 w-full" />
						) : (
							<DashboardUserButton
								user={session.user}
								isMobile={isMobile}
								onSignOut={handleSignOut}
							/>
						)}
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
