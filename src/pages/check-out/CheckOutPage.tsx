import PaymentMethodForm from "@/components/check-out/PaymentMethodForm";
import ShippingForm from "@/components/check-out/ShippingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, fetcher } from "@/lib/utils";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ShippingItems from "@/components/check-out/ShippingItems";
import OrderTotal from "@/components/check-out/OrderTotal";

const formSchema = z.object({
  fullName: z
    .string({
      required_error: "full name is required",
    })
    .min(2, {
      message: "full name is required",
    })
    .max(50),
  phone: z
    .string({
      required_error: "phone is required",
    })
    .min(2, {
      message: "phone is required",
    }),
  address: z
    .string({
      required_error: "address is required",
    })
    .min(2, {
      message: "address is required",
    }),
  addressType: z
    .string({
      required_error: "address type is required",
    })
    .min(2, {
      message: "address type is required",
    }),
  note: z.string(),
  coupon: z.string(),
  paymentMethod: z
    .string({
      required_error: "Payment method required",
    })
    .min(1),
});

const CheckOutPage = () => {
  const [paymentError, setPaymentError] = useState(false);
  const [shippingError, setShippingError] = useState(false);
  const [isPending] = useState(false); //setIsPending
  const { authUser } = useAuthContext();
  const userId = authUser?.id;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      addressType: "",
      note: "",
      coupon: "",
      paymentMethod: "",
    },
  });

  const { data: cartData } = useQuery({
    queryKey: ["UserCart", userId],
    queryFn: () => fetcher("api/cart/"),
    refetchOnWindowFocus: false,
  });

  if (!cartData) {
    return <p>Loading</p>;
  }
  console.log("data", cartData);

  const cartItems = cartData?.cart?.products || [];

  const check = () => {
    !form.getValues("fullName")
      ? setShippingError(true)
      : setShippingError(false);
    !form.getValues("phone") ? setShippingError(true) : setShippingError(false);
    !form.getValues("address")
      ? setShippingError(true)
      : setShippingError(false);
    !form.getValues("addressType")
      ? setShippingError(true)
      : setShippingError(false);
    !form.getValues("paymentMethod")
      ? setPaymentError(true)
      : setPaymentError(false);
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    axios
      .post("/api/order/", values)
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <section className="py-10">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-center">{`Check Out (${cartItems.length}Item)`}</h2>

      <div className="container flex ">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative max-w-4xl border flex flex-col mx-auto mt-4 grow h-[600px]"
        >
          <Tabs defaultValue="shipping-address" className="">
            <TabsList>
              <TabsTrigger
                value="shipping-address"
                className={cn(shippingError && " border border-destructive")}
              >
                Shipping address
              </TabsTrigger>
              <TabsTrigger
                value="payment-method"
                className={cn(paymentError && " border border-destructive")}
              >
                Payment method
              </TabsTrigger>
              <TabsTrigger value="items-shipping">
                Items and shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="shipping-address">
              <ShippingForm
                form={form}
                onSubmit={onSubmit}
                isPending={isPending}
              />
            </TabsContent>
            <TabsContent value="payment-method">
              <PaymentMethodForm
                form={form}
                onSubmit={onSubmit}
                isPending={isPending}
                setPaymentError={setPaymentError}
              />
            </TabsContent>
            <TabsContent value="items-shipping" className="h-full">
              <ShippingItems
                cartItems={cartItems}
                userId={userId!}
                totalPrice={cartData.totalPrice}
              />
            </TabsContent>
          </Tabs>
          <Button
            onClick={() => check()}
            className="absolute bottom-10 left-1/2 -translate-x-1/2  mt-10 w-72  rounded-3xl"
          >
            Check Out
          </Button>
        </form>

        <OrderTotal
          totalPrice={cartData.totalPrice}
          shippingFee={70}
          discount={0}
        />
      </div>
    </section>
  );
};

export default CheckOutPage;
