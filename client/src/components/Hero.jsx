import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (

<section className="w-full bg-hero bg-no-repeat bg-cover bg-[right_center] min-h-[520px] sm:min-h-[600px] lg:min-h-[700px] flex items-center">

<div className="max-padd-container">

<div className="max-w-[520px]">

<h3 className="text-secondary font-pacifico text-lg sm:text-xl mb-2">
Fresh Fits for Frosty Days
</h3>

<h2 className="uppercase text-sm sm:text-lg tracking-widest mb-2">
GET MORE FOR LESS | 40% OFF!
</h2>

<h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
on Coats & Jackets
</h1>

<div className="flex items-center mt-4">

<h3 className="text-base sm:text-lg">Starting at</h3>

<span className="bg-white px-2 py-1 inline-block rotate-[-2deg] ml-3 text-2xl sm:text-3xl font-bold">

<span className="text-lg sm:text-xl relative bottom-1">$</span>
99<span className="text-lg sm:text-xl">.99</span>

</span>

</div>

<Link
to="/collection"
className="inline-flex items-center justify-center bg-tertiary text-white px-6 sm:px-8 py-3 mt-6 rounded-lg hover:bg-opacity-90 transition"
>

Shop Now

</Link>

</div>

</div>

</section>

  );
};

export default Hero;