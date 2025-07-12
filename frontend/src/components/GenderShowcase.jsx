import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const GenderShowcase = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-10">
      <Link to="/products?category=Men" className="relative flex-1 group overflow-hidden rounded-lg shadow-lg">
        <img
          src={assets.for_him}
          alt="For Him"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 flex items-center justify-center group-hover:opacity-40 transition-opacity duration-300">
          <h2 className="text-white text-3xl font-bold">FOR HIM</h2>
        </div>
      </Link>
      <Link to="/products?category=Women" className="relative flex-1 group overflow-hidden rounded-lg shadow-lg">
        <img
          src={assets.for_her}
          alt="For Her"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 flex items-center justify-center group-hover:opacity-40 transition-opacity duration-300">
          <h2 className="text-white text-3xl font-bold">FOR HER</h2>
        </div>
      </Link>
    </div>
  );
};

export default GenderShowcase;
