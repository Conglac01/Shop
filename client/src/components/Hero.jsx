import React from "react";
import { Link } from "react-router-dom";

import jacket from "../assets/hero/jacket.png";
import son from "../assets/hero/son.png";
import dress from "../assets/hero/dress.png";
import clothes from "../assets/hero/clothes.png";

const Hero = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex items-center">

      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div>

          <h3 className="text-secondary font-pacifico text-xl mb-3">
            Winter Collection
          </h3>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Style Meets Comfort
          </h1>

          <p className="mt-5 max-w-md text-gray-700">
            Discover premium jackets, sneakers and fashion essentials designed
            for modern lifestyle.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/collection"
              className="bg-tertiary text-white px-7 py-3 rounded-lg hover:scale-105 transition"
            >
              Shop Now
            </Link>
          </div>

        </div>

        {/* RIGHT PRODUCT GRID */}

        <div className="grid grid-cols-2 gap-6">

          {/* CARD */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="h-[160px] flex items-center justify-center">
              <img
                src={jacket}
                alt="jacket"
                className="max-h-full object-contain"
              />
            </div>

            <h4 className="font-semibold mt-4">Winter Jacket</h4>
            <p className="text-gray-600">$99</p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="h-[160px] flex items-center justify-center">
              <img
                src={son}
                alt="son"
                className="max-h-full object-contain"
              />
            </div>

            <h4 className="font-semibold mt-4">Son</h4>
            <p className="text-gray-600">$79</p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="h-[160px] flex items-center justify-center">
              <img
                src={dress}
                alt="dress"
                className="max-h-full object-contain"
              />
            </div>

            <h4 className="font-semibold mt-4">Dress</h4>
            <p className="text-gray-600">$59</p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="h-[160px] flex items-center justify-center">
              <img
                src={clothes}
                alt="clothes"
                className="max-h-full object-contain"
              />
            </div>

            <h4 className="font-semibold mt-4">Clothes</h4>
            <p className="text-gray-600">$129</p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;