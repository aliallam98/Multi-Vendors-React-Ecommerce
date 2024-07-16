import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Card from "../Card";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";
import { IProduct } from "@/typings";

function FeaturedCategoriesSlider() {
  const { data } = useQuery({
    queryKey: "All-Categories",
    queryFn: () => fetcher("/api/category/all"),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  if (!data || !data.length) {
    return (
      <div className="flex items-center justify-between gap-2">
        {[...Array(5)].map((_, i) => (
          <Card.CategorySkeleton key={i} />
        ))}
      </div>
    );
  }
  if (!data.length) {
    return <p>There Is No Data To Show</p>;
  }

  return (
    <>
      <section className="py-5">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
          //   navigation={{
          //     enabled: true,

          //     disabledClass: "opacity-40",
          //   }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            800: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 5,
            },
          }}
          modules={[Autoplay, Pagination]} //Navigation
          className="SwiperMany"
        >
          {data?.map((data: IProduct) => (
            <SwiperSlide key={data._id}>
              <Card showIcons data={data} type="Category" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

export default FeaturedCategoriesSlider;
