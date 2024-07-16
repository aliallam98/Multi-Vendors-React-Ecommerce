import { fetcher } from "@/lib/utils";
import { IProduct } from "@/typings";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { EmblaOptionsType } from "embla-carousel";

import EmblaCarousel from "../ProductSlider";
import Collection from "../Collection";
import AddToCartButton from "../cart/AddToCartButton";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
const OPTIONS: EmblaOptionsType = {
  loop: true,
};

const ProductPage = () => {
  const params = useParams();
  const productId = params.id;

  const { data } = useQuery({
    queryKey: ["Product", productId],
    queryFn: () => fetcher(`/api/product/${productId}`),
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["Related-Products", productId],
    queryFn: () => fetcher(`/api/product/related-products/${productId}`),
  });

  if (!data) {
    return <p>Loading ..</p>;
  }

  if (!relatedProducts) {
    return <p>loading</p>;
  }

  console.log(relatedProducts);

  const productDetails: IProduct = data;
  const relatedProductsByCategory = relatedProducts.relatedProductsByCategory;
  const relatedProductsByBrand = relatedProducts.relatedProductsByBrand;

  const images = productDetails.image
    ? [productDetails.image, ...productDetails.images]
    : [...productDetails.images];

  return (
    <section className="py-10">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 ">
        {/* Images */}
        <EmblaCarousel slides={images} options={OPTIONS} />
        {/* Info */}
        <div className="h-full lg:pt-20">
          <div className="my-8">
            <div className="flex capitalize items-center gap-2">
              <h3 className=" font-semibold text-xl">Category:</h3>
              <span className=" text-xl text-muted-foreground">
                {productDetails.categoryId.name}
              </span>
            </div>
            <div className="flex capitalize items-center gap-2">
              <h3 className=" font-semibold text-xl">Brand:</h3>
              <span className=" text-xl text-muted-foreground">
                {productDetails?.brandId?.name}
              </span>
            </div>
          </div>
          <h3 className="capitalize font-semibold text-xl md:text-2xl lg:text-3xl mb-4">
            {productDetails.name}
          </h3>
          <h3 className="font-semibold text-xl mb-2">
            {productDetails.paymentPrice} EGP
          </h3>

          <div>
            <h3 className="font-semibold text-xl">About This Product:</h3>
            <span>{productDetails?.description}</span>
          </div>
          <div className="relative p-10">
            <AddToCartButton productId={productDetails._id} showIcon />
            <Button asChild size={"sm"} className="w-full mt-4 space-x-2">
              <Link to={`/check-out/${productDetails._id}`}>
                <ShoppingCart size={16} />
                <span>Buy This Item</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Related Results */}
      {relatedProductsByCategory.length > 0 && (
        <div className="container py-5 mt-10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-xl md:text-2xl">
                Related Products
              </h3>
              <p className="text-muted-foreground text-sm">By Category</p>
            </div>
            <Button variant={"link"} asChild>
              <Link to={`/categories/${productDetails.categoryId.name}`}>
                View More
              </Link>
            </Button>
          </div>
          <Collection
            emptyTitle=""
            subEmptyTitle=""
            type="Product"
            limit={5}
            page={1}
            data={relatedProductsByCategory}
          />
        </div>
      )}
      {relatedProductsByBrand.length > 0 && (
        <div className="container py-5 mt-10">
          <h3 className="font-semibold text-xl md:text-2xl">
            Related Products
          </h3>
          <p className="text-muted-foreground text-sm">By Brand</p>
          <Collection
            emptyTitle=""
            subEmptyTitle=""
            type="Product"
            limit={5}
            page={1}
            data={relatedProductsByBrand}
          />
        </div>
      )}
      {relatedProductsByBrand.length > 0 && (
        <div className="container py-5 mt-10">
          <h3 className="font-semibold text-xl md:text-2xl">
            Related Products
          </h3>
          <p className="text-muted-foreground text-sm">By Sub Category</p>
          <Collection
            emptyTitle=""
            subEmptyTitle=""
            type="Product"
            limit={5}
            page={1}
            data={relatedProductsByBrand}
          />
        </div>
      )}
    </section>
  );
};

export default ProductPage;
