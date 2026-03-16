import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";

const Wishlist = () => {

  const { wishlist, products } = useContext(ShopContext);

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product._id)
  );

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Your wishlist is empty ❤️
      </div>
    );
  }

  return (

    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">

      <h2 className="text-2xl font-semibold mb-6">
        My Wishlist
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {wishlistProducts.map((product) => (

          <Item
            key={product._id}
            product={product}
          />

        ))}

      </div>

    </div>

  );

};

export default Wishlist;