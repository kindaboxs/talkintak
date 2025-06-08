import { ChevronsUpDown, CreditCard, LogOut } from "lucide-react";

import { GeneratedAvatar } from "@/components/global/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
						<CreditCard />
						Billing
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onSignOut}>
					<LogOut />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
