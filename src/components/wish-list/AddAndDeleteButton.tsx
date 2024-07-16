import axios from "axios";
import { toast } from "sonner";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "react-query";
import { useAuthContext } from "@/contexts/AuthContextProvider";

interface IProps {
  isAddedToWishList: boolean;
  productId: string;
}
const AddAndDeleteButton = ({ isAddedToWishList, productId }: IProps) => {
  const useQuery = useQueryClient();
  const { authUser } = useAuthContext();

  const onClickHandler = async () => {
    if (isAddedToWishList) {
      axios
        .patch(`/api/product/wishlist/remove/${productId}`)
        .then((res) => {
          toast.success(res.data.message);
          useQuery.invalidateQueries({
            queryKey: ["User-Wish-List", authUser?.id],
          });
        })
        .catch((error) => toast.error(error.response.data.message));
    } else {
      axios
        .patch(`/api/product/wishlist/add/${productId}`)
        .then((res) => {
          toast.success(res.data.message);
          useQuery.invalidateQueries({
            queryKey: ["User-Wish-List", authUser?.id],
          });
        })
        .catch((error) => toast.error(error.response.data.message));
    }
  };
  return (
    <Button
      onClick={onClickHandler}
      variant={"ghost"}
      className="absolute h-auto p-2 top-2 right-2"
    >
      <Heart className={cn(isAddedToWishList && "text-red-600")} />
    </Button>
  );
};

export default AddAndDeleteButton;
