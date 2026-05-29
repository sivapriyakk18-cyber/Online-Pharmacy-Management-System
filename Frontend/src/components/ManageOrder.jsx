import React,
{
  useEffect,
  useState
} from "react";

import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaHome,
  FaCapsules,
  FaBox,
  FaCheck,
  FaComment,
  FaPrescriptionBottle,
  FaChartBar,
  FaChartLine,
  FaSignOutAlt
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

export default function ManageOrders() {

  const navigate =
    useNavigate();

  const pharmacist =
    JSON.parse(
      localStorage.getItem(
        "pharmacist"
      )
    );

    if (!pharmacist) {

  return (
    <h1 className="text-center mt-10 text-3xl">
      Please Login First
    </h1>
  );

}

  const [orders,
    setOrders] =
    useState([]);

  // ================= FETCH ORDERS =================

  const fetchOrders =
    async () => {

      try {

        const response =
          await fetch(
            `http://localhost:5000/api/pharmacy-orders/${pharmacist.pharmacyName}`
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

  // ================= APPROVE =================

  const approveOrder =
    async (id) => {

      try {

        await fetch(
          `http://localhost:5000/api/orders/approve/${id}`,
          {
            method: "PUT"
          }
        );

        alert(
          "Order Approved"
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  // ================= REJECT =================

  const rejectOrder =
    async (id) => {

      try {

        await fetch(
          `http://localhost:5000/api/orders/reject/${id}`,
          {
            method: "PUT"
          }
        );

        alert(
          "Order Rejected"
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">

          {pharmacist?.pharmacyName}

        </h1>

        <div className="flex items-center gap-5 text-sm font-medium">

          <p
            onClick={() =>
              navigate(
                "/pharmacist-dashboard"
              )
            }
            className="flex items-center gap-1 cursor-pointer"
          >

            <FaHome />

            Dashboard

          </p>

          <p
            onClick={() =>
              navigate(
                "/add-medicine"
              )
            }
            className="flex items-center gap-1 cursor-pointer"
          >

            <FaCapsules />

            Medicines

          </p>

          <p className="flex items-center gap-1 cursor-pointer">

            <FaBox />

            Orders

          </p>

          <p className="flex items-center gap-1 cursor-pointer">

            <FaCheck />

            Completed

          </p>

          <p className="flex items-center gap-1 cursor-pointer">

            <FaPrescriptionBottle />

            Prescriptions

          </p>

          <button
            onClick={() => {

              localStorage.removeItem(
                "pharmacist"
              );

              navigate(
                "/pharmacist-login"
              );

            }}
            className="flex items-center gap-1"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </nav>

      {/* ================= PAGE ================= */}

      <div className="flex justify-center mt-8">

        <div className="w-[90%]">

          <h1 className="text-5xl font-bold text-teal-700 flex justify-center items-center gap-3 mb-8">

            <FaClipboardList />

            Manage Orders

          </h1>

          <table className="w-full border bg-white">

            <thead className="bg-gray-100">

              <tr>

                <th className="border p-3">
                  Order ID
                </th>

                <th className="border p-3">
                  Customer
                </th>

                <th className="border p-3">
                  Products
                </th>

                <th className="border p-3">
                  Total Amount
                </th>

                <th className="border p-3">
                  Status
                </th>

                <th className="border p-3">
                  Payment
                </th>

                <th className="border p-3">
                  Assigned Agent
                </th>

                <th className="border p-3">
                  Actions
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
                          order.medicines?.map(
                            (
                              item,
                              i
                            ) => (

                              <p key={i}>

                                {
                                  item.medicineName
                                }

                                {" "}
                                (x
                                {
                                  item.quantity
                                }
                                )

                              </p>

                            )
                          )
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
                          order.status
                        }

                      </td>

                      <td className="border p-3">

                        {
                          order.paymentMethod
                        }

                      </td>

                      <td className="border p-3">

                        {
                          order.assignedAgent || "-"
                        }

                      </td>

                      <td className="border p-3">

                        {
                          order.status === "Pending" ? (

                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                approveOrder(order._id)
                              }
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            >

                              Approve

                            </button>

                            <button
                              onClick={() =>
                                rejectOrder(order._id)
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >

                              Reject

                            </button>

                          </div>

                        ) : order.status === "Approved" ? (

                            <button
                              onClick={() =>
                                navigate(
                                  `/assign-agent/${order._id}`
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            >

                              Assign Agent

                            </button>

                          ) : (

                          <span className="text-green-700 font-bold">

                            -

                          </span>

                        )
                      }

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}