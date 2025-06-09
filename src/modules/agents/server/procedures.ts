import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { agents } from "@/server/db/schema";

export const agentsRouter = createTRPCRouter({
	getMany: protectedProcedure.query(async ({ ctx }) => {
		const data = await ctx.db.select().from(agents);

		return data;
	}),
});
