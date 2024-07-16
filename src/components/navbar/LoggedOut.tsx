import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const LoggedOut = () => {
  return (
    <div>
      <Button asChild>
        <Link to={"/log-in"}>Log In</Link>
      </Button>
      <Button asChild variant={"ghost"}>
        <Link to={"/sign-up"}>Sign Up</Link>
      </Button>
    </div>
  );
};

export default LoggedOut;
