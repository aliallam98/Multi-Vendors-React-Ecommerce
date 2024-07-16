import { useQuery } from "react-query";
import Collection from "../Collection";
import { fetcher } from "@/lib/utils";
import SharedSectionMainHeadingAndCount from "../SharedSectionMainHeadingAndCount";

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
        <SharedSectionMainHeadingAndCount
        headingText="Products"
        count={metaData.totalDocuments}
        />

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
