import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/server/api/root";

export type MeetingGetManyResponse =
	inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];
export type MeetingGetOneResponse =
	inferRouterOutputs<AppRouter>["meetings"]["getOne"];
