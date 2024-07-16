import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const subCategories = [
  {
    _id: "1",
    value: "1",
    label: "Next.js",
  },
  {
    _id: "2",
    value: "2",
    label: "SvelteKit",
  },
];

interface IProps {
  value: string;
  onChangeHandler: () => void;
  disabled: boolean;
}
const SubCategorySelect = ({ value, onChangeHandler, disabled }: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
          disabled={disabled}
        >
          {value
            ? subCategories.find((subCategory) => subCategory.value === value)
                ?.label
            : "Select subCategory..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="max-h-[250px] overflow-y-auto">
          <CommandInput placeholder="Search subCategory..." />
          <CommandEmpty>No subCategory found.</CommandEmpty>
          <CommandGroup>
            {subCategories.map((item) => (
              <CommandItem
                key={item._id}
                value={item._id}
                //onSelect
                onSelect={onChangeHandler}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SubCategorySelect;
