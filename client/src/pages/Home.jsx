import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Categories from '../components/Categories'
import PopularProducts from '../components/PopularProducts'
import Blog from '../components/Blog'
import banner from "../assets/banner.png"

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <PopularProducts />
      
      <div className="max-padd-container py-10 lg:py-16">
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] rounded-2xl overflow-hidden shadow-xl group">
        {/* Ảnh banner */}
        <img 
            src={banner} 
            alt="bannerImg" 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Lớp phủ gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
        
        {/* Nội dung chữ trên banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase mb-4 text-red-500">
                SALE UP TO 40%
                  
            </h2>
            <p className="text-base md:text-lg lg:text-xl font-medium text-red-500">
                FOR ALL WINTER
            </p>
            
        </div>
    </div>
</div>
    <Blog />
    </>
  )
}

export default Home