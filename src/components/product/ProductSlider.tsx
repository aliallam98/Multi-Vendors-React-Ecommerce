import FancyboxWrapper from "../Fancybox.tsx";

const ProductSlider = () => {
  return (
    <FancyboxWrapper
      options={{
        Carousel: {
          infinite: false,
        },
      }}
    >
      <div
        id="productContainer"
        className="
        flex items-center gap-4 
        "
      >
        <div id="productCarousel" className="f-carousel md:order-last">
          <div
            className="f-carousel__slide"
            data-thumb-src="https://fancyapps.com/img/dress_1_s.jpg"
            data-fancybox="gallery"
            data-src="https://fancyapps.com/img/dress_1_b.jpg"
          >
            <img alt="" src="https://fancyapps.com/img/dress_1_m.jpg" />
          </div>
          <div
            className="f-carousel__slide"
            data-thumb-src="https://fancyapps.com/img/dress_2_s.jpg"
            data-fancybox="gallery"
            data-src="https://fancyapps.com/img/dress_2_b.jpg"
          >
            <img alt="" src="https://fancyapps.com/img/dress_2_m.jpg" />
          </div>
          <div
            className="f-carousel__slide"
            data-thumb-src="https://fancyapps.com/img/dress_3_s.jpg"
            data-fancybox="gallery"
            data-src="https://fancyapps.com/img/dress_3_b.jpg"
          >
            <img alt="" src="https://fancyapps.com/img/dress_3_m.jpg" />
          </div>
          <div
            className="f-carousel__slide"
            data-thumb-src="https://fancyapps.com/img/dress_4_s.jpg"
            data-fancybox="gallery"
            data-src="https://fancyapps.com/img/dress_4_b.jpg"
          >
            <img alt="" src="https://fancyapps.com/img/dress_4_m.jpg" />
          </div>
          <div
            className="f-carousel__slide"
            data-thumb-src="https://fancyapps.com/img/dress_5_s.jpg"
            data-fancybox="gallery"
            data-src="https://fancyapps.com/img/dress_5_b.jpg"
          >
            <img alt="" src="https://fancyapps.com/img/dress_5_m.jpg" />
          </div>
          <div
            className="f-carousel__slide"
            data-thumb-src="https://fancyapps.com/img/dress_6_s.jpg"
            data-fancybox="gallery"
            data-src="https://fancyapps.com/img/dress_6_b.jpg"
          >
            <img alt="" src="https://fancyapps.com/img/dress_6_m.jpg" />
          </div>
        </div>
      </div>
    </FancyboxWrapper>
  );
};

export default ProductSlider;
