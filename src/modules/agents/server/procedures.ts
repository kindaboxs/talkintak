import { eq, getTableColumns } from "drizzle-orm";
import { z } from "zod";

import { agentInsertSchema } from "@/modules/agents/schemas";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { agents } from "@/server/db/schema";

export const agentsRouter = createTRPCRouter({
	getOne: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const [existingAgent] = await ctx.db
				.select({
					...getTableColumns(agents),
				})
				.from(agents)
				.where(eq(agents.id, input.id));

			return existingAgent;
		}),

	getMany: protectedProcedure.query(async ({ ctx }) => {
		const data = await ctx.db.select().from(agents);

		return data;
	}),

	create: protectedProcedure
		.input(agentInsertSchema)
		.mutation(async ({ ctx, input }) => {
			const [createAgent] = await ctx.db
				.insert(agents)
				.values({
					...input,
					userId: ctx.auth.user.id,
				})
				.returning();

			return createAgent;
		}),
});
