import React, { useState } from "react";
import {
  FaTruck,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function DeliveryAgentRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
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
        "http://localhost:5000/api/delivery-agents",
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

        alert("Delivery Agent Registered Successfully");

        navigate('/delivery-login');

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-teal-700 text-white px-5 py-3 flex justify-between items-center shadow-md">

        <h1 className="text-2xl font-bold">
          Online Pharmacy
        </h1>

        <button
          onClick={() => navigate('/delivery-login')}
          className="flex items-center gap-2 hover:text-gray-200">

          <FaSignOutAlt />
          Exit

        </button>

      </nav>

      {/* Register Card */}
      <div className="flex justify-center items-center mt-10">

        <div className="bg-white w-[400px] rounded-xl shadow-xl border-t-4 border-teal-700 p-8">

          {/* Heading */}
          <div className="flex flex-col items-center justify-center mb-8">

            <FaTruck className="text-4xl text-teal-700 mb-2" />

            <h2 className="text-4xl font-bold text-teal-700 text-center leading-tight">
              Delivery Agent <br />
              Registration
            </h2>

          </div>

          {/* Form */}
          <form onSubmit={handleRegister}>

            {/* Full Name */}
            <div className="mb-4">

              <label className="block text-gray-700 mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700"
                value={formData.fullName}
                onChange={handleChange}
              />

            </div>

            {/* Email */}
            <div className="mb-4">

              <label className="block text-gray-700 mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* Phone */}
            <div className="mb-4">

              <label className="block text-gray-700 mb-2 font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            {/* City */}
            <div className="mb-4">

              <label className="block text-gray-700 mb-2 font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter City"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700"
                value={formData.city}
                onChange={handleChange}
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-md font-semibold flex justify-center items-center gap-2 transition"
            >

              <FaUserPlus />
              Register

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}