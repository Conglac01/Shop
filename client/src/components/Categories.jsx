import React, { useContext } from "react";
import Title from "./Title";
import { categories } from "../assets/data.js";
import { ShopContext } from "../context/ShopContext";

const Categories = () => {
  const { navigate } = useContext(ShopContext);

  return (
    <section className="max-padd-container py-16">

      <Title
        title1="Shop by"
        title2="Category"
        titleStyles="pb-12"
        paraStyles="hidden"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">

        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/collection/${cat.name.toLowerCase()}`)}
            className="flex flex-col items-center cursor-pointer group"
          >

            {/* ICON CARD */}

            <div className="
            w-[110px] h-[110px]
            flex items-center justify-center
            bg-white
            rounded-full
            shadow-md
            group-hover:shadow-xl
            group-hover:-translate-y-2
            transition-all duration-300
            ">

              <img
                src={cat.image}
                alt={cat.name}
                className="
                w-[60px] h-[60px]
                object-contain
                group-hover:scale-110
                transition duration-300
                "
              />

            </div>

            {/* CATEGORY NAME */}

            <h5 className="
            mt-4
            text-sm
            font-semibold
            uppercase
            tracking-wide
            text-gray-700
            group-hover:text-black
            transition
            ">
              {cat.name}
            </h5>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Categories;