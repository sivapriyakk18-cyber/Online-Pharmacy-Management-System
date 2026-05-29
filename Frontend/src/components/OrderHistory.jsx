import React, {
  useEffect,
  useState
} from "react";

import {
  FaBagShopping,
  FaEye
} from "react-icons/fa6";

import {
  FaShoppingCart,
  FaSignOutAlt,
  FaBox,
  FaSearch,
  FaTachometerAlt
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

export default function OrderHistory() {

  const navigate =
    useNavigate();

  const customer =
    JSON.parse(
      localStorage.getItem(
        "customer"
      )
    );

  const [orders, setOrders] =
    useState([]);

  const [selectedOrder,
    setSelectedOrder] =
    useState(null);

  // ================= FETCH ORDERS =================

  const fetchOrders = async () => {

    if (!customer) return;

    try {

      const response = await fetch(
        `http://localhost:5000/api/orders/${customer._id}`
      );

      const data =
        await response.json();

      setOrders(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  if (!customer) {
    return (
      <h1 className="text-center mt-10 text-3xl">
        Please Login First
      </h1>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">

        <h1 className="text-3xl font-bold">

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
            className="flex items-center gap-2 cursor-pointer"
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
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaSearch />

            Browse Medicines

          </p>

          {/* CART */}

          <p
            onClick={() =>
              navigate("/cart")
            }
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaShoppingCart />

            Cart

          </p>

          {/* ORDERS */}

          <p className="flex items-center gap-2 cursor-pointer">

            <FaBox />

            My Orders

          </p>

          {/* CUSTOMER */}

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

      {/* ================= ORDER HISTORY ================= */}

      <div className="flex justify-center mt-10">

        <div className="bg-white w-[80%] rounded-2xl shadow-xl p-8 border-l-4 border-teal-700">

          <h1 className="text-4xl font-bold text-teal-700 flex items-center gap-3 mb-8">

            <FaBagShopping />

            Order History

          </h1>

          <table className="w-full border">

            <thead className="bg-gray-100">

              <tr>

                <th className="border p-3">
                  Order ID
                </th>

                <th className="border p-3">
                  Pharmacy
                </th>

                <th className="border p-3">
                  Total Amount
                </th>

                <th className="border p-3">
                  Status
                </th>

                <th className="border p-3">
                  Payment Mode
                </th>

                <th className="border p-3">
                  Order Date
                </th>

                <th className="border p-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {
                orders.length === 0 && (

                  <tr>

                    <td
                      colSpan="7"
                      className="border p-4 text-center text-gray-500"
                    >

                      No Orders Found

                    </td>

                  </tr>

                )
              }

              {
                orders.map(
                  (order, index) => (

                    <tr key={order._id}>

                      <td className="border p-3">

                        {index + 1}

                      </td>

                      <td className="border p-3">
                        {order.pharmacyName || order.pharmacy || "N/A"}
                      </td>

                      <td className="border p-3 font-bold text-green-700">

                        ₹
                        {
                          order.medicines?.reduce(
                            (total, item) =>
                            total +
                            item.price *
                            item.quantity,
                            0
                          )
                        }

                      </td>

                      <td className="border p-3">

                        {order.status}

                      </td>

                      <td className="border p-3">

                        {order.paymentMethod}

                      </td>

                      <td className="border p-3">

                        {
                          new Date(
                            order.orderDate
                          ).toLocaleString()
                        }

                      </td>

                      <td className="border p-3">

                        <button
                          onClick={() =>
                            setSelectedOrder(order)
                          }
                          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                          <FaEye />
                          View Orders

                        </button>

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

          {
  selectedOrder && (

    <div className="mt-10 border rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-6 text-teal-700">

        Products in Order #
        {
          orders.findIndex(
            (o) =>
              o._id ===
              selectedOrder._id
          ) + 1
        }

      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3">
              Medicine
            </th>

            <th className="border p-3">
              Quantity
            </th>

            <th className="border p-3">
              Price
            </th>

            <th className="border p-3">
              Subtotal
            </th>

          </tr>

        </thead>

        <tbody>

          {
            selectedOrder.medicines?.map(
              (item, index) => (

                <tr key={index}>

                  <td className="border p-3">

                    {
                      item.medicineName
                    }

                  </td>

                  <td className="border p-3">

                    {
                      item.quantity
                    }

                  </td>

                  <td className="border p-3">

                    ₹
                    {
                      item.price
                    }

                  </td>

                  <td className="border p-3">

                    ₹
                    {
                      item.price *
                      item.quantity
                    }

                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

      <div className="mt-6 text-xl font-bold text-right text-green-700">

        Order Total :
        ₹
        {
          selectedOrder.totalAmount
        }

      </div>

    </div>

  )
}

        </div>

      </div>

    </div>

  );

}