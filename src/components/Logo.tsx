import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to={"/"} className="flex items-center gap-2">
        <img
          src="/images/cart.png"
          alt="Logo"
          width={40}
          className="shrink-0 mr-10 md:mr-0"
        />
        <h3 className="hidden  md:block text-xl font-semibold">City Mart</h3>
      </Link>
    </div>
  );
};

export default Logo;
