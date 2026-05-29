import React,
{
  useEffect,
  useState
} from "react";

import {
  FaTruck,
  FaCheckCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaClipboardList
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

export default function AssignedOrders() {

  const navigate =
    useNavigate();

  const deliveryAgent =
    JSON.parse(
      localStorage.getItem(
        "deliveryAgent"
      )
    ) || {};

  const [orders,
    setOrders] =
    useState([]);

  // ================= FETCH ORDERS =================

  const fetchOrders =
    async () => {

      try {

        const response =
          await fetch(
            `http://localhost:5000/api/assigned-orders/${deliveryAgent.fullName}`
          );

        const data =
          await response.json();

        setOrders(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    if (
      deliveryAgent?.fullName
    ) {

      fetchOrders();

    }

  }, []);

  // ================= MARK DELIVERED =================

  const markDelivered =
    async (id) => {

      try {

        await fetch(
          `http://localhost:5000/api/orders/delivered/${id}`,
          {
            method: "PUT"
          }
        );

        alert(
          "Order Delivered"
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

    const completeOrder = async (id) => {

  await fetch(
    `http://localhost:5000/api/orders/complete/${id}`,
    {
      method: "PUT"
    }
  );

};

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center">
      
              <h1 className="text-2xl font-bold flex items-center gap-2">
      
                <FaTruck />
      
                Delivery Dashboard
      
              </h1>
      
              <div className="flex items-center gap-2">
      
                <p 
                onClick={() => navigate('/delivery-dashboard')}
                className="flex items-center gap-2 cursor-pointer hover:text-gray-200">

                  <FaTachometerAlt />
      
                  Overview
      
                </p>
      
                <p
                  onClick={() =>
                   navigate(
                    "/assigned-orders"
                   )
                  }
                  className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
                  >

                    <FaClipboardList />
                    Assigned Orders
                  </p>
      
                <p 
                onClick={() => navigate("/completed-orders")}
                className="flex items-center gap-2 cursor-pointer hover:text-gray-200">

                  <FaCheckCircle />
      
                  Completed Orders
      
                </p>
      
                <button
                  onClick={() => {
      
                    localStorage.removeItem(
                      "deliveryAgent"
                    );
      
                    navigate(
                      "/delivery-login"
                    );
      
                  }}
                  className="flex items-center gap-2"
                >
      
                  <FaSignOutAlt />
      
                  Logout
      
                </button>
      
              </div>
      
            </nav>

      {/* PAGE */}

      <div className="p-10">

        <h1 className="text-5xl font-bold text-teal-700 flex items-center gap-3 mb-10">

          <FaTruck />

          Assigned Orders

        </h1>

        <table className="w-full bg-white shadow-lg">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">
                #Order ID
              </th>

              <th className="border p-3">
                Customer
              </th>

              <th className="border p-3">
                Customer Address
              </th>

              <th className="border p-3">
                Pharmacy
              </th>

              <th className="border p-3">
                Pharmacy Address
              </th>

              <th className="border p-3">
                Total Amount
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
              orders.map(
                (
                  order,
                  index
                ) => (

                  <tr key={order._id}>

                    <td className="border p-3">

                      {index + 1}

                    </td>

                    <td className="border p-3">

                      {
                        order.customerName
                      }

                    </td>

                    <td className="border p-3">

                      {
                        order.customerAddress
                      }

                    </td>

                    <td className="border p-3">

                      {
                        order.pharmacyName
                      }

                    </td>

                    <td className="border p-3">

                      {
                        order.pharmacyAddress
                      }

                    </td>

                    <td className="border p-3">

                      ₹
                      {
                        order.totalAmount
                      }

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
                          markDelivered(
                            order._id
                          )
                        }
                        className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded flex items-center gap-2"
                      >

                        <FaCheckCircle />

                        Mark Delivered

                      </button>

                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}