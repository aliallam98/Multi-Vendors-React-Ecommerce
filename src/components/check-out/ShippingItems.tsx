import { ICartItem } from "@/typings";
import CartItem from "../cart/CartItem";

const ShippingItems = ({
  cartItems,
  userId,
  totalPrice,
}: {
  cartItems: ICartItem[];
  userId: string;
  totalPrice: number;
}) => {
  return (
    <div className="h-[600px]">
      {cartItems.length > 0 && (
        <div className="relative p-1 h-[80%]">
          <div className="overflow-auto  h-[70%] mt-1  p-1">
            {cartItems.map((cartItem: ICartItem) => (
              <CartItem key={cartItem._id} data={cartItem} userId={userId!} />
            ))}
          </div>
          <div className="w-full flex flex-col items-center gap-4 absolute bottom-4"></div>
        </div>
      )}
      <p className="absolute bottom-28 left-10  w-full text-start font-semibold">
        Total Price : {totalPrice}
      </p>
    </div>
  );
};

export default ShippingItems;
