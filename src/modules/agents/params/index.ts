import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

import { DEFAULT_PAGE } from "@/constants";

export const agentsFiltersSearchParams = {
	search: parseAsString
		.withDefault("")
		.withOptions({ clearOnDefault: true, history: "push" }),
	page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({
		clearOnDefault: true,
		history: "push",
	}),
};

export const loadAgentsSearchParams = createLoader(agentsFiltersSearchParams);
