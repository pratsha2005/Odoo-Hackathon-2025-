import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const FeaturedCarousel = () => {
  const { products } = useContext(ShopContext);
  const featuredProducts = products.filter((item) => item.bestseller);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"FEATURED"} text2={"ITEMS"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Discover our handpicked selection of featured items, perfect for refreshing your wardrobe.
        </p>
      </div>
      <Slider {...settings}>
        {featuredProducts.map((item, index) => (
          <div key={index} className="px-2">
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedCarousel;
