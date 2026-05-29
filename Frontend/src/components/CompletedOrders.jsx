import React,
{
  useEffect,
  useState
} from "react";

import {
  FaCheckCircle,
  FaTruck,
  FaSignOutAlt,
  FaTachometerAlt,
  FaClipboardList
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

export default function CompletedOrders() {

  const navigate =
    useNavigate();

  const deliveryAgent =
    JSON.parse(
      localStorage.getItem(
        "deliveryAgent"
      )
    );

  const [orders,
    setOrders] =
    useState([]);

  // ================= FETCH COMPLETED ORDERS =================

  const fetchOrders =
    async () => {

      try {

        const response =
          await fetch(
            `http://localhost:5000/api/completed-orders/${deliveryAgent.fullName}`
          );

        const data =
          await response.json();

        setOrders(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchOrders();

  }, []);

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
      <div className="p-10">

      <h1 className="text-5xl font-bold text-teal-700 flex items-center gap-3 mb-10">

        <FaCheckCircle />

        Completed Orders

      </h1>

      <table className="w-full bg-white shadow-lg">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3">
              Customer
            </th>

            <th className="border p-3">
              Pharmacy
            </th>

            <th className="border p-3">
              Address
            </th>

            <th className="border p-3">
              Amount
            </th>

            <th className="border p-3">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {
            orders.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="border p-5 text-center"
                >

                  No Completed Orders

                </td>

              </tr>

            ) : (

              orders.map(
                (order) => (

                  <tr key={order._id}>

                    <td className="border p-3">

                      {
                        order.customerName
                      }

                    </td>

                    <td className="border p-3">

                      {
                        order.pharmacyName
                      }

                    </td>

                    <td className="border p-3">

                      {
                        order.customerAddress
                      }

                    </td>

                    <td className="border p-3">

                      ₹
                      {
                        order.totalAmount
                      }

                    </td>

                    <td className="border p-3 text-green-700 font-bold">

                      {
                        order.status
                      }

                    </td>

                  </tr>

                )
              )

            )
          }

        </tbody>

      </table>

      </div>

    </div>

  );

}