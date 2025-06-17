import { ResponsiveDialog } from "@/components/global/responsive-dialog";
import type { AgentGetOneResponse } from "@/modules/agents/types";
import { AgentForm } from "@/modules/agents/ui/components/agent-form";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialValues: AgentGetOneResponse;
}

export const UpdateAgentDialog = ({
	open,
	onOpenChange,
	initialValues,
}: Props) => {
	return (
		<ResponsiveDialog
			title="Update Agent"
			description="Update the agent details."
			open={open}
			onOpenChange={onOpenChange}
		>
			<AgentForm
				onSuccess={() => onOpenChange(false)}
				onCancel={() => onOpenChange(false)}
				initialValues={initialValues}
			/>
		</ResponsiveDialog>
	);
};
