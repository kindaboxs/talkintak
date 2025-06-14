import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE } from "@/constants";

interface Props {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
	return (
		<div className="flex items-center justify-between">
			<div className="text-muted-foreground flex-1 text-sm">
				<span>
					Page {page} of {totalPages ?? DEFAULT_PAGE}
				</span>
			</div>

			<div className="flex items-center gap-x-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(Math.max(1, page - 1))}
					disabled={page === 1}
				>
					<ChevronLeftIcon />
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(Math.min(totalPages, page + 1))}
					disabled={page === totalPages || totalPages === 0}
				>
					<ChevronRightIcon />
				</Button>
			</div>
		</div>
	);
};
