import { Separator } from "@radix-ui/react-separator";

const OrderTotal = ({ totalPrice,shippingFee,discount }: { totalPrice: number,shippingFee:number,discount:number }) => {
  return (
    <div className="sticky top-2 right-5  border p-4 w-[300px] h-fit pb-8">
      <p className="max-w-full text-[13px] p-4 text-pretty">
        Choose a payment method to continue checking out. You'll still have a
        chance to review and edit your order before it's final.
      </p>
      <Separator className="h-[1px] bg-muted-foreground mt-2" />
      <div className="space-y-1">
        <h3 className="font-semibold text-xl">Order Summary</h3>
        <div className="flex items-center justify-between text-sm">
          <p>Items </p>
          <span>{totalPrice}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <p>Shipping & handling: </p>
          <span>EGP {shippingFee}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <p>Total</p>
          <span>EGP {totalPrice + shippingFee} </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <p>Promotion applied: </p>
          <span>EGP {discount || 0}</span>
        </div>
      </div>
      <Separator className="h-[1px] bg-muted-foreground mt-2" />
      <div className="flex items-center justify-between text-sm mt-4">
        <p className="text-red-800 font-semibold text-xl">Order total:</p>
        <span>
            {discount ? ((totalPrice + shippingFee) - discount) : (totalPrice + shippingFee)}
        </span>
      </div>
    </div>
  );
};

export default OrderTotal;
