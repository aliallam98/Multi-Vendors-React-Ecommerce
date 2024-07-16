import axios from "axios";
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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "name is required",
    })
    .max(50),
  email: z
    .string()
    .min(2, {
      message: "email is required",
    })
    .max(50),
  password: z
    .string()
    .min(6, {
      message: "password must be 6 chars at least",
    })
    .max(50),
});

const SignUpForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    await axios
      .post(`/api/auth/signup`, values)
      .then((res) => {
        res.data.success && navigate("/log-in");
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsPending(false));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8  max-w-md w-full  bg-white/20 p-4 rounded-3xl  backdrop-blur-sm"
      >
        <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-center">
          Sign Up
        </h2>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Fullname"
                  {...field}
                  className="bg-transparent border-neutral-400 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="email"
                  {...field}
                  className="bg-transparent border-neutral-400 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Password"
                  {...field}
                  type="password"
                  className="bg-transparent border-neutral-400 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm">
          Aleady Have account ?{" "}
          <Link to={"/log-in"} className="underline">
            Login
          </Link>
        </p>
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

export default SignUpForm;
