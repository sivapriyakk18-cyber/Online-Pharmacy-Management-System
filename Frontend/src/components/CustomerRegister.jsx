import React, { useState } from "react";
import {
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function CustomerRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/customers/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
          
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Customer Registered Successfully");

        navigate('/customer-login');

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">

      {/* Navbar */}
      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">

        <h1 className="text-2xl font-bold flex items-center gap-2">
          💊 Online Pharmacy
        </h1>

        <button
          onClick={() => navigate("/customer-login")}
          className="flex items-center gap-2 hover:text-gray-200 transition font-semibold"
        >

          <FaSignOutAlt />
          Exit

        </button>

      </nav>

      {/* Main Form Container */}
      <div className="flex-grow flex items-center justify-center py-10 px-4">

        <div className="bg-white w-[420px] rounded-xl shadow-xl border-t-4 border-teal-700 p-8">

          {/* Header */}
          <div className="flex flex-col items-center mb-6">

            <div className="bg-teal-50 p-4 rounded-full mb-3 text-teal-700 text-3xl">
              <FaUserPlus />
            </div>

            <h2 className="text-3xl font-bold text-teal-700 text-center">
              Customer Registration
            </h2>

            <p className="text-gray-500 text-sm mt-1 text-center">
              Create your account to order medicines online
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Full Name */}
            <div>

              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                required
                placeholder="Enter Full Name"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700 transition"
                value={formData.fullName}
                onChange={handleChange}
              />

            </div>

            {/* Email */}
            <div>

              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700 transition"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* Phone */}
            <div>

              <label className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                required
                placeholder="Enter Phone Number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700 transition"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            {/* City */}
            <div>

              <label className="block text-gray-700 font-medium mb-1">
                City
              </label>

              <input
                type="text"
                name="city"
                required
                placeholder="Enter City"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700 transition"
                value={formData.city}
                onChange={handleChange}
              />

            </div>

            {/* Address */}
            <div>

              <label className="block text-gray-700 font-medium mb-1">
                Address
              </label>

              <input
                type="text"
                name="address"
                required
                placeholder="Enter Address"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700 transition"
                value={formData.address}
                onChange={handleChange}
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                required
                placeholder="Create Password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700 transition"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-md font-semibold flex justify-center items-center gap-2 transition shadow-md mt-6"
            >

              <FaUserPlus />
              Register

            </button>

          </form>

          {/* Already have an account */}
          <p className="text-center mt-6 text-gray-600 text-sm">

            Already have an account?{" "}

            <button
              onClick={() => navigate("/customer-login")}
              className="text-teal-700 font-bold hover:underline inline-flex items-center gap-1"
            >

              <FaSignInAlt />
              Login

            </button>

          </p>

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-teal-700 text-white py-4 text-center text-xs">
        © 2026 Online Pharmacy Management System
      </footer>

    </div>
  );
}