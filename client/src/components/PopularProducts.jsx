import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Item from './Item';

const PopularProducts = () => {
    const { products } = useContext(ShopContext)
    const [popularProducts, setPopularProducts] = useState([])

    // CHỈ MỘT useEffect - KHÔNG lồng nhau
    useEffect(() => {
        if (products && products.length > 0) {
            // Lọc sản phẩm popular và lấy 6 cái đầu
            const popularItems = products.filter(item => item.popular === true)
            setPopularProducts(popularItems.slice(0, 7))
        }
    }, [products])  // Chạy lại khi products thay đổi

    return (
        <section className="max-padd-container pt-16 pb-10">
            <Title
                title1="Popular"
                title2="Products"
                titleStyles="pb-12 text-left"
                titlestyles="text-3xl md:text-4xl font-bold"
                para="Explore our collection of stylish clothing and footwear made for comfort, quality, and everyday confidence."
                paraStyles="text-gray-30 text-base max-w-2xl text-left"
            />
            
            <Swiper
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    555: { slidesPerView: 2, spaceBetween: 20 },
                    800: { slidesPerView: 3, spaceBetween: 20 },
                    1150: { slidesPerView: 4, spaceBetween: 20 },
                    1350: { slidesPerView: 5, spaceBetween: 20 }
                }}
                modules={[Autoplay]}
                className='min-h-[450px] mt-4'
            >
                {popularProducts.map((product) => (
                    <SwiperSlide key={product._id}>
                        <Item product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default PopularProducts