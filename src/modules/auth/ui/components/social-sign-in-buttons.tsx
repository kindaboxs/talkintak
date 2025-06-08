import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";

interface Props {
	onPending?: boolean;
	onSocialSignIn?: (provider: "github" | "google") => Promise<void>;
	onSocialPending?: "github" | "google" | null;
}

export const SocialSignInButtons = ({
	onPending,
	onSocialSignIn,
	onSocialPending,
}: Props) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Button
				variant="outline"
				type="button"
				className="w-full"
				disabled={!!onPending || onSocialPending === "google"}
				onClick={() => onSocialSignIn?.("google")}
			>
				<FaGoogle />
			</Button>
			<Button
				variant="outline"
				type="button"
				className="w-full"
				disabled={!!onPending || onSocialPending === "github"}
				onClick={() => onSocialSignIn?.("github")}
			>
				<FaGithub />
			</Button>
		</div>
	);
};
