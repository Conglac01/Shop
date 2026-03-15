import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Item from "./Item";
import ProductSkeleton from "./ProductSkeleton";

const PopularProducts = () => {

  const { products } = useContext(ShopContext);

  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (products && products.length > 0) {

      const popularItems = products.filter(
        (item) => item.popular === true
      );

      setPopularProducts(popularItems.slice(0, 7));
      setLoading(false);
    }

  }, [products]);

  return (
    <section className="max-padd-container pt-16 pb-10 px-4 sm:px-0">

      <Title
        title1="Popular"
        title2="Products"
        titleStyles="pb-12 text-left"
        titlestyles="text-3xl md:text-4xl font-bold"
        para="Explore our collection of stylish clothing and footwear made for comfort, quality, and everyday confidence."
        paraStyles="text-gray-500 text-base max-w-2xl text-left"
      />

      {/* LOADING SKELETON */}

      {loading ? (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {[...Array(5)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}

        </div>

      ) : (

        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 15 },
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
          }}
          modules={[Autoplay]}
          className="min-h-[420px]"
        >

          {popularProducts.map((product) => (

            <SwiperSlide key={product._id}>
              <Item product={product} />
            </SwiperSlide>

          ))}

        </Swiper>

      )}

    </section>
  );
};

export default PopularProducts;