import CartButton from "./CartButton";
import UserActions from "./UserActions";
import WishListButton from "./WishListButton";


const LoggedIn = () => {
  return (
    <div className="flex items-center gap-x-1">
      <UserActions />
      <CartButton />
      <WishListButton />
    </div>
  );
};

export default LoggedIn;
