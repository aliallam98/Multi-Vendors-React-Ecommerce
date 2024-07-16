import Collection from "@/components/Collection";
import SharedSectionMainHeadingAndCount from "@/components/SharedSectionMainHeadingAndCount";
import { fetcher } from "@/lib/utils";
import { useQuery } from "react-query";

const MainCategoryPage = () => {
  const { data } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => fetcher("/api/category"),
  });
  if (!data) return <p>Loading</p>;
  const categories = data?.categories;
  const metaData = data?.metaData;

  console.log(data);

  return (
    <section className="py-10 h-screen">
      <div className="container">
      <SharedSectionMainHeadingAndCount
        headingText="Categories"
        count={metaData.totalDocuments}
        />
        
        <Collection
          emptyTitle=""
          subEmptyTitle=""
          page={metaData.currentPage}
          limit={metaData.limit}
          totalPages={metaData.totalPages}
          type="Category"
          showPagination
          data={categories}
        />
      </div>
    </section>
  );
};

export default MainCategoryPage;
