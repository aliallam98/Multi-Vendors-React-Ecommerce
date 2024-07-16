import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ICartItem } from "@/typings";
import axios from "axios";
import { toast } from "sonner";
import { useQueryClient } from "react-query";
import DeleteFromCartButton from "./DeleteFromCartButton";

interface IProps {
  data: ICartItem;
  userId: string;
}
const CartItem = ({ data, userId }: IProps) => {
  const [quantity, setQuantity] = useState<number>(+data.quantity);
  const productId = data.productId._id;
  const queryClient = useQueryClient();

  const amountHandler = async (type: string) => {
    // type == "+" ? setQuantity(quantity + 1) : setQuantity(quantity - 1);
    setQuantity((prevValue) => {
      const newQuantity = type === "+" ? prevValue + 1 : prevValue - 1;
      return Math.max(Math.min(newQuantity, 100), 1);
    });
  };

  useEffect(() => {
    if (quantity !== data.quantity) {
      axios
        .post("/api/cart", { productId, quantity })
        .then((res) => {
          res.data.success && toast.success("Product Updated .");
          queryClient.invalidateQueries({
            queryKey: ["UserCart", userId],
          });
        })
        .catch((error) => toast.error(error.response.data.message));
    }
  }, [quantity]);

  return (
    <div className="flex items-center justify-between gap-2 border p-2 mt-2 rounded-2xl">
      <img
        src={data?.image?.secure_url || data.productId.images[0].secure_url}
        alt=""
        width={80}
        height={80}
        className="object-contain rounded-md"
      />
      <div>
        <p>{data.productId.name.split(" ").slice(0, 3).join(" ")}</p>
        <p>{data.productId.size}</p>
      </div>

      <div className="flex items-center">
        <Button
          type="button"
          className="h-fit p-2 text-xl font-bold"
          variant={"ghost"}
          onClick={() => amountHandler("-")}
        >
          -
        </Button>
        <p>{quantity}</p>

        <Button
          type="button"
          className="h-fit p-2 text-xl font-bold"
          variant={"ghost"}
          onClick={() => amountHandler("+")}
        >
          +
        </Button>
      </div>

      <DeleteFromCartButton productId={productId} />

      <p className="text-xl font-semibold text-nowrap">
        {+data.productId.paymentPrice * +data.quantity} EGP
      </p>
    </div>
  );
};

export default CartItem;
