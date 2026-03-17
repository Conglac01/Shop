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

      {/* SALE BANNER */}
<div className="max-padd-container py-12 lg:py-20">

  <div className="
    relative
    w-full
    h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px]
    rounded-3xl
    overflow-hidden
    shadow-2xl
    group
  ">

    {/* IMAGE */}
    <img
      src={banner}
      alt="bannerImg"
      className="
        w-full
        h-full
        object-cover
        object-center
        group-hover:scale-110
        transition-transform
        duration-700
        ease-out
      "
    />

    {/* OVERLAY */}
    <div className="
      absolute inset-0
      bg-gradient-to-r
      from-black/70
      via-black/30
      to-transparent
    "></div>

    {/* CONTENT */}
    <div className="
      absolute inset-0
      flex flex-col
      justify-center
      items-start
      px-6 sm:px-10 md:px-16
      text-white
    ">

      <span className="
        mb-3
        px-4 py-1
        text-xs sm:text-sm
        bg-red-500/90
        rounded-full
        font-semibold
        tracking-wider
        uppercase
        shadow-md
      ">
        Limited Offer
      </span>

      <h2 className="
        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        font-extrabold
        leading-tight
        mb-4
        drop-shadow-lg
      ">
        Up to <span className="text-red-500">40% OFF</span>
      </h2>

      <p className="
        text-sm sm:text-base md:text-lg
        mb-6
        text-gray-200
        max-w-md
      ">
        Discover our winter collection with premium quality and modern style.
      </p>

      {/* BUTTON */}
      <button className="
        px-6 py-3
        bg-red-500
        hover:bg-red-600
        transition
        duration-300
        rounded-full
        font-semibold
        shadow-lg
        hover:scale-105
      ">
        Shop Now
      </button>

    </div>

  </div>

</div>

      <Blog />

    </>
  )
}

export default Home