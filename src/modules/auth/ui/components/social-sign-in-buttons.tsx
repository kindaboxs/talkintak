import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";

interface Props {
	onPending?: boolean;
}

export const SocialSignInButtons = ({ onPending }: Props) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Button
				variant="outline"
				type="button"
				className="w-full"
				disabled={onPending}
			>
				<FaGoogle />
			</Button>
			<Button
				variant="outline"
				type="button"
				className="w-full"
				disabled={onPending}
			>
				<FaGithub />
			</Button>
		</div>
	);
};
