import { useAuthContext } from "@/contexts/AuthContextProvider";
import Logo from "../Logo";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
// import NavLinks from "./NavLinks";
import SearchBar from "../SearchBar";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const isLoggedIn = authUser?.fullName && authUser?.id && authUser?.email;

  return (
    <header className="pt-5 shadow-md">
      <nav className="container flex flex-col items-center justify-between">
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* SearchBar */}
          <SearchBar />

          {/* Actions (LoggedOut)*/}
          {!isLoggedIn && <LoggedOut />}

          {/* Actions (LoggedIn)*/}
          {isLoggedIn && <LoggedIn />}
        </div>
        {/* navigation-menu */}
        <div className="w-full">
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
