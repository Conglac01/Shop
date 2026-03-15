import React from "react";

const ProductFilter = ({ setSortOption, setPriceRange }) => {

  return (

    <div className="w-full lg:w-[260px] bg-white p-5 rounded-xl shadow-sm border">

      <h3 className="font-semibold mb-4 text-gray-700 text-lg">
        Filter Products
      </h3>

      {/* SORT */}

      <div className="mb-6">

        <h4 className="text-sm font-medium mb-2">
          Sort By
        </h4>

        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full border rounded p-2 text-sm focus:outline-none"
        >
          <option value="default">Default</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="rating">Best Rating</option>
        </select>

      </div>


      {/* PRICE */}

      <div>

        <h4 className="text-sm font-medium mb-2">
          Price Range
        </h4>

        <select
          onChange={(e) => {

            const value = e.target.value

            if (value === "all") setPriceRange([0, 1000])
            if (value === "50") setPriceRange([0, 50])
            if (value === "100") setPriceRange([50, 100])
            if (value === "200") setPriceRange([100, 200])
            if (value === "500") setPriceRange([200, 1000])

          }}
          className="w-full border rounded p-2 text-sm focus:outline-none"
        >

          <option value="all">All Prices</option>
          <option value="50">Under $50</option>
          <option value="100">$50 - $100</option>
          <option value="200">$100 - $200</option>
          <option value="500">$200+</option>

        </select>

      </div>

    </div>

  )

}

export default ProductFilter