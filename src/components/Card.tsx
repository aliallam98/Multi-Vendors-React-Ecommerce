import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/typings";
import AddAndDeleteButton from "./wish-list/AddAndDeleteButton";
import AddToCartButton from "./cart/AddToCartButton";

interface IProps {
  type: "Category" | "SubCategory" | "Brand" | "Product";
  data?: IProduct;
  isAddedToWishList?: boolean;
  showIcons?: boolean;
}

const Card = ({ type, data, isAddedToWishList, showIcons }: IProps) => {
  if (type === "Category" || type === "SubCategory" || type === "Brand") {
    const path =
      type === "Category"
        ? `/category/${data?.name}`
        : type === "Brand"
        ? `/brands/${data?.name}`
        : type === "SubCategory"
        ? `/subcategory/${data?.name}`
        : "";
    return (
      <article className="relative mx-auto flex flex-col justify-center items-center border rounded-md text-center gap-y-4 w-[230px] h-[240px] transition hover:shadow-md hover:border-orange-400  ">
        <Link to={path} className="w-full">
          <img
            src={data?.image?.secure_url}
            alt="category image"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h3 className="absolute bottom-6 text-center w-full text-neutral-600 capitalize">
            {data?.name}
          </h3>
        </Link>
      </article>
    );
  }

  return (
    <article className="relative flex flex-col pt-1 border text-center gap-y-4 h-[350px] rounded-3xl">
      <Link to={`/products/${data?._id}`} className="w-full">
        <img
          src={data?.image?.secure_url || data?.images[0].secure_url}
          alt="category image"
          width={200}
          height={150}
          className="mx-auto w-[200px] h-[200px] object-contain"
        />
        <div className="p-4 space-y-2">
          <h3 className="truncate text-neutral-600 capitalize">{data?.name}</h3>
          <h3 className=" text-neutral-600 capitalize text-start">
            {data?.categoryId.name}
          </h3>
          <div className="flex items-center justify-between">
            <p>{data?.paymentPrice} EGP</p>
            <p>{data?.avgRate}</p>
          </div>
        </div>
      </Link>
      {showIcons && (
        <AddAndDeleteButton
          isAddedToWishList={isAddedToWishList!}
          productId={data?._id as string}
        />
      )}

      <AddToCartButton productId={data?._id as string} className="" />
    </article>
  );
};

export default Card;

Card.CategorySkeleton = function CardCategorySkeleton() {
  return (
    <div className="flex flex-col justify-center items-center  text-center gap-y-4 w-[230px] h-[240px]">
      <Skeleton className="w-32 h-32 bg-black/5" />
      <Skeleton className="w-32 h-10 bg-black/5" />
    </div>
  );
};
Card.ProductSkeleton = function CardProductSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center  text-center gap-y-4 w-[230px] h-[240px]">
      <Skeleton className="w-32 h-32 bg-black/5" />
      <div>
        <Skeleton className="w-full h-10 bg-black/5" />
        <Skeleton className="w-full h-10 bg-black/5" />
        <div className="flex items-center justify-between">
          <Skeleton className="w-8 h-10 bg-black/5" />
          <Skeleton className="w-8 h-10 bg-black/5" />
        </div>
      </div>
    </div>
  );
};
