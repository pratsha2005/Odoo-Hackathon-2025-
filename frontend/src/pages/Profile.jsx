import React, { useState } from 'react';
import Title from '../components/Title';
import { PiCoinsFill } from 'react-icons/pi'; // coin icon from phosphor-react or use any

const dummyUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/100',
};

const dummyListings = [
  { id: 1, name: 'Blue T-shirt', status: 'Active', price: 499, date: '10 Jul 2025', image: 'https://via.placeholder.com/80x80?text=Blue+T-shirt' },
  { id: 2, name: 'Red Hoodie', status: 'Sold', price: 899, date: '02 Jul 2025', image: 'https://via.placeholder.com/80x80?text=Red+Hoodie' },
];

const dummyExchanges = [
  { id: 1, product: 'Green Jacket', with: 'Alice', status: 'Completed', date: '01 Jul 2025', image: 'https://via.placeholder.com/80x80?text=Green+Jacket' },
  { id: 2, product: 'Black Jeans', with: 'Bob', status: 'Pending', date: '28 Jun 2025', image: 'https://via.placeholder.com/80x80?text=Black+Jeans' },
];

const Profile = () => {
  const [user] = useState(dummyUser);
  const [listings] = useState(dummyListings);
  const [exchanges] = useState(dummyExchanges);

  return (
    <div className="pt-16 border-t">
      <div className="text-2xl mb-8">
        <Title text1={'YOUR'} text2={'PROFILE'} />
      </div>

      {/* User Info */}
      <section className="flex items-center gap-6 bg-white rounded shadow p-6 mb-8 border">
        <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full border" />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </section>

      {/* Listings */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">My Listings</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {listings.length === 0 ? (
            <p className="text-gray-500">No listings yet.</p>
          ) : (
            listings.map(item => (
              <div
                key={item.id}
                className="flex flex-col gap-2 bg-white rounded-xl shadow-md border hover:shadow-lg transition p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-24 rounded object-cover border"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-base">{item.name}</p>
                  <div className="flex items-center text-gray-600 gap-1">
                    <PiCoinsFill className="text-yellow-500 text-lg" />
                    <span className="text-sm">₹{item.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs">Listed on: {item.date}</p>
                  <span
                    className={`w-fit mt-1 px-3 py-1 rounded-full text-xs font-medium 
                    ${item.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                      }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

{/* Exchanges */}
<div className="mb-10">
  <h3 className="text-xl font-semibold mb-4">My Exchanges</h3>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
    {exchanges.length === 0 ? (
      <p className="text-gray-500">No exchanges yet.</p>
    ) : (
      exchanges.map(ex => (
        <div
          key={ex.id}
          className="flex flex-col gap-2 bg-white rounded-xl shadow-md border hover:shadow-lg transition p-4"
        >
          <img
            src={ex.image}
            alt={ex.product}
            className="w-full h-24 rounded object-cover border"
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base">{ex.product}</p>
            <p className="text-gray-500 text-sm">With: {ex.with}</p>
            <p className="text-gray-400 text-xs">Date: {ex.date}</p>
            <span
              className={`w-fit mt-1 px-3 py-1 rounded-full text-xs font-medium 
              ${ex.status === 'Completed'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {ex.status}
            </span>
          </div>
        </div>
      ))
    )}
  </div>
</div>

    </div>
  );
};

export default Profile;
