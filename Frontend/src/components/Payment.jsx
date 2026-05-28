import React, { useState } from "react";

import {
  FaCreditCard,
  FaCheckCircle,
  FaShoppingCart,
  FaUserCircle,
  FaBox,
  FaSearch,
  FaTachometerAlt
} from "react-icons/fa";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

export default function Payment() {

  const navigate = useNavigate();

  const location = useLocation();

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  const cartItems =
    location.state?.cartItems || [];

  const grandTotal =
    location.state?.grandTotal || 0;

  const [paymentMethod,
    setPaymentMethod] =
    useState("");

  // ================= PHARMACY NAME =================

  const pharmacyName =
    cartItems[0]?.pharmacyName || "";

  // ================= CONFIRM ORDER =================

  const handleOrder = async () => {

    if (!paymentMethod) {

      alert("Select Payment Method");

      return;

    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/place-order",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            customerId:
              customer?._id,

            customerName:
              customer?.fullName,

            pharmacyName:
              pharmacyName,

            medicines:
              cartItems,

            totalAmount:
              grandTotal,

            paymentMethod

          })

        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        alert(data.message);

        return;

      }

      // ================= CLEAR CART =================

      for (const item of cartItems) {

        await fetch(
          `http://localhost:5000/api/cart/${item._id}`,
          {
            method: "DELETE"
          }
        );

      }

      alert(
        "Order Confirmed Successfully"
      );

      navigate("/order-history");

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">

        <h1 className="text-2xl font-bold">

          Online Pharmacy

        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">

          {/* DASHBOARD */}

          <p
            onClick={() =>
              navigate(
                "/customer-dashboard"
              )
            }
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >

            <FaTachometerAlt />

            Dashboard

          </p>

          {/* BROWSE */}

          <p
            onClick={() =>
              navigate(
                "/browse-medicines"
              )
            }
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >

            <FaSearch />

            Browse Medicines

          </p>

          {/* CART */}

          <p
            onClick={() =>
              navigate("/cart")
            }
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >

            <FaShoppingCart />

            Cart

          </p>

          {/* ORDERS */}

          <p
            onClick={() =>
              navigate(
                "/order-history"
              )
            }
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >

            <FaBox />

            My Orders

          </p>

          {/* CUSTOMER */}

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

                navigate(
                  "/customer-login"
                );

              }}
              className="bg-white text-red-500 hover:bg-gray-200 px-4 py-1 rounded font-semibold"
            >

              Logout

            </button>

          </div>

        </div>

      </nav>

      {/* ================= PAYMENT BOX ================= */}

      <div className="flex justify-center pt-16">

        <div className="bg-white w-[70%] p-10 rounded-2xl shadow-xl">

          <h1 className="text-3xl font-bold text-teal-700 mb-8 flex items-center gap-3">

            <FaCreditCard />

            Select Payment Method

          </h1>

          {/* ================= PAYMENT SELECT ================= */}

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
            className="w-full border p-3 rounded mb-6"
          >

            <option value="">
              -- Select Payment --
            </option>

            <option value="Cash On Delivery">
              Cash On Delivery
            </option>

            <option value="Online Payment">
              Online Payment
            </option>

          </select>

          {/* ================= CONFIRM BUTTON ================= */}

          <button
            onClick={handleOrder}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-lg text-xl flex items-center justify-center gap-3"
          >

            <FaCheckCircle />

            Confirm Order

          </button>

        </div>

      </div>

    </div>

  );

}