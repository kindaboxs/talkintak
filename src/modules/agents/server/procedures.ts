import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { z } from "zod";

import {
	agentInsertSchema,
	filtersInputSchema,
} from "@/modules/agents/schemas";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { agents } from "@/server/db/schema";

export const agentsRouter = createTRPCRouter({
	getOne: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const [existingAgent] = await ctx.db
				.select({
					// TODO: change to actual count
					meetingCount: sql<number>`6`,
					...getTableColumns(agents),
				})
				.from(agents)
				.where(
					and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
				);

			if (!existingAgent) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Agent not found",
				});
			}

			return existingAgent;
		}),

	getMany: protectedProcedure
		.input(filtersInputSchema)
		.query(async ({ ctx, input }) => {
			const { search, pageSize, page } = input;

			const data = await ctx.db
				.select({
					// TODO: change to actual count
					meetingCount: sql<number>`6`,
					...getTableColumns(agents),
				})
				.from(agents)
				.where(
					and(
						eq(agents.userId, ctx.auth.user.id),
						search ? ilike(agents.name, `%${search}%`) : undefined
					)
				)
				.orderBy(desc(agents.createdAt), desc(agents.id))
				.limit(pageSize)
				.offset((page - 1) * pageSize);

			const [total] = await ctx.db
				.select({ count: count() })
				.from(agents)
				.where(
					and(
						eq(agents.userId, ctx.auth.user.id),
						search ? ilike(agents.name, `%${search}%`) : undefined
					)
				);

			const totalPages = Math.ceil(total.count / pageSize);

			return {
				items: data,
				total: total.count,
				totalPages,
			};
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
