import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import Hint from "@/components/Hint";
import { HelpCircle } from "lucide-react";
import useForgetPassword from "@/hooks/useForgetPassword";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "email is required",
    })
    .max(50),
  otp: z
    .string()
    .min(2, {
      message: "otp is required",
    })
    .max(50),
});
const CheckOtp = () => {
  const forgetPassword = useForgetPassword();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: forgetPassword.userData.email || "",
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    await axios
      .post(`/api/auth/check-otp`, values)
      .then((res) => {
        if (res.data.results) {
          forgetPassword.setOTPCorrect(values.otp);
        } else {
          setError("Invalid code or expired");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => setIsPending(false));
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8  max-w-md w-full   p-4 rounded-3xl   "
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="relative">
              <Hint
                asChild
                label="We'have sent verification Code enter it here to continue"
                align="center"
                side="left"
              >
                <Button
                  className="absolute right-2 top-1 h-fit p-2 "
                  variant={"ghost"}
                >
                  <HelpCircle size={16} />
                </Button>
              </Hint>
              <FormControl>
                <Input
                  placeholder="enter verification Code"
                  {...field}
                  className="bg-transparent border-neutral-400"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-600">{error}</p>}
        <Button
          disabled={isPending}
          type="submit"
          className="w-full  transition"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CheckOtp;
