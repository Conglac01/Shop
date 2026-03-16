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

      {/* SALE BANNER */}

      <div className="max-padd-container py-10 lg:py-16">

        <div className="
        relative
        w-full
        h-[260px] sm:h-[320px] md:h-[360px] lg:h-[420px]
        rounded-2xl
        overflow-hidden
        shadow-xl
        group
        ">

          <img
            src={banner}
            alt="bannerImg"
            className="
            w-full
            h-full
            object-cover
            object-center
            group-hover:scale-105
            transition-transform
            duration-700
            "
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

            <h2 className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-black
            uppercase
            mb-3
            text-red-500
            ">
              SALE UP TO 40%
            </h2>

            <p className="
            text-sm
            sm:text-base
            md:text-lg
            lg:text-xl
            font-medium
            text-red-500
            ">
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