"use client";

import { useState } from "react";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/new-meeting-dialog";

export const MeetingsListHeader = () => {
	// const [filters, setFilters] = useAgentsFilters();
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	//
	// const isAnyFilterModified = !!filters.search;
	//
	// const onClearFilters = async () => {
	// 	await setFilters({ search: "", page: DEFAULT_PAGE });
	// };

	return (
		<>
			<NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
			<div className="flex flex-col gap-y-4 p-4 md:px-8">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">My Meetings</h2>
					<Button
						onClick={() => {
							setIsDialogOpen((prev) => !prev);
						}}
					>
						<PlusIcon />
						New Meeting
					</Button>
				</div>

				<div className="flex items-center gap-x-2 p-1">
					{/*<MeetingsSearchFilter />*/}
					{/*{isAnyFilterModified && (*/}
					{/*	<Button onClick={onClearFilters} variant="outline" size="sm">*/}
					{/*		<XCircleIcon />*/}
					{/*		Clear*/}
					{/*	</Button>*/}
					{/*)}*/}
					TODO: Add search filter
				</div>
			</div>
		</>
	);
};
