import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useQueryClient } from "react-query";
import { useAuthContext } from "@/contexts/AuthContextProvider";

interface IProps {
  productId: string;
  quantity?: number;
  className?: string;
  showIcon?: boolean;
}

const AddToCartButton = ({
  productId,
  quantity = 1,
  className,
  showIcon,
}: IProps) => {
  const useQueryVariable = useQueryClient();
  const { authUser } = useAuthContext();
  const userId = authUser?.id;

  const addToCartHandler = async () => {
    axios
      .post("/api/cart", { productId, quantity })
      .then((res) => {
        if (res.data.success) {
          toast.success("Product added To Cart .");
          useQueryVariable.invalidateQueries({
            queryKey: ["UserCart", userId],
          });
        }
      })
      .catch((error) => toast.error(error.response.data.message));
  };
  return (
    <Button
      size={"sm"}
      variant={"default"}
      className={cn("w-full space-x-2", className)}
      onClick={addToCartHandler}
    >
      {showIcon && <Plus />} Add To Cart
    </Button>
  );
};

export default AddToCartButton;
