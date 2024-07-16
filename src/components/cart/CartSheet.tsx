import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import CartItem from "./CartItem";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ICartItem } from "@/typings";
import { useQuery, useQueryClient } from "react-query";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { fetcher } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "../Spinner";

const CartSheet = ({ children }: { children?: React.ReactNode }) => {
  const { authUser } = useAuthContext();
  const userId = authUser?.id;
  const useQueryVariable = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["UserCart", userId],
    queryFn: () => fetcher("api/cart/"),
    // refetchOnWindowFocus: false,
  });

  console.log(data, isFetching);

  if (!data) {
    return <Spinner size={"lg"} />;
  }
  console.log(data);

  const cartItems = data?.cart?.products || [];

  const clearCartHandler = async () => {
    await axios
      .put("/api/cart/clear")
      .then((res) => {
        toast.success(res.data.message);
        useQueryVariable.invalidateQueries({
          queryKey: ["UserCart", userId],
        });
      })
      .catch((error) => toast.error(error.response.message));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="text-start">Shop Cart</SheetTitle>
          <Separator />
        </SheetHeader>
        {cartItems.length > 0 ? (
          <div className="relative p-1 h-[90%]">
            <div className="overflow-auto  h-[70%] mt-1  p-1">
              {cartItems.map((cartItem: ICartItem) => (
                <CartItem key={cartItem._id} data={cartItem} userId={userId!} />
              ))}
            </div>
            <div className="w-full flex flex-col items-center gap-4 absolute bottom-4">
              <p className="w-full text-start">
                Total Price : {data.totalPrice}
              </p>
              <Button className="w-72  rounded-3xl">
                <Link to={"/check-out"} className="w-full">
                  Check Out
                </Link>
              </Button>
              <Button
                onClick={clearCartHandler}
                className=" border rounded-3xl  w-72 "
                variant={"ghost"}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 mt-40">
            <p>Cart Is Empty Start shopping Now</p>
            <Button>
              <Link to={"/products"}>Shop Now</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
