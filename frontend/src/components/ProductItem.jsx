import React from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name }) => {

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="transition ease-in-out hover:scale-110"
          src={`data:image/*;base64,${image[0]}`}
          alt="Product"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
    </Link>
  );
};

export default ProductItem;
