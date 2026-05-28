import React from "react";
import {
  FaTachometerAlt,
  FaSearch,
  FaShoppingCart,
  FaBox,
  FaUserCircle,
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
            onClick={() => navigate("/my-orders")}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >
            <FaBox />
            My Orders
          </p>

         <div className="flex items-center gap-4">

  <p className="flex items-center gap-2">

    <FaUserCircle />

    {customer?.fullName}

  </p>

  <button
    onClick={() => {

      localStorage.removeItem(
        "customer"
      );

      navigate("/customer-login");

    }}
    className="bg-white text-red-500 hover:bg-gray-200 px-4 py-1 rounded font-semibold"
  >

    Logout

  </button>

</div>
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
          onClick={() => navigate("/my-orders")}
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

          {/* Fake Chart */}

          <div className="border rounded-xl p-10 bg-gray-50">

            <div className="flex justify-center items-end gap-10 h-[250px]">

              <div className="flex flex-col items-center">

                <div className="bg-teal-700 w-20 h-44 rounded-t-xl"></div>

                <p className="mt-3 font-semibold">
                  Paracetamol
                </p>

              </div>

              <div className="flex flex-col items-center">

                <div className="bg-teal-500 w-20 h-32 rounded-t-xl"></div>

                <p className="mt-3 font-semibold">
                  Vitamin C
                </p>

              </div>

              <div className="flex flex-col items-center">

                <div className="bg-teal-400 w-20 h-24 rounded-t-xl"></div>

                <p className="mt-3 font-semibold">
                  Dolo 650
                </p>

              </div>

              <div className="flex flex-col items-center">

                <div className="bg-teal-300 w-20 h-16 rounded-t-xl"></div>

                <p className="mt-3 font-semibold">
                  Cough Syrup
                </p>

              </div>

            </div>

          </div>

          {/* Bottom Icon */}

          <div className="flex justify-center mt-8">

            <FaPills className="text-7xl text-gray-300" />

          </div>

        </div>

      </div>

    </div>

  );
}