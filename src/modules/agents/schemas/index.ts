import { z } from "zod";

import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "@/constants";

export const agentInsertSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	instructions: z.string().min(1, { message: "Instruction is required" }),
});

export type AgentInsertSchemaType = z.infer<typeof agentInsertSchema>;

export const filtersInputSchema = z.object({
	page: z.number().default(DEFAULT_PAGE),
	pageSize: z
		.number()
		.min(MIN_PAGE_SIZE)
		.max(MAX_PAGE_SIZE)
		.default(DEFAULT_PAGE_SIZE),
	search: z.string().nullish(),
});
