import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { products } from "../assets/assets";

// Sample product data
const productsData = products;

const Products = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 my-2 text-xl cursor-pointer"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Dropdown"
          />
        </p>
        {/* Category Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value="Men" />
              Men
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value="Women" />
              Women
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value="Kids" />
              Kids
            </label>
          </div>
        </div>
        {/* Sub Category Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value="Topwear" />
              Topwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value="Bottomwear" />
              Bottomwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value="Winterwear" />
              Winterwear
            </label>
          </div>
        </div>
        {/* Clear Filters Button */}
        <button className="px-4 py-2 mt-1 text-white bg-black rounded hover:bg-gray-900">
          Clear Filters
        </button>
      </div>

      {/* View Product Items */}
      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl">
          <Title text1={"ALL"} text2={"PRODUCTS"} />
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {productsData.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
