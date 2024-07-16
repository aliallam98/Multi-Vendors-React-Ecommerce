import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import BrandsAutoSlider from "./BrandsAutoSlider";

const FeaturedBrands = () => {
  return (
    <section className="relative py-10">
      <div className="container">

        <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl md:text-3xl lg:text-4xl mb-4">
          Featured Brands
        </h2>
          <Button className="">
            <Link to={"/category"}>View All</Link>
          </Button>
        </div>
        <BrandsAutoSlider/>
      </div>
    </section>
  );
};

export default FeaturedBrands;
