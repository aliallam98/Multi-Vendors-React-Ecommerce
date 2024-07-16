import Collection from "@/components/Collection";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/utils";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

const BrandPage = () => {
  const params = useParams();
  const brandName = params.brandName;

  const { data } = useQuery({
    queryFn: () => fetcher(`/api/brand/get-by-name/${brandName}`),
    queryKey: ["BrandByName", brandName],
  });
  if (!data) {
    return "Loading";
  }

  const products = data?.products;
  const metaData = data?.metaData;

  return (
    <section className="py-10 px-5">
      <h1 className="text-lg lg:text-2xl">
        You're Looking For Brand:{" "}
        <span className="text-xl lg:text-3xl font-semibold">{brandName}</span>
      </h1>
      {products.length ? (
        <div className="container">
          <Collection
            emptyTitle="Woops"
            subEmptyTitle="There are no Brands matches"
            page={metaData?.currentPage}
            limit={metaData?.limit}
            totalPages={metaData?.totalPages}
            type="Product"
            showPagination
            data={products}
          />
        </div>
      ) : (
        <div className="mt-20 flex flex-col justify-center items-center gap-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl">
            There No Products In This Brand
          </h2>
          <Button asChild>
            <Link to={"/brands"}>Go Back</Link>
          </Button>
        </div>
      )}
    </section>
  );
};

export default BrandPage;
