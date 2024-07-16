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
import { HelpCircle } from "lucide-react";
import Hint from "@/components/Hint";
import useForgetPassword from "@/hooks/useForgetPassword";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "email is required",
    })
    .max(50),
});

const CheckEmail = () => {
  const forgetPassword = useForgetPassword();

  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    await axios
      .post(`/api/auth/check-email`, values)
      .then((res) => {
        if (res.data.results) {
          forgetPassword.setEmailExist(values.email);
        }
      })
      .catch((error) => form.setError("email", error.response.data.message))
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
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <Hint
                asChild
                label="Enter your email and check your email inbox for the verification code."
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
                  placeholder="enter your email address"
                  {...field}
                  className="bg-transparent border-neutral-400"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

export default CheckEmail;
