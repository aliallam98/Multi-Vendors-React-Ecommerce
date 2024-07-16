import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaymentMethodForm = ({ isPending, form }: any) => {
  return (
    <Form {...form}>
      <form className="relative flex flex-col items-center gap-10 w-full p-4">
        <FormField
          control={form.control}
          name="coupon"
          render={({ field }) => (
            <FormItem>
              <Label>Enter a gift card or promotional code or coupon</Label>
              <FormControl>
                <Input
                  placeholder="Coupon"
                  {...field}
                  className="bg-transparent border-neutral-400"
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose a payment method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center gap-4 "
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Card" />
                    </FormControl>
                    <FormLabel className="font-normal">Card</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Cash" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {`Cash on Delivery (COD)`}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button
          disabled={isPending}
          className="w-full  transition"
          type="button"

        >
          Continue
        </Button> */}
      </form>
    </Form>
  );
};

export default PaymentMethodForm;
