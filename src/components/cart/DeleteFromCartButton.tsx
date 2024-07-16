import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface IProps {
  productId: string;
}

const DeleteFromCartButton = ({ productId }: IProps) => {
  const deleteFromCartHandler = () => {
    axios
      .post(`/api/cart/${productId}`)
      .then(
        (res) => res.data.success && toast.success("Product added To Cart .")
      )
      .catch((error) => toast.error(error.response.data.message));
  };
  return (
    <Button
      className="space-x-2 h-auto p-2"
      size={"sm"}
      variant={"ghost"}
      onClick={deleteFromCartHandler}
    >
      <Trash size={16} />
    </Button>
  );
};

export default DeleteFromCartButton;
