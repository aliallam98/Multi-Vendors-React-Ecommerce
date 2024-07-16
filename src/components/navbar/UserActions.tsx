import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { CircleUser, LogOut, Settings, User, X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { toast } from "sonner";
import axios from "axios";

const UserActions = () => {
  const { setAuthUser } = useAuthContext();
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const onClickHandler = async () => {
    setIsPending(true);
    await axios
      .post(`/api/auth/logout`)
      .then((res) => {
        localStorage.removeItem("E-Commerce-Auth-User");
        setAuthUser({});
        res.data.success && navigate("/");
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsPending(false));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isPending}
          className="h-fit p-1 md:p-2"
          variant={"ghost"}
        >
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-8 px-4">
        <PopoverClose className="absolute right-2 top-2">
          <X />
        </PopoverClose>
        <div>
          <Button
            asChild
            disabled={isPending}
            variant={"ghost"}
            className="w-full flex justify-start items-center gap-4"
          >
            <Link to={"/profile"}>
              <CircleUser size={20} className="text-muted-foreground" /> Profile
            </Link>
          </Button>
          <Separator />
          <Button
            asChild
            disabled={isPending}
            variant={"ghost"}
            className="w-full flex justify-start items-center gap-4"
          >
            <Link to={"/settings"}>
              <Settings size={20} className="text-muted-foreground" /> Settings
            </Link>
          </Button>
        </div>
        <Separator />
        <Button
          disabled={isPending}
          variant={"ghost"}
          className="w-full"
          onClick={onClickHandler}
        >
          Log Out <LogOut className="w-4 h-4 ml-auto text-muted-foreground" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserActions;
