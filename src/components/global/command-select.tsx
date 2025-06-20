import { useState, type ReactNode } from "react";

import { ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
	CommandResponsiveDialog,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Props {
	options: Array<{
		id: string;
		value: string;
		children: ReactNode;
	}>;
	onSelect: (value: string) => void;
	onSearch: (value: string) => void;
	value: string;
	placeholder?: string;
	isSearchable?: boolean;
	className?: string;
}

export const CommandSelect = ({
	options,
	onSelect,
	onSearch,
	value,
	placeholder = "Select an option",
	className,
}: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const selectedOption = options.find((option) => option.value === value);

	return (
		<>
			<Button
				type="button"
				variant="outline"
				className={cn(
					"h-9 justify-between px-2 font-normal",
					{ "text-muted-foreground": !selectedOption },
					className
				)}
				onClick={() => setOpen(true)}
			>
				<div>{selectedOption?.children ?? placeholder}</div>
				<ChevronsUpDownIcon />
			</Button>

			<CommandResponsiveDialog
				shouldFilter={!onSearch}
				open={open}
				onOpenChange={setOpen}
			>
				<CommandInput placeholder="Search..." onValueChange={onSearch} />
				<CommandList>
					<CommandEmpty>
						<span className="text-muted-foreground text-sm">
							No options found.
						</span>
					</CommandEmpty>

					{options.map((option) => (
						<CommandItem
							key={option.id}
							onSelect={() => {
								onSelect(option.value);
								setOpen(false);
							}}
						>
							{option.children}
						</CommandItem>
					))}
				</CommandList>
			</CommandResponsiveDialog>
		</>
	);
};
