import { IProduct } from "@/typings";
import Card from "./Card";
import Pagination from "./Pagination";
// import UseListWish from "@/hooks/UseListWish";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";
import { useAuthContext } from "@/contexts/AuthContextProvider";

interface IProps {
  type: "Category" | "SubCategory" | "Brand" | "Product";
  data?: IProduct[];
  emptyTitle: string;
  subEmptyTitle: string;
  page?: string | number;
  limit: string | number;
  totalPages?: string | number;
  showPagination?: boolean;
}

const Collection = ({
  data = [],
  emptyTitle,
  subEmptyTitle,
  type,
  totalPages,
  page,
  showPagination,
}: IProps) => {
  const { authUser } = useAuthContext();

  const { data: wishList } = useQuery({
    queryKey: ["User-Wish-List", authUser?.id],
    queryFn: () => fetcher("/api/user/wish-list"),
    refetchOnWindowFocus: false,
  });

  if (!data) return <p>Loading ....</p>;

  // if (!wishList) return <p>Loading ....</p>;
  // console.log(wishList);

  return (
    <section className="py-10">
      {data.length > 0 && data ? (
        <>
          <div className=" grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
            {data.map((item) => {
              const isAddedToWishList = authUser && wishList
                ? wishList.find((ele: IProduct) => ele._id === item._id)
                : false;
              //Search FindIndex or includes will be better here.
              return (
                <Card
                  isAddedToWishList={!!isAddedToWishList}
                  data={item}
                  key={item._id}
                  type={type}
                  showIcons
                />
              );
            })}
          </div>
          {showPagination && (
            <Pagination totalPages={totalPages || 1} page={page || 1} />
          )}
        </>
      ) : (
        <div className="flex flex-col gap-y-4 justify-center items-center mt-8">
          <h3 className="font-semibold text-2xl">{emptyTitle}</h3>
          <p className="text-xl">{subEmptyTitle}</p>
        </div>
      )}
    </section>
  );
};

export default Collection;
