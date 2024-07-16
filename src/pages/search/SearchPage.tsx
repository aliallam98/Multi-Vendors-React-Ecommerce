import Collection from "@/components/Collection";
import { fetcher } from "@/lib/utils";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query");

  const { data } = useQuery({
    queryKey: [`${searchTerm}`],
    queryFn: () => fetcher(`/api/product?query=${searchTerm}`),
  });

  const products = data?.products;
  const metaData = data?.metaData;

  if (!data) {
    return <p>Loading</p>;
  }
  console.log(data);

  return (
    <section className="py-10">
      <div className="container">
        <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
          Search results for "{searchTerm}"
        </h1>
        <p>{products.length} Products found</p>
        <Collection
          emptyTitle="There Is No Data To Show"
          subEmptyTitle="Try another search word"
          page={metaData.currentPage}
          limit={metaData.limit}
          totalPages={metaData.totalPages}
          type="Product"
          showPagination
          data={products}
        />
      </div>
    </section>
  );
};

export default SearchPage;
