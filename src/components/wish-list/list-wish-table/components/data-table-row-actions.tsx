import { Button } from "@/components/ui/button";

// import { taskSchema } from "../data/schema";
import { Trash } from "lucide-react";
import axios from "axios";
import { useQueryClient } from "react-query";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { toast } from "sonner";
import { IProduct } from "@/typings";

interface DataTableRowActionsProps {
  row: IProduct;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { authUser } = useAuthContext();
  const useQuery = useQueryClient();

  const id = row.original._id;
  console.log(id);

  const clickHandler = async () => {
    await axios
      .patch(`/api/product/wishlist/remove/${id}`)
      .then((res) => toast.success(res.data.message));
    await useQuery.invalidateQueries({
      queryKey: ["User-Wish-List", authUser?.id],
    });
  };

  return (
    <>
      <Button variant={"ghost"} className="h-auto p-2" onClick={clickHandler}>
        <Trash size={16} />
      </Button>
    </>
  );
}
