import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const WishListButton = () => {
  return (
    <Button asChild className="h-fit p-1 md:p-2" variant={"ghost"}>
      <Link to={"/wish-list"}>
        <Heart />
      </Link>
    </Button>
  );
};

export default WishListButton;
