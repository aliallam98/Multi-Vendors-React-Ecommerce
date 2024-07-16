import { useQuery } from "react-query";
import Collection from "../Collection";
import { fetcher } from "@/lib/utils";

const ProductsPage = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetcher("/api/product"),
  });

  if (!data) return <p>There is no data to show</p>;
  const products = data?.products;
  const metaData = data?.metaData;

  console.log("data");
  console.log(data);

  return (
    <section className="py-10 h-fit">
      <div className="container">
        <div>
          <h2 className="text-xl md:text-3xl lg:text-5xl">Shop By Products</h2>
          <p className=" mt-4 text-muted-foreground">
            {metaData.totalDocuments} Products found
          </p>
        </div>

        <Collection
          emptyTitle=""
          subEmptyTitle=""
          page={metaData.currentPage}
          limit={metaData.limit}
          totalPages={metaData.totalPages}
          type="Product"
          showPagination
          data={products }
        />
      </div>
    </section>
  );
};

export default ProductsPage;
