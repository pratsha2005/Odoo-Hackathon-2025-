import React, { useState, useRef } from 'react';
import { addProductRoute } from '../api/routes'; // Adjust the import path as necessary
import axios from 'axios';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [redeemPoints, setRedeemPoints] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [size, setSize] = useState('');
  const fileInputRef = useRef();

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Preview image
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!description || !redeemPoints || !category || !subcategory || !size) {
      alert('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description); // Main product name/desc
    formData.append('redeemPoints', redeemPoints);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('size', size);
    if (title) formData.append('title', title); // Optional, if backend supports
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      await axios.post(addProductRoute, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product added successfully!');

      // Clear form
      setTitle('');
      setDescription('');
      setRedeemPoints('');
      setCategory('');
      setSubcategory('');
      setSize('');
      setImage(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Something went wrong while uploading the product.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-10 border-t-2">
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* Image Upload & Preview */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="w-full sm:w-[80%] flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
              ref={fileInputRef}
            />
            {preview && (
              <img src={preview} className="w-full h-auto" alt="Preview" />
            )}
          </div>
        </div>

        {/* Product Info Form */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Product Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 text-2xl font-medium w-full border-b p-2"
          />
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 text-2xl font-medium w-full border-b p-2"
            rows={3}
            required
          />
          <input
            type="number"
            placeholder="Redeem Points"
            value={redeemPoints}
            onChange={(e) => setRedeemPoints(e.target.value)}
            className="mt-5 text-3xl font-medium w-full border-b p-2"
            required
          />

          <div className="flex flex-col gap-4 my-8">
            <p>Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border py-2 px-4 rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="flex flex-col gap-4 my-8">
            <p>Subcategory</p>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="border py-2 px-4 rounded-md"
              required
            >
              <option value="">Select Subcategory</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Topwear">Topwear</option>
            </select>
          </div>

          <div className="flex flex-col gap-4 my-8">
            <p>Size</p>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border py-2 px-4 rounded-md"
              required
            >
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className="flex items-center gap-4 mt-5 sm:mt-10">
            <button
              type="submit"
              className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;