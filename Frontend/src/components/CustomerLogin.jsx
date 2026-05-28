import React, { useState } from "react";
import {
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function CustomerLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/customers/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        // SAVE CUSTOMER DATA
        localStorage.setItem(
          "customer",
          JSON.stringify(data.customer)
        );

        alert("Login Successful");

        navigate("/customer-dashboard");

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
      <nav className="bg-teal-700 text-white px-4 py-3 flex justify-between items-center shadow-md">

        <h1 className="text-2xl font-bold">
          Online Pharmacy
        </h1>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:text-gray-200"
        >

          <FaSignOutAlt />
          Exit

        </button>

      </nav>

      {/* Login Container */}
      <div className="flex justify-center items-center mt-20">

        <div className="bg-white w-[350px] rounded-xl shadow-xl p-8 border-t-4 border-teal-700">

          {/* Heading */}
          <div className="flex items-center justify-center gap-3 mb-8">

            <FaUserCircle className="text-4xl text-teal-700" />

            <h2 className="text-4xl font-bold text-teal-700">

              Customer Login

            </h2>

          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-gray-700 font-semibold mb-2">

                Email

              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-2">

                Password

              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-md font-semibold flex justify-center items-center gap-2 transition"
            >

              <FaSignInAlt />
              Login

            </button>

          </form>

          {/* Register */}
          <p className="text-center mt-6 text-gray-700">

            Don't have an account?{" "}

            <button
              onClick={() => navigate('/customer-register')}
              className="text-teal-700 font-bold hover:underline inline-flex items-center gap-1"
            >

              <FaUserPlus />
              Register

            </button>

          </p>

        </div>

      </div>

    </div>

  );

}