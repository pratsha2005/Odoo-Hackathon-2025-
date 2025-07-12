import React, { useState } from 'react';

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Preview images
    const previews = files.map(file => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleAddSize = () => {
    if (sizeInput && !sizes.includes(sizeInput)) {
      setSizes([...sizes, sizeInput]);
      setSizeInput('');
    }
  };

  const handleRemoveSize = (size) => {
    setSizes(sizes.filter(s => s !== size));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to backend)
    alert('Product added!');
  };

  return (
    <form onSubmit={handleSubmit} className='pt-10 border-t-2'>
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        {/* Image Upload & Preview */}
        <div className='flex flex-col-reverse flex-1 gap-3 sm:flex-row'>
          <div className='flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full'>
            {preview.map((src, idx) => (
              <img
                src={src}
                key={idx}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 border-2 border-gray-200 py-2 px-2'
                alt="Preview"
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%] flex flex-col items-center'>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className='mb-4'
            />
            {preview[0] && (
              <img src={preview[0]} className='w-full h-auto' alt="Main Preview" />
            )}
          </div>
        </div>
        {/* Product Info Form */}
        <div className='flex-1'>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className='mt-2 text-2xl font-medium w-full border-b p-2'
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className='mt-5 text-3xl font-medium w-full border-b p-2'
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='mt-5 text-gray-500 md:w-4/5 border p-2'
            rows={4}
            required
          />
          <div className='flex flex-col gap-4 my-8'>
            <p>Sizes</p>
            <div className='flex gap-2'>
              <input
                type="text"
                placeholder="Add size"
                value={sizeInput}
                onChange={e => setSizeInput(e.target.value)}
                className='border py-2 px-4 rounded-md'
              />
              <button type="button" onClick={handleAddSize} className='border py-2 px-4 bg-gray-100 rounded-md'>
                Add
              </button>
            </div>
            <div className='flex gap-2'>
              {sizes.map((size, idx) => (
                <span key={idx} className='border py-2 px-4 bg-gray-100 rounded-md flex items-center'>
                  {size}
                  <button type="button" onClick={() => handleRemoveSize(size)} className='ml-2 text-red-500'>x</button>
                </span>
              ))}
            </div>
          </div>
          <div className='flex items-center gap-4 mt-5 sm:mt-10'>
            <button
              type="submit"
              className='px-8 py-3 text-sm text-white bg-black active:bg-gray-700'
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