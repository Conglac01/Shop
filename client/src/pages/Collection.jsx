import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";
import ProductFilter from "../components/ProductFilter";

const Collection = () => {

  const { products, searchQuery } = useContext(ShopContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const itemsPerPage = 10;

  useEffect(() => {

    if (!products || products.length === 0) return;

    let filtered = [...products];

    // ✅ FILTER THEO TYPE (CHUẨN MỚI)
    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.type === selectedFilter
      );
    }

    // SEARCH
    if (searchQuery && searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // PRICE
    filtered = filtered.filter((product) => {
      const price = product.offerPrice ?? product.price ?? 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // SORT
    if (sortOption === "low-high") {
      filtered.sort(
        (a, b) =>
          (a.offerPrice ?? a.price ?? 0) -
          (b.offerPrice ?? b.price ?? 0)
      );
    }

    if (sortOption === "high-low") {
      filtered.sort(
        (a, b) =>
          (b.offerPrice ?? b.price ?? 0) -
          (a.offerPrice ?? a.price ?? 0)
      );
    }

    if (sortOption === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredProducts(filtered);
    setCurrPage(1);

  }, [products, searchQuery, selectedFilter, sortOption, priceRange]);

  // PAGINATION
  const indexOfLastItem = currPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-16 pt-28">

      <Title title1="All" title2="Products" titleStyles="pb-10" />

      <div className="flex flex-col lg:flex-row gap-6">

        {/* SIDEBAR */}
        <div className="w-full lg:w-[260px]">
          <ProductFilter
            setSortOption={setSortOption}
            setPriceRange={setPriceRange}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>

        {/* PRODUCTS */}
        <div className="flex-1">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <Item key={product._id} product={product} />
              ))
            ) : (
              <h4 className="text-red-500 col-span-full text-center py-10">
                Oops! Nothing matched your search
              </h4>
            )}

          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12 flex-wrap">

              <button
                disabled={currPage === 1}
                onClick={() => setCurrPage((prev) => prev - 1)}
                className="px-3 py-1.5 text-sm border rounded hover:bg-gray-100"
              >
                Previous
              </button>

              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrPage(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currPage === index + 1
                        ? "bg-black text-white"
                        : "border"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currPage === totalPages}
                onClick={() => setCurrPage((prev) => prev + 1)}
                className="px-3 py-1.5 text-sm border rounded hover:bg-gray-100"
              >
                Next
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Collection;