"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

// import required modules

// type props = {
//   movies: Movie[];
// };

export default function CarouselBanner() {
  const images = [
    {
      id: 1,
      imageUrl: "/images/slider/slide-1.jpg",
      title: "SuperMarket For Fresh Grocery",
      subTitle:
        "Introduced a new model for online grocery shopping and convenient home delivery.",
      action: "shop Now",
      link: "/",
    },
    {
      id: 2,
      imageUrl: "/images/slider/slide-2.jpg",
      title: "Free Shipping Over 100$",
      subTitle:
        "Free Shipping to First-Time Customers Only, After promotions and discounts are applied.",
      action: "shop Now",
      link: "/",
    },
  ];
  return (
    <>
      <div className="relative">
        <Swiper
          allowTouchMove={false}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          loop
          speed={3000}
          modules={[Autoplay]}
          className="mySwiper "
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <img
                src={image.imageUrl}
                alt={image.title}
                width={1920}
                height={1080}
                className="z-10 object-cover object-center"
              />
              <div className="absolute ml-32 top-1/3 z-50">
                <h2 className="text-5xl font-bold max-w-xl  select-none">
                  {image.title}
                </h2>
                <p className="max-w-xl line-clamp-3 my-8 select-none">
                  {image.subTitle}
                </p>
                <Button asChild size={"lg"}>
                  <Link to={image.link}>{image.action}</Link>
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
