import { ChevronsUpDown, CreditCardIcon, LogOutIcon } from "lucide-react";

import { GeneratedAvatar } from "@/components/global/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import type { Session } from "@/lib/auth/types";

interface Props {
	user: Session["user"];
	isMobile: boolean;
	onSignOut: () => Promise<void>;
}

const AvatarUser = ({ user }: { user: Session["user"] }) => {
	if (!user.image) {
		return (
			<GeneratedAvatar
				seed={user.name}
				variant="thumbs"
				className="size-8 rounded-lg"
			/>
		);
	}

	return (
		<Avatar className="size-8 rounded-lg">
			<AvatarImage src={user.image} alt={user.name} />
			<AvatarFallback className="rounded-lg">
				{user.name.charAt(0).toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
};

export const DashboardUserButton = ({ user, isMobile, onSignOut }: Props) => {
	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
					>
						<AvatarUser user={user} />
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{user.name}</span>
							<span className="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDown className="ml-auto size-4" />
					</SidebarMenuButton>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="font-normal">
						<div className="flex items-center gap-2 text-left text-sm">
							<AvatarUser user={user} />
							<div className="grid flex-1 text-left text-sm leading-tight">
								<DrawerTitle className="truncate font-semibold">
									{user.name}
								</DrawerTitle>
								<DrawerDescription className="truncate text-xs">
									{user.email}
								</DrawerDescription>
							</div>
						</div>
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant="outline" className="w-full">
								<CreditCardIcon />
								Billing
							</Button>
						</DrawerClose>
						<DrawerClose asChild>
							<Button variant="default" onClick={onSignOut} className="w-full">
								<LogOutIcon />
								Sign out
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
				>
					<AvatarUser user={user} />
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">{user.name}</span>
						<span className="truncate text-xs">{user.email}</span>
					</div>
					<ChevronsUpDown className="ml-auto size-4" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				side={isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<AvatarUser user={user} />
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{user.name}</span>
							<span className="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<CreditCardIcon />
						Billing
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onSignOut}>
					<LogOutIcon />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
