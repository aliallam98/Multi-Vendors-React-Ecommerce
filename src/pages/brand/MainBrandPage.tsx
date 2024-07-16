import Collection from "@/components/Collection";
import SharedSectionMainHeadingAndCount from "@/components/SharedSectionMainHeadingAndCount";
import { fetcher } from "@/lib/utils";
import { useQuery } from "react-query";

const MainBrandPage = () => {
  const { data } = useQuery({
    queryKey: ["Brands"],
    queryFn: () => fetcher("/api/brand"),
  });

  if (!data) return <p>Loading</p>;
  const brands = data?.brands;
  const metaData = data?.metaData;

  console.log(data);

  return (
    <section className="py-10 h-screen">
      <div className="container">
      <SharedSectionMainHeadingAndCount
        headingText="Brands"
        count={metaData.totalDocuments}
        />


        <Collection
          emptyTitle=""
          subEmptyTitle=""
          page={metaData.currentPage}
          limit={metaData.limit}
          totalPages={metaData.totalPages}
          type="Brand"
          showPagination
          data={brands}
        />
      </div>
    </section>
  );
};

export default MainBrandPage;
