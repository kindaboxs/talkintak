import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { GeneratedAvatar } from "@/components/global/generated-avatar";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	agentInsertSchema,
	type AgentInsertSchemaType,
} from "@/modules/agents/schemas";
import type { AgentGetOneResponse } from "@/modules/agents/types";
import { api } from "@/trpc/react";

interface Props {
	onSuccess?: () => void;
	onCancel?: () => void;
	initialValues?: AgentGetOneResponse;
}

export const AgentForm = ({ initialValues, onCancel, onSuccess }: Props) => {
	const utils = api.useUtils();
	const createAgent = api.agents.create.useMutation({
		onSuccess: async () => {
			await utils.agents.getMany.invalidate({});

			if (initialValues?.id) {
				await utils.agents.getOne.invalidate({ id: initialValues.id });
			}

			onSuccess?.();
		},

		onError: (error) => {
			toast.error("Failed to create agent", {
				id: "create-agent-error",
				description: error.message,
			});

			// TODO: check if error code is "FORBIDDEN", redirect to "/upgrade"
		},
	});

	const form = useForm<AgentInsertSchemaType>({
		resolver: zodResolver(agentInsertSchema),
		defaultValues: {
			name: initialValues?.name ?? "",
			instructions: initialValues?.instructions ?? "",
		},
	});

	const isEdit = !!initialValues?.id;
	const isPending = createAgent.isPending;

	const onSubmitForm = (values: AgentInsertSchemaType) => {
		if (isEdit) {
			// update
			console.log(values);
		} else {
			// create
			createAgent.mutate(values);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
				<GeneratedAvatar
					seed={form.watch("name")}
					variant="bottts-neutral"
					className="size-16 border"
				/>

				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="e.g Coding tutor" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="instructions"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Instructions</FormLabel>
							<FormControl>
								<Textarea
									placeholder="You are a helpful assistant that can answer questions and provide information and help with assignments."
									{...field}
								/>
							</FormControl>
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
	);
};
