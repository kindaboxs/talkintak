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
	let avatar;

	if (variant === "bottts-neutral") {
		avatar = createAvatar(botttsNeutral, {
			seed,
		});
	} else if (variant === "thumbs") {
		avatar = createAvatar(thumbs, {
			seed,
		});
	} else {
		avatar = createAvatar(initials, {
			seed,
			fontWeight: 500,
			fontSize: 42,
		});
	}

	return (
		<Avatar className={cn(className)}>
			<AvatarImage src={avatar.toDataUri()} alt={seed} />
			<AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
		</Avatar>
	);
};
