import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { z } from "zod";

import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "@/constants";
import {
	meetingInsertSchema,
	meetingUpdateSchema,
} from "@/modules/meetings/schemas";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { agents, meetings } from "@/server/db/schema";

const filtersInputSchema = z.object({
	page: z.number().default(DEFAULT_PAGE),
	pageSize: z
		.number()
		.min(MIN_PAGE_SIZE)
		.max(MAX_PAGE_SIZE)
		.default(DEFAULT_PAGE_SIZE),
	search: z.string().nullish(),
});

export const meetingsRouter = createTRPCRouter({
	update: protectedProcedure
		.input(meetingUpdateSchema)
		.mutation(async ({ ctx, input }) => {
			const [updateMeeting] = await ctx.db
				.update(meetings)
				.set(input)
				.where(
					and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
				)
				.returning();

			if (!updateMeeting) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Meeting not found",
				});
			}

			return updateMeeting;
		}),

	create: protectedProcedure
		.input(meetingInsertSchema)
		.mutation(async ({ ctx, input }) => {
			const [createMeeting] = await ctx.db
				.insert(meetings)
				.values({
					...input,
					userId: ctx.auth.user.id,
				})
				.returning();

			// TODO: create stream call, upsert stream call

			return createMeeting;
		}),

	getOne: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const [existingMeeting] = await ctx.db
				.select({
					...getTableColumns(meetings),
				})
				.from(meetings)
				.where(
					and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
				);

			if (!existingMeeting) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Meeting not found",
				});
			}

			return existingMeeting;
		}),

	getMany: protectedProcedure
		.input(filtersInputSchema)
		.query(async ({ ctx, input }) => {
			const { search, pageSize, page } = input;

			const data = await ctx.db
				.select({
					...getTableColumns(meetings),
					agent: agents,
					duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
						"duration"
					),
				})
				.from(meetings)
				.innerJoin(agents, eq(meetings.agentId, agents.id))
				.where(
					and(
						eq(meetings.userId, ctx.auth.user.id),
						search ? ilike(meetings.name, `%${search}%`) : undefined
					)
				)
				.orderBy(desc(meetings.createdAt), desc(meetings.id))
				.limit(pageSize)
				.offset((page - 1) * pageSize);

			const [total] = await ctx.db
				.select({ count: count() })
				.from(meetings)
				.innerJoin(agents, eq(meetings.agentId, agents.id))
				.where(
					and(
						eq(meetings.userId, ctx.auth.user.id),
						search ? ilike(meetings.name, `%${search}%`) : undefined
					)
				);

			const totalPages = Math.ceil(total.count / pageSize);

			return {
				items: data,
				total: total.count,
				totalPages,
			};
		}),
});
