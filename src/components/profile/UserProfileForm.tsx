import { ElementRef, useRef, useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn, convertFileToUrl } from "@/lib/utils";
import { IUser } from "@/typings";
import { toast } from "sonner";
import { useQueryClient } from "react-query";
import axios from "axios";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "name is required",
    })
    .max(50),
  age: z.string(),
  phone: z.string(),
  address: z.string(),
  profileImage: z.optional(z.any()),
});

const UserProfileForm = ({ data, userId }: { data: IUser; userId: string }) => {
  const useQuery = useQueryClient();

  const [isPending, setIsPending] = useState(false); //setIsPending
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const fileRef = useRef<ElementRef<"input">>(null);
  let imagePreview =
    file && file.type.startsWith("image") && convertFileToUrl(file);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "" || data.fullName,
      age: "" || data.age,
      phone: "" || data.phone,
      address: "" || data.address,
      profileImage: "" || data.profileImage.secure_url,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (file && !file?.type.startsWith("image")) {
      return setFileError("Only image files are allowed");
    }
    setIsPending(true);
    const formData = new FormData();
    if (file) {
      formData.append("profileImage", file as File);
    }
    for (const [key, value] of Object.entries(values)) {
      if (key !== "profileImage") {
        formData.append(key, value);
      }
    }

    await axios
      .put(`/api/user/update`, formData)
      .then(async (res) => {
        toast.success(res.data.message);
        await useQuery.invalidateQueries({
          queryKey: ["UserProfile", userId],
        });
        // form.reset();
        setFile(null);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsPending(false));
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col items-center gap-y-6 gap-10 w-full p-4"
      >
        <div className="relative border rounded-full w-[200px] h-[200px] mx-auto overflow-hidden">
          <img
            className="w-full h-full object-contain object-center"
            src={imagePreview || data?.profileImage.secure_url}
            alt="user profile image"
            onClick={() => fileRef?.current?.click()}
          />
          <p
            className={cn(
              "hidden text-sm font-semibold text-red-600",
              fileError.length > 0 && "block"
            )}
          >
            {fileError}
          </p>
          <Input
            ref={fileRef}
            className="absolute w-full h-full hidden"
            disabled={isPending}
            placeholder="File"
            type="file"
            onChange={(e) => {
              setFile(e.target?.files?.[0] || null);
              setFileError("");
            }}
          />
          <Button
            className={cn(
              "absolute top-8 right-8 h-fit p-2 hidden hover:bg-transparent z-50",
              imagePreview && "block"
            )}
            type="button"
            variant={"ghost"}
            onClick={() => {
              setFile(null);
              imagePreview = "";
            }}
          >
            <X />
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-full flex-1 max-w-4xl gap">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Address"
                    {...field}
                    className="bg-transparent border-neutral-400"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Age"
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
                <FormItem className="flex-1">
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

          <Button
            disabled={isPending}
            type="submit"
            className="w-full  transition"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserProfileForm;
