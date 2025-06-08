import { useMemo } from "react";

import { botttsNeutral, initials, thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
	seed: string;
	className?: string;
	variant?: "initials" | "bottts-neutral" | "thumbs";
}

export const GeneratedAvatar = ({
	seed,
	className,
	variant = "initials",
}: Props) => {
	const avatar = useMemo(() => {
		const variants = {
			"bottts-neutral": () => createAvatar(botttsNeutral, { seed }),
			thumbs: () => createAvatar(thumbs, { seed }),
			initials: () =>
				createAvatar(initials, { seed, fontSize: 42, fontWeight: 500 }),
		};
		return variants[variant]();
	}, [variant, seed]);

	const avatarUri = useMemo(() => {
		try {
			return avatar.toDataUri();
		} catch (error) {
			console.warn("Failed to generate avatar:", error);
			return "";
		}
	}, [avatar]);

	return (
		<Avatar className={cn(className)}>
			<AvatarImage src={avatarUri} alt={seed} />
			<AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
		</Avatar>
	);
};
