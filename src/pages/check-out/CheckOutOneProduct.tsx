import PaymentMethodForm from "@/components/check-out/PaymentMethodForm";
import ShippingForm from "@/components/check-out/ShippingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, fetcher } from "@/lib/utils";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import axios from "axios";
import OrderTotal from "@/components/check-out/OrderTotal";
import { useParams } from "react-router-dom";
import { IProduct } from "@/typings";

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
  coupon: z.optional(z.string()),
  paymentMethod: z
    .string({
      required_error: "Payment method required",
    })
    .min(1),
    products :z.array(z.object({
      productId:z.string()
    }))
});

const CheckOutOneProduct = () => {
  const [paymentError, setPaymentError] = useState(false);
  const [shippingError, setShippingError] = useState(false);
  const [isPending] = useState(false); //setIsPending

  const params = useParams();
  const productId = params.productId;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      addressType: "",
      note: "",
      paymentMethod: "",
      products:[]
    },
  });

  const { data: productDetails } = useQuery({
    queryKey: ["Product", productId],
    queryFn: () => fetcher(`/api/product/${productId}`),
    refetchOnWindowFocus: false,
  });

  if (!productDetails) {
    return <p>Loadingaaaa</p>;
  }

  const productToBuy: IProduct = productDetails;

  console.log(productDetails);

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
    if(!productId) return

    values.products = [{productId:productToBuy._id}]
    console.log(values);
    axios
      .post("/api/order/", values)
      .then((res) => {
        // console.log(res);
        window.location.href = res.data
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <section className="py-10">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-center">{`Check Out (1 Item)`}</h2>

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
              <div className="h-[400px] flex items-center justify-center p-4">
                <img
                  src={productToBuy.images[0].secure_url}
                  alt="image"
                  className="w-64 ml-4 "
                />
                <div>
                  <p>{productToBuy.name}</p>
                  <p>{productToBuy.paymentPrice} EGP</p>
                </div>
              </div>
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
          totalPrice={productDetails.paymentPrice}
          shippingFee={70}
          discount={0}
        />
      </div>
    </section>
  );
};

export default CheckOutOneProduct;
