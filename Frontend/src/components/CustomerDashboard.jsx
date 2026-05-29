import React from "react";
import {
  FaTachometerAlt,
  FaSearch,
  FaShoppingCart,
  FaBox,
  FaSignOutAlt,
  FaChartBar,
  FaPills,
} from "react-icons/fa";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  
const [customer, setCustomer] =
  useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {

  const storedCustomer =
    localStorage.getItem("customer");

  if (storedCustomer) {

    setCustomer(
      JSON.parse(storedCustomer)
    );

  }

}, []);

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">

        <h1 className="text-3xl font-bold">
          Online Pharmacy
        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">

          <p
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >
            <FaTachometerAlt />
            Dashboard
          </p>

          <p
            onClick={() => navigate("/browse-medicines")}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >
            <FaSearch />
            Browse Medicines
          </p>

          <p
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >
            <FaShoppingCart />
            Cart
          </p>

          <p
            onClick={() => navigate("/order-history")}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >
            <FaBox />
            My Orders
          </p>

          <p 
            onClick={() => navigate('/customer-login')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >
            <FaSignOutAlt />
            Logout
          </p>

        </div>

      </nav>

      {/* ================= WELCOME SECTION ================= */}

      <div className="flex justify-center mt-12">

        <div className="bg-white shadow-lg rounded-2xl w-[60%] p-10 text-center">

          <h2 className="text-5xl font-bold text-teal-700 mb-4">

            👋 Welcome, {customer?.fullName}!

          </h2>

          <p className="text-gray-600 text-lg">
            Quickly access your cart, orders, and browse medicines below.
          </p>

        </div>

      </div>

      {/* ================= CARDS SECTION ================= */}

      <div className="flex justify-center gap-8 mt-10 flex-wrap">

        {/* Browse Medicines */}

        <div
          onClick={() => navigate("/browse-medicines")}
          className="bg-white w-[260px] rounded-2xl shadow-lg p-8 border-l-4 border-teal-700 cursor-pointer hover:scale-105 transition"
        >

          <div className="flex flex-col items-center text-center">

            <FaSearch className="text-6xl text-teal-700 mb-5" />

            <h3 className="text-3xl font-bold text-teal-700 mb-3">
              Browse Medicines
            </h3>

            <p className="text-gray-500">
              View all available medicines with details and pricing.
            </p>

          </div>

        </div>

        {/* My Cart */}

        <div
          onClick={() => navigate("/cart")}
          className="bg-white w-[260px] rounded-2xl shadow-lg p-8 border-l-4 border-teal-700 cursor-pointer hover:scale-105 transition"
        >

          <div className="flex flex-col items-center text-center">

            <FaShoppingCart className="text-6xl text-teal-700 mb-5" />

            <h3 className="text-3xl font-bold text-teal-700 mb-3">
              My Cart
            </h3>

            <p className="text-gray-500">
              Check your selected items and proceed to checkout.
            </p>

          </div>

        </div>

        {/* My Orders */}

        <div
          onClick={() => navigate("/order-history")}
          className="bg-white w-[260px] rounded-2xl shadow-lg p-8 border-l-4 border-teal-700 cursor-pointer hover:scale-105 transition"
        >

          <div className="flex flex-col items-center text-center">

            <FaBox className="text-6xl text-teal-700 mb-5" />

            <h3 className="text-3xl font-bold text-teal-700 mb-3">
              My Orders
            </h3>

            <p className="text-gray-500">
              Track your orders and review your order history.
            </p>

          </div>

        </div>

      </div>

      {/* ================= ANALYTICS SECTION ================= */}

      <div className="flex justify-center mt-14 mb-10">

        <div className="bg-white w-[60%] rounded-2xl shadow-lg p-10">

          <h2 className="text-4xl font-bold text-teal-700 text-center mb-8">

            <span className="inline-flex items-center gap-3">

              <FaChartBar />

              Your Top Purchased Medicines

            </span>

          </h2>

          {/* Bottom Icon */}

          <div className="flex justify-center mt-8">

            <FaPills className="text-7xl text-gray-300" />

          </div>

        </div>

      </div>

    </div>

  );
}