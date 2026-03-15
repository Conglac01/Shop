import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const Item = ({ product }) => {

  const { currency, navigate, addToCart, wishlist, toggleWishlist } = useContext(ShopContext);

  const [added, setAdded] = useState(false);

  const isWishlisted = wishlist.find(item => item._id === product._id);

  const handleAddToCart = (e) => {

    e.stopPropagation();

    addToCart(product._id, product.sizes?.[0] || "M");

    setAdded(true);

    setTimeout(() => {
      navigate(`/collection/${product.category?.toLowerCase()}/${product._id}`);
    }, 300);

  };

  const images = Array.isArray(product.image) ? product.image : [product.image];

  const image1 = images[0];
  const image2 = images[1] || images[0];

  const price = product.offerPrice ?? product.price ?? 0;

  const discount =
    product.price && product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  const goToProduct = () => {
    navigate(`/collection/${product.category?.toLowerCase()}/${product._id}`);
  };

  return (

    <div
      onClick={goToProduct}
      className="relative rounded-xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white flex flex-col justify-between group"
    >

      {/* SALE BADGE */}

      {discount > 0 && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-[2px] rounded z-10">
          -{discount}%
        </div>
      )}

      {/* WISHLIST */}

      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-3 right-3 text-lg cursor-pointer z-10"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FiHeart className="text-gray-400 hover:text-red-400" />
        )}
      </div>


      {/* IMAGE HOVER */}

      <div className="overflow-hidden rounded-lg relative">

        <img
          src={image1}
          alt={product.name}
          className="w-full h-52 object-cover transition duration-500 group-hover:opacity-0"
        />

        <img
          src={image2}
          alt={product.name}
          className="w-full h-52 object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-500"
        />

      </div>


      {/* CONTENT */}

      <div className="mt-3 flex flex-col flex-grow">

        <h3 className="text-sm font-semibold text-gray-700 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {product.category}
        </p>

        <div className="flex items-center justify-between mt-3">

          <div className="flex items-center gap-2">

            <p className="text-base font-bold text-secondary">
              {currency}{price}
            </p>

            {product.price && (
              <span className="text-xs text-gray-400 line-through">
                {currency}{product.price}
              </span>
            )}

          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-1 text-xs rounded-md transition ${
              added
                ? "bg-red-200 text-red-600"
                : "bg-secondary text-white hover:bg-secondary/80"
            }`}
          >
            {added ? "Added" : "Add"}
          </button>

        </div>

      </div>

    </div>

  );
};

export default Item;