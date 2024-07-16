import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

import { useNavigate,useSearchParams } from "react-router-dom";

const FilterByCategory = () => {
    // Get the category
  const searchParams = useSearchParams();
  const navigate = useNavigate();


  const onSelectHandler = (category:string)=>{
    let newUrl = '';

    
    if (category && category !== "All") {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "category",
          value: category,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: category.toString(),
          keysToRemove: ["query"],
        });
      }
      navigate(newUrl);
  }
  return (
    <Select onValueChange={(value:string)=>onSelectHandler(value)}>
      <SelectTrigger className="flex items-center gap-2 w-full md:max-w-[400px] bg-neutral-100  rounded-3xl px-4">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent >
        <SelectItem value={"All"}>All</SelectItem>
        {[].map((category) => (
          <SelectItem key={category._id} value={`${category.title}`}>
            {category.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterByCategory;



//To Do
//Slugify 