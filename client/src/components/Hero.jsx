import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

// Import ảnh từ các category
import Tshirt from "../assets/picturedata/Tshirt1-10/ao3.png";
import Poloshirt from "../assets/picturedata/Poloshirt11-20/ao14.png";
import Windbreaker from "../assets/picturedata/Windbreaker21-30/ao21.png";
import Sweatshirt from "../assets/picturedata/Sweatshirt31-40/ao31.png";
import Downjacket from "../assets/picturedata/Downjacket41-50/ao41.png";

const Hero = () => {
  const { products } = useContext(ShopContext);

  // Lấy sản phẩm từ mỗi category để hiển thị
  const tshirt = products.find(p => p.category === "Tshirt");
  const polo = products.find(p => p.category === "Poloshirt");
  const windbreaker = products.find(p => p.category === "Windbreaker");
  const sweatshirt = products.find(p => p.category === "Sweatshirt");
  const downjacket = products.find(p => p.category === "Downjacket");

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

        {/* RIGHT PRODUCT GRID - 5 SẢN PHẨM TỪ 5 CATEGORY */}
        <div className="grid grid-cols-3 gap-4">
          {/* Hàng trên - 3 sản phẩm */}
          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition col-span-1">
            <div className="h-[120px] flex items-center justify-center">
              <img
                src={tshirt?.image?.[0] || Tshirt}
                alt="Tshirt"
                className="max-h-full object-contain"
              />
            </div>
            <h4 className="font-semibold mt-2 text-sm">T-Shirt</h4>
            <p className="text-secondary font-bold">${tshirt?.offerPrice || 29}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition col-span-1">
            <div className="h-[120px] flex items-center justify-center">
              <img
                src={polo?.image?.[0] || Poloshirt}
                alt="Polo"
                className="max-h-full object-contain"
              />
            </div>
            <h4 className="font-semibold mt-2 text-sm">Polo Shirt</h4>
            <p className="text-secondary font-bold">${polo?.offerPrice || 45}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition col-span-1">
            <div className="h-[120px] flex items-center justify-center">
              <img
                src={windbreaker?.image?.[0] || Windbreaker}
                alt="Windbreaker"
                className="max-h-full object-contain"
              />
            </div>
            <h4 className="font-semibold mt-2 text-sm">Windbreaker</h4>
            <p className="text-secondary font-bold">${windbreaker?.offerPrice || 59}</p>
          </div>

          {/* Hàng dưới - 2 sản phẩm */}
          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition col-span-1 col-start-1">
            <div className="h-[120px] flex items-center justify-center">
              <img
                src={sweatshirt?.image?.[0] || Sweatshirt}
                alt="Sweatshirt"
                className="max-h-full object-contain"
              />
            </div>
            <h4 className="font-semibold mt-2 text-sm">Sweatshirt</h4>
            <p className="text-secondary font-bold">${sweatshirt?.offerPrice || 45}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition col-span-1 col-start-2">
            <div className="h-[120px] flex items-center justify-center">
              <img
                src={downjacket?.image?.[0] || Downjacket}
                alt="Down Jacket"
                className="max-h-full object-contain"
              />
            </div>
            <h4 className="font-semibold mt-2 text-sm">Down Jacket</h4>
            <p className="text-secondary font-bold">${downjacket?.offerPrice || 99}</p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;