import CarouselBanner from "./components/CarouselBanner";
// import SaleCountDown from "./components/SaleCountDown";
import FeaturedBrands from "./components/brand/FeaturedBrands";
import FeaturedCategories from "./components/category/FeaturedCategories";

function App() {
  return (
    <>
      {/* Slider */}
      <CarouselBanner />

      {/* Featured Categories */}
      <FeaturedCategories />
      <FeaturedBrands />

      {/* Popular Products */}
            {/* <Collection
        type="Category"
        emptyTitle=""
        subEmptyTitle=""
        page={1}
        totalPages={2}
        limit={8}
        data={[...Array(4)]}
      /> */}

      {/* Daily Best Sells  */}
      {/* <SaleCountDown /> */}



    </>
  );
}

export default App;
