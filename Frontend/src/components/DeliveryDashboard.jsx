import React,
{
  useEffect,
  useState
} from "react";

import {
  FaTruck,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaSignOutAlt,
  FaTachometerAlt
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

export default function DeliveryDashboard() {

  const navigate =
    useNavigate();

  const deliveryAgent =
    JSON.parse(
      localStorage.getItem(
        "deliveryAgent"
      )
    ) || {};

  const [stats,
    setStats] =
    useState({

      assigned: 0,
      completed: 0,
      pending: 0

    });

  // ================= FETCH DASHBOARD =================

  const fetchDashboard =
    async () => {

      try {

        const response =
          await fetch(
            `http://localhost:5000/api/delivery-dashboard/${deliveryAgent?.fullName}`
          );

        const data =
          await response.json();

        setStats(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

  if (deliveryAgent?.fullName) {

    fetchDashboard();

  }

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
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >

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
            onClick={() =>
             navigate(
              "/completed-orders"
             )
            }
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >

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

      {/* CONTENT */}

      <div className="p-10">

        <h1 className="text-5xl font-bold text-teal-700 mb-10">

          Welcome,
          {" "}
          {
            deliveryAgent?.fullName
          }

        </h1>

        <div className="grid grid-cols-3 gap-8">

          {/* ASSIGNED */}

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-teal-700">

            <div className="flex items-center gap-3 text-2xl mb-4">

              <FaClipboardList />

              Assigned Orders

            </div>

            <h1 className="text-4xl font-bold">

              {
                stats.assigned
              }

            </h1>

          </div>

          {/* COMPLETED */}

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-teal-700">

            <div className="flex items-center gap-3 text-2xl mb-4">

              <FaCheckCircle />

              Completed Orders

            </div>

            <h1 className="text-4xl font-bold">

              {
                stats.completed
              }

            </h1>

          </div>

          {/* PENDING */}

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-teal-700">

            <div className="flex items-center gap-3 text-2xl mb-4">

              <FaClock />

              Pending Orders

            </div>

            <h1 className="text-4xl font-bold">

              {
                stats.pending
              }

            </h1>

          </div>

        </div>

      </div>

    </div>

  );

}