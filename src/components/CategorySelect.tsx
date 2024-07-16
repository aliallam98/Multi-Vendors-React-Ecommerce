import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn, fetcher } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useQuery } from "react-query";
import { ICategory } from "@/typings";

interface IProps {
  value: string;
  onChangeHandler: () => void;
  disabled: boolean;
  className?: string;
}
const CategorySelect = ({
  value,
  onChangeHandler,
  disabled,
  className,
}: IProps) => {
  const [open, setOpen] = useState(false);

  const { data: categories } = useQuery({
    queryKey: "All-Categories",
    queryFn: () => fetcher("/api/category/all"),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  if (!categories) return <p>Loading</p>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[250px] justify-between", className)}
          disabled={disabled}
        >
          {value
            ? categories.find((category: ICategory) => category._id === value)
                ?.name
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command className="max-h-[250px] overflow-y-auto">
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {categories.map((item: ICategory) => (
              <CommandItem
                key={item._id}
                value={item._id}
                //onSelect
                onSelect={onChangeHandler}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item._id ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelect;
