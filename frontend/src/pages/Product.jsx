import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { getItemById } from '../api/routes';

const Product = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found");
          return;
        }

        const response = await axios.get(`${getItemById}/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const item = response.data?.data;
        console.log("Fetched Product:", item);

        setProductData(item);
        setImage(item.image || '');
        setSize(item.sizes || ''); // if sizes is a string
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProductData();
  }, [productId]);

  if (!productData) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className='pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100'>
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        {/* Product Image */}
        <div className='w-full sm:w-1/2'>
          {image ? (
            <img
              src={`data:image/jpeg;base64,${image}`}
              className='w-full h-auto border rounded'
              alt="Product"
            />
          ) : (
            <img
              src="/placeholder.jpg"
              className="w-full h-auto border rounded"
              alt="Placeholder"
            />
          )}
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='mt-2 text-2xl font-medium'>ReWear Product</h1>

          <div className='flex items-center gap-2 mt-2'>
            <img className='w-8 h-8' src="/redeem_coin.webp" alt="coin" />
            <span className='text-3xl font-medium'>{productData.redeemPoints}</span>
          </div>

          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Size */}
          {productData.sizes && (
            <div className='flex flex-col gap-4 my-8'>
              <p className="font-medium">Size</p>
              <div className='flex gap-2'>
                <span className="border py-2 px-4 bg-gray-100 rounded-md border-orange-500">
                  {productData.sizes}
                </span>
              </div>
            </div>
          )}

          <div className='flex items-center gap-4 mt-5 sm:mt-10'>
            <button
              onClick={() => addToCart(productData._id, size)}
              className='px-8 py-3 text-sm text-white bg-black active:bg-gray-700'
            >
              Request Exchange
            </button>
            <button
              onClick={() => addToCart(productData._id, size)}
              className='px-8 py-3 text-sm border border-black text-black bg-white active:bg-gray-200'
            >
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
