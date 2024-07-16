

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShippingForm = ({isPending,form}:any) => {



  return (
    <Form {...form}>
      <form
        className="relative flex flex-col items-center gap-y-6 gap-10 w-full p-4"
      >
        <div className="flex flex-col gap-4 w-full max-w-4xl ">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Enter Name"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Phone"
                      {...field}
                      className="bg-transparent border-neutral-400"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Your Address includes Street name,Building name/no,City/Area,Nearest landmark"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Add delivery instructions or your notes"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add delivery instructions*/}
          <FormField
            control={form.control}
            name="addressType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Address type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="home" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {`Home (7am-9pm, all days)`}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="work" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {`Office (9am-6pm, Weekdays)`}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
{/* 
          <Button
            disabled={isPending}
            type="button"
            className="w-full  transition"
          >
            Continue
          </Button> */}
        </div>
      </form>
    </Form>
  );
};

export default ShippingForm;
