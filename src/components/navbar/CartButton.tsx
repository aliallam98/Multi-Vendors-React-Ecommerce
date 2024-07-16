import { ShoppingCart } from "lucide-react";
import CartSheet from "../cart/CartSheet";
import { Button } from "../ui/button";

const CartButton = () => {


  return (
    <CartSheet>
      <Button
        className="h-fit p-1 md:p-2"
        variant={"ghost"}
      >
        <ShoppingCart />
      </Button>
    </CartSheet>
  );
};

export default CartButton;
