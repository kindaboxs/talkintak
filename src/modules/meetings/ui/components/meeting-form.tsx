import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CommandSelect } from "@/components/global/command-select";
import { GeneratedAvatar } from "@/components/global/generated-avatar";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import {
	meetingInsertSchema,
	type MeetingInsertSchemaType,
} from "@/modules/meetings/schemas";
import type { MeetingGetOneResponse } from "@/modules/meetings/types";
import { api } from "@/trpc/react";

interface Props {
	onSuccess?: (id?: string) => void;
	onCancel?: () => void;
	initialValues?: MeetingGetOneResponse;
}

export const MeetingForm = ({ initialValues, onCancel, onSuccess }: Props) => {
	const [openNewAgentDialog, setOpenNewAgentDialog] = useState<boolean>(false);
	const [agentSearch, setAgentSearch] = useState<string>("");

	const agents = api.agents.getMany.useQuery({
		pageSize: 100,
		search: agentSearch,
	});

	const utils = api.useUtils();
	const createMeeting = api.meetings.create.useMutation({
		onSuccess: async (data) => {
			await utils.meetings.getMany.invalidate({});

			// TODO: invalidate free tier usage

			onSuccess?.(data.id);
		},

		onError: (error) => {
			toast.error("Failed to create meeting", {
				id: "create-meeting-error",
				description: error.message,
			});

			// TODO: check if error code is "FORBIDDEN", redirect to "/upgrade"
		},
	});

	const updateMeeting = api.meetings.update.useMutation({
		onSuccess: async () => {
			await utils.meetings.getMany.invalidate({});

			if (initialValues?.id) {
				await utils.meetings.getOne.invalidate({ id: initialValues.id });
			}

			onSuccess?.();
		},

		onError: (error) => {
			toast.error("Failed to update meeting", {
				id: "update-meeting-error",
				description: error.message,
			});

			// TODO: check if error code is "FORBIDDEN", redirect to "/upgrade"
		},
	});

	const form = useForm<MeetingInsertSchemaType>({
		resolver: zodResolver(meetingInsertSchema),
		defaultValues: {
			name: initialValues?.name ?? "",
			agentId: initialValues?.agentId ?? "",
		},
		mode: "all",
	});

	const isEdit = !!initialValues?.id;
	const isPending = createMeeting.isPending || updateMeeting.isPending;

	const onSubmitForm = (values: MeetingInsertSchemaType) => {
		if (isEdit) {
			// update
			updateMeeting.mutate({
				...values,
				id: initialValues.id,
			});
		} else {
			// create
			createMeeting.mutate(values);
		}
	};

	return (
		<>
			<NewAgentDialog
				open={openNewAgentDialog}
				onOpenChange={setOpenNewAgentDialog}
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
					<FormField
						name="name"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="e.g Coding consultation" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="agentId"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Agent</FormLabel>
								<FormControl>
									<CommandSelect
										options={(agents.data?.items ?? []).map((agent) => ({
											id: agent.id,
											value: agent.id,
											children: (
												<div className="flex items-center gap-x-2">
													<GeneratedAvatar
														seed={agent.name}
														variant="bottts-neutral"
														className="size-6 border"
													/>
													<span>{agent.name}</span>
												</div>
											),
										}))}
										onSelect={field.onChange}
										onSearch={setAgentSearch}
										value={field.value}
										placeholder="Select agent"
									/>
								</FormControl>
								<FormDescription>
									Not found you&apos;re agent?{" "}
									<Button
										variant="link"
										className="p-0"
										onClick={() => setOpenNewAgentDialog(true)}
									>
										Create new agent
									</Button>
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-between gap-2">
						{onCancel && (
							<Button
								variant="ghost"
								disabled={isPending}
								onClick={() => onCancel()}
							>
								Cancel
							</Button>
						)}
						<Button type="submit" disabled={isPending}>
							{isEdit ? "Update" : "Create"}
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
