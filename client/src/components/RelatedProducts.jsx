import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Item from './Item';

const RelatedProducts = ({ product, id }) => {
    const { products } = useContext(ShopContext)
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if (products?.length > 0 && product) {
            // Lọc sản phẩm cùng category và khác ID
            let filtered = products.filter((item) => 
                item.category === product.category && item._id !== product._id
            )
            
            // Nếu không đủ sản phẩm cùng category, lấy thêm sản phẩm từ category khác
            if (filtered.length < 7) {
                const otherProducts = products.filter((item) => 
                    item._id !== product._id && !filtered.includes(item)
                )
                filtered = [...filtered, ...otherProducts]
            }
            
            // Lấy tối đa 6 sản phẩm
            setRelatedProducts(filtered.slice(0, 7))
        }
    }, [products, product])

    return (
        <section className="pt-14">
            <Title
                title1="Related"
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
                {relatedProducts.map((item) => (
                    <SwiperSlide key={item._id}>
                        <Item product={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default RelatedProducts