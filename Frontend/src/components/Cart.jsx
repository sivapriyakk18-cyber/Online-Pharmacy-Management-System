import React, {
  useEffect,
  useState
} from "react";

import {
  FaShoppingCart,
  FaTrash,
  FaSync,
  FaCreditCard,
  FaSignOutAlt,
  FaBox,
  FaSearch,
  FaTachometerAlt
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

export default function Cart() {

  const navigate =
    useNavigate();

  const customer =
  JSON.parse(
    localStorage.getItem(
      "customer"
    )
  );

  console.log(customer);

  const [cartItems,
    setCartItems] =
    useState([]);

  // ================= FETCH CART =================

  const fetchCart = async () => {

  if (!customer) return;

  try {

    const response = await fetch(
      `http://localhost:5000/api/cart/${customer._id}`
    );

    if (!response.ok) {

      throw new Error("API Error");

    }

    const data = await response.json();

    setCartItems(Array.isArray(data) ? data : []);

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

};

  useEffect(() => {
    fetchCart();
  }, []);

  if (!customer) {
    return (
      <h1 className="text-center mt-10 text-3xl">
        Please Login First
      </h1>
    );
  }


  // ================= UPDATE QUANTITY =================

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

      alert(
        "Quantity Updated"
      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= DELETE =================

  const deleteItem = async (
    id
  ) => {

    try {

      await fetch(
        `http://localhost:5000/api/cart/${id}`,
        {
          method: "DELETE"
        }
      );

      alert(
        "Medicine Removed"
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
        item.price *
          item.quantity,
      0
    );

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">

        <h1 className="text-3xl font-bold">

          Online Pharmacy

        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">

          <p
            onClick={() =>
              navigate(
                "/customer-dashboard"
              )
            }
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaTachometerAlt />

            Dashboard

          </p>

          <p
            onClick={() =>
              navigate(
                "/browse-medicines"
              )
            }
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaSearch />

            Browse Medicines

          </p>

          <p className="flex items-center gap-2 cursor-pointer">

            <FaShoppingCart />

            Cart

          </p>

          <p
            onClick={() =>
              navigate(
                "/order-history"
              )
            }
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaBox />

            My Orders

          </p>

          <div className="flex items-center gap-4">

            <p 
             onClick={() => navigate('/customer-login')}
             className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
               <FaSignOutAlt />
               Logout
            </p>

          </div>

        </div>

      </nav>

      {/* ================= CART ================= */}

      <div className="p-10">

        <div className="bg-white rounded-2xl shadow-xl p-8">

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
                cartItems.length ===
                  0 && (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center p-6 text-gray-500"
                    >

                      No Medicines Added

                    </td>

                  </tr>

                )
              }

              {
                cartItems.map(
                  (item) => (

                    <tr
                      key={item._id}
                    >

                      {/* MEDICINE */}

                      <td className="border p-4">

                        <b>

                          {
                            item.medicineName
                          }

                        </b>

                      </td>

                      {/* QUANTITY */}

                      <td className="border p-4">

                        <input
                          type="number"
                          min="1"
                          value={
                            item.quantity
                          }
                          onChange={(
                            e
                          ) => {

                            const updated =
                              cartItems.map(
                                (
                                  c
                                ) =>
                                  c._id ===
                                  item._id
                                    ? {
                                        ...c,

                                        quantity:
                                          e
                                            .target
                                            .value
                                      }
                                    : c
                              );

                            setCartItems(
                              updated
                            );

                          }}
                          className="w-16 border rounded text-center py-1"
                        />

                      </td>

                      {/* PRICE */}

                      <td className="border p-4">

                        ₹
                        {item.price *
                          item.quantity}

                      </td>

                      {/* ACTIONS */}

                      <td className="border p-4">

                        <div className="flex gap-2 justify-center">

                          {/* UPDATE */}

                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity
                              )
                            }
                            className="bg-teal-700 hover:bg-teal-800 text-white px-3 py-2 rounded"
                          >

                            <FaSync />

                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              deleteItem(
                                item._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

          {/* TOTAL */}

          <div className="text-right mt-6 text-3xl font-bold">

            Grand Total : ₹
            {grandTotal}

          </div>

          {/* PAYMENT */}

          <div className="flex justify-center mt-8">

            <button
              onClick={() => {

  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );

  navigate("/payment",{
    state:{
      cartItems,
      grandTotal
    }
  });

}}
              className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 rounded-lg text-lg flex items-center gap-3"
            >

              <FaCreditCard />

              Proceed to Payment

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}