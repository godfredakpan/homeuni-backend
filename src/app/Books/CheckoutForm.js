import React, { useState } from "react";

const CheckoutForm = ({ onClose, onCheckout }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, email, phone, address};
    onCheckout(formData);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-70 z-50">
      <div style={{width: 500}}  className="bg-white p-10 rounded shadow-md">
        <h2 className="text-xl text-gray-900 font-semibold mb-4">Place Order <small className="text-green-900"> (we will contact you)</small></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Name:</label>
            <input
              type="text"
              value={name}
              style={{borderBlockColor: 'gray', borderWidth: 1}}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-gray-400 border-black-900 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email:</label>
            <input
              type="email"
              style={{borderBlockColor: 'gray', borderWidth: 1}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-400 border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Phone:</label>
            <input
              type="tel"
              style={{borderBlockColor: 'gray', borderWidth: 1}}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-gray-400 border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Address:</label>
            <textarea
              style={{borderBlockColor: 'gray', borderWidth: 1}}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-gray-400 border-gray-300 rounded-md p-5"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;