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
import { toast } from "sonner";
import Hint from "@/components/Hint";
import { HelpCircle } from "lucide-react";
import useForgetPassword from "@/hooks/useForgetPassword";
import { useNavigate } from "react-router-dom";

//"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
const formSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "email is required",
      })
      .max(50),
    otp: z
      .string()
      .min(1, {
        message: "otp is required",
      })
      .max(50),
    password: z
      .string()
      .min(8, "Minimum eight characters")
      // .regex(
      //   new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$"),
      //   "Minimum eight characters, at least one letter and one number"
      // )
      .max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
const ResetPassword = () => {
  const forgetPassword = useForgetPassword();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: forgetPassword.userData.email || "aa",
      otp: forgetPassword.userData.otp || "aa",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    setIsPending(true);
    await axios
      .post(`/api/auth/reset-password`, {
        email: values.email,
        otp: values.otp,
        password: values.password,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/ ");
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
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <Hint
                asChild
                label="Minimum eight characters, at least one letter and one number"
                align="end"
                side="top"
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
                  // type="password"
                  placeholder="Password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
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

export default ResetPassword;
