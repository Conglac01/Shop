import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";
import ProductFilter from "../components/ProductFilter";

const Collection = () => {

  const { products, searchQuery } = useContext(ShopContext);
  const { category } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const itemsPerPage = 10;

  useEffect(() => {

    if (!products || products.length === 0) return;

    let filtered = [...products];

    // CATEGORY
    if (category) {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // SEARCH
    if (searchQuery && searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // PRICE FILTER
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

  }, [products, searchQuery, category, sortOption, priceRange]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currPage]);

  // PAGINATION
  const indexOfLastItem = currPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="max-padd-container py-16 pt-28">

      <Title
        title1="All"
        title2={category ? category : "Products"}
        titleStyles="pb-10"
      />

      <div className="flex gap-8">

        <ProductFilter
          setSortOption={setSortOption}
          setPriceRange={setPriceRange}
        />

        <div className="flex-1">

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

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

          {totalPages > 1 && (

            <div className="flex items-center justify-center gap-4 mt-12">

              <button
                disabled={currPage === 1}
                onClick={() => setCurrPage((prev) => prev - 1)}
                className="px-3 py-1.5 text-sm border rounded"
              >
                Previous
              </button>

              <div className="flex gap-2">

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
                className="px-3 py-1.5 text-sm border rounded"
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