import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import { PiCoinsFill } from 'react-icons/pi';
import axios from 'axios';
import { getItemByUserRoute } from '../api/routes';

const Profile = () => {
  const [user, setUser] = useState('');
  const [listings, setListings] = useState([]);
  const [exchanges] = useState([]); // Placeholder: exchanges logic not implemented yet

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (loggedInUser && token) {
      setUser(loggedInUser);

      const fetchUserListings = async () => {
        try {
          const response = await axios.get(`${getItemByUserRoute}/${loggedInUser._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const mappedListings = (response.data.data || []).map(item => ({
            _id: item._id,
            name: item.description || item.name || 'No Name',
            status: item.status || 'Active',
            price: item.redeemPoints || item.price || 0,
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
            image:
              item.image && item.image.length > 20
                ? `data:image/jpeg;base64,${item.image}`
                : '/placeholder.jpg',
          }));

          setListings(mappedListings);
        } catch (error) {
          console.error('Error fetching user listings:', error);
        }
      };

      fetchUserListings();
    } else {
      console.warn('User or token not found in localStorage.');
    }
  }, []);

  return (
    <div className="pt-16 border-t">
      <div className="text-2xl mb-8">
        <Title text1={'YOUR'} text2={'PROFILE'} />
      </div>

      {/* User Info */}
      <section className="flex items-center gap-6 bg-white rounded shadow p-6 mb-8 border">
        <img src={user.avatar || '/placeholder.jpg'} alt="avatar" className="w-20 h-20 rounded-full border" />
        <div>
          <h2 className="text-2xl font-semibold">{user.username || user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </section>

      {/* Listings */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">My Listings</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {(!listings || listings.length === 0) ? (
            <p className="text-gray-500">No listings yet.</p>
          ) : (
            listings.map(item => (
              <div
                key={item._id}
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

      {/* Exchanges Placeholder */}
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
