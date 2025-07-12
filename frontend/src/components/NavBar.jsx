import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();

  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      {/* Logo */}
      <Link to="/">
        <img src="/logo.jpg" className="w-36" alt="ReWear" />
      </Link>

      {/* Navigation Links - Desktop */}
      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <NavLink to="/" className="flex flex-col items-center gap-1">HOME</NavLink>
        <NavLink to="/products" className="flex flex-col items-center gap-1">PRODUCTS</NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">ABOUT</NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">CONTACT</NavLink>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search Products"
        />

        {/* Profile Dropdown */}
        <div className="relative group">
          <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="Your Profile" />
          <div className="absolute right-0 hidden pt-4 group-hover:block z-50">
            <div className="flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100 shadow-lg">
              {user ? (
                <>
                  <Link to="/profile" className="hover:text-black">Profile</Link>
                  <Link to="/add-product" className="hover:text-black">Add Product</Link>
                  <Link to="/orders" className="hover:text-black">Orders</Link>
                  <p onClick={handleLogout} className="cursor-pointer hover:text-black">Logout</p>
                </>
              ) : (
                <Link to="/login" className="hover:text-black">Login</Link>
              )}
            </div>
          </div>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Hamburger Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu Icon"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-white transition-all duration-300 shadow-lg ${
          visible ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 border-b cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Close Menu" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/products">PRODUCTS</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/contact">CONTACT</NavLink>
          {user ? (
            <>
              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/profile">PROFILE</NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/orders">ORDERS</NavLink>
              <p onClick={handleLogout} className="py-2 pl-6 border-b cursor-pointer">LOGOUT</p>
            </>
          ) : (
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/login">LOGIN</NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
