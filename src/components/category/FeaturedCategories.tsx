import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import FeaturedCategoriesSlider from "./AutoSlider";

const FeaturedCategories = () => {
  return (
    <section className="relative py-10">
      <div className="container">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl md:text-3xl lg:text-4xl mb-4">
            Featured Categories
          </h2>
          <Button className="">
            <Link to={"/brands"}>View All</Link>
          </Button>
        </div>

        <FeaturedCategoriesSlider />
      </div>
    </section>
  );
};

export default FeaturedCategories;
