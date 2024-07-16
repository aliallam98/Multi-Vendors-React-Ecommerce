// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// import required modules
import { Autoplay, FreeMode } from "swiper/modules";
import Card from "../Card";
import { IProduct } from "@/typings";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";

export default function BrandsAutoSlider() {
  const { data } = useQuery({
    queryKey: "All-Brands",
    queryFn: () => fetcher("/api/brand/all"),
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (!data || !data.length) {
    return (
      <div className="flex items-center justify-between gap-2">
        {[...Array(5)].map((_, i) => (
          <Card.CategorySkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <>
      <Swiper
        speed={6000}
        slidesPerView={3}
        spaceBetween={30}
        freeMode={{
          enabled: true,
          momentumBounce: true,
          momentum: true,
        }}
        loop={true}
        autoplay={{
          delay: 1,
          reverseDirection: true,
        }}
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
        modules={[FreeMode, Autoplay]}
        className="mySwiper"
      >
        {data.length > 0 &&
          data?.map((data: IProduct) => (
            <SwiperSlide key={data._id}>
              <Card data={data} type="Brand" />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
