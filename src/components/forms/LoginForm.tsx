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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/AuthContextProvider";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "email is required",
    })
    .max(50),
  password: z
    .string()
    .min(2, {
      message: "password is required",
    })
    .max(50),
});

const LoginForm = () => {
  const {setAuthUser} = useAuthContext()
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    await axios
      .post(`/api/auth/login`, values)
      .then((res) => {
        localStorage.setItem("E-Commerce-Auth-User", JSON.stringify(res.data.results));
        setAuthUser(res.data.results)
        res.data.success && navigate("/");
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsPending(false));
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8  max-w-md w-full   p-4 rounded-3xl   "
      >
        <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-center">
          Login
        </h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="email"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Password"
                  {...field}
                  type="password"
                  className="bg-transparent border-neutral-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
        <p className="text-sm">
          Dont Have Account ?{" "}
          <Link to={"/sign-up"} className="underline">
            Signup
          </Link>
        </p>
        <p className="text-sm">
          <Link to={"/forget-password"} className="underline">
          Forget Password ?
          </Link>
        </p>
        </div>
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

export default LoginForm;
