import { useRouter } from "next/navigation";

import { ResponsiveDialog } from "@/components/global/responsive-dialog";
import { MeetingForm } from "@/modules/meetings/ui/components/meeting-form";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ open, onOpenChange }: Props) => {
	const router = useRouter();

	return (
		<ResponsiveDialog
			title="New Meeting"
			description="Create a new agent."
			open={open}
			onOpenChange={onOpenChange}
		>
			<MeetingForm
				onSuccess={(id) => {
					onOpenChange(false);
					router.push(`/meetings/${id}`);
				}}
				onCancel={() => onOpenChange(false)}
			/>
		</ResponsiveDialog>
	);
};
