import React, {
  useEffect,
  useState
} from "react";

import {
  FaShoppingCart,
  FaTrash,
  FaSync,
  FaCreditCard,
  FaChartBar,
  FaSignOutAlt,
  FaPills,
  FaClipboardList,
  FaUserCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const customerName =
    localStorage.getItem("customerName");

  // ================= FETCH CART =================

  const fetchCart = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/cart"
      );

      const data =
        await response.json();

      setCartItems(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchCart();

  }, []);

  // ================= UPDATE =================

  const updateQuantity = async (
    id,
    quantity
  ) => {

    try {

      await fetch(
        `http://localhost:5000/api/cart/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            quantity
          })
        }
      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= DELETE =================

  const deleteItem = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/cart/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= TOTAL =================

  const grandTotal =
    cartItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <div className="bg-teal-700 text-white flex justify-between items-center px-8 py-3 shadow-md">

        <h1 className="text-2xl font-bold">

          Online Pharmacy

        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">

          <p
            onClick={() =>
              navigate('/customer-dashboard')
            }
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaChartBar />

            Dashboard

          </p>

          <p
            onClick={() =>
              navigate('/browse-medicines')
            }
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaPills />

            Browse Medicines

          </p>

          <p
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaShoppingCart />

            Cart

          </p>

          <p
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaClipboardList />

            My Orders

          </p>

          <p className="flex items-center gap-2">

            <FaUserCircle />

            {customerName}

          </p>

          <button
            onClick={() => navigate('/')}
            className="bg-white text-red-500 px-4 py-2 rounded-lg font-semibold"
          >

            Logout

          </button>

        </div>

      </div>

      {/* ================= CART SECTION ================= */}

      <div className="p-10">

        <div className="bg-white p-8 rounded-2xl shadow-xl">

          <h1 className="text-4xl font-bold text-teal-700 flex items-center gap-3 mb-8">

            <FaShoppingCart />

            My Cart

          </h1>

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-4">
                  Medicines
                </th>

                <th className="border p-4">
                  Quantity
                </th>

                <th className="border p-4">
                  Price
                </th>

                <th className="border p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {
                cartItems.length > 0 ? (

                  cartItems.map((item) => (

                    <tr key={item._id}>

                      <td className="border p-4">

                        {item.medicineName}

                      </td>

                      <td className="border p-4">

                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {

                            const updated =
                              cartItems.map(
                                (c) =>
                                  c._id === item._id
                                    ? {
                                        ...c,
                                        quantity:
                                          e.target
                                            .value
                                      }
                                    : c
                              );

                            setCartItems(
                              updated
                            );

                          }}
                          className="w-16 border rounded text-center"
                        />

                      </td>

                      <td className="border p-4">

                        ₹
                        {item.price *
                          item.quantity}

                      </td>

                      <td className="border p-4">

                        <div className="flex gap-2 justify-center">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity
                              )
                            }
                            className="bg-teal-700 text-white px-3 py-2 rounded"
                          >

                            <FaSync />

                          </button>

                          <button
                            onClick={() =>
                              deleteItem(
                                item._id
                              )
                            }
                            className="bg-red-500 text-white px-3 py-2 rounded"
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center p-6 text-gray-500"
                    >

                      Cart is Empty

                    </td>

                  </tr>

                )
              }

            </tbody>

          </table>

          <div className="text-right text-2xl font-bold mt-6">

            Grand Total : ₹
            {grandTotal}

          </div>

          <div className="flex justify-center mt-8">

            <button
              onClick={() => navigate('/payment')}  
            className="bg-teal-700 text-white px-8 py-3 rounded-lg flex items-center gap-3">

              <FaCreditCard />

              Proceed To Payment

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}