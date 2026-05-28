import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTachometerAlt,
  FaUserNurse,
  FaUsers,
  FaTruck,
  FaShoppingCart,
  FaCommentDots,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function ManageDeliveryAgent() {

  const navigate = useNavigate();

  const [agents, setAgents] = useState([]);

  // Fetch Delivery Agents
  const fetchAgents = () => {

    axios
      .get("http://localhost:5000/api/delivery-agent")
      .then((res) => {

        setAgent(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  };

  useEffect(() => {

    fetchAgent();

  }, []);

  // Approve Agent
  const approveAgent = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/delivery-agent/approve/${id}`
      );

      fetchAgent();

    } catch (error) {

      console.log(error);

    }

  };

  // Reject Agent
  const rejectAgent = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/delivery-agent/reject/${id}`
      );

      fetchAgent();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-teal-700 text-white flex justify-between items-center px-8 py-4">

        <h1 className="text-2xl font-bold">
          Pharmacy Admin
        </h1>

        <div className="flex gap-6 text-sm font-medium">

          <p
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaTachometerAlt />
            Dashboard
          </p>

          <p
            onClick={() => navigate('/manage-pharmacists')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaUserNurse />
            Pharmacists
          </p>

          <p
            onClick={() => navigate('/manage-customers')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaUsers />
            Customers
          </p>

          <p
            onClick={() => navigate('/manage-delivery-agent')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaTruck />
            Delivery Agents
          </p>

          <p
            onClick={() => navigate('/manage-orders')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaShoppingCart />
            Orders
          </p>

          <p
            onClick={() => navigate('/manage-feedback')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaCommentDots />
            Feedback
          </p>

          <p
            onClick={() => navigate('/manage-analytics')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaChartBar />
            Analytics
          </p>

          <p
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaSignOutAlt />
            Logout
          </p>

        </div>

      </div>

      {/* Heading */}
      <h2 className="text-5xl font-bold text-center mt-10 mb-10">
        Manage Delivery Agents
      </h2>

      {/* Table */}
      <div className="flex justify-center mt-5">

        <div className="overflow-x-auto w-[78%]">

          <table className="w-full border border-gray-300 bg-white shadow-md">

            {/* Table Head */}
            <thead className="bg-gray-100">

              <tr>

                <th className="border px-4 py-3">
                  ID
                </th>

                <th className="border px-4 py-3">
                  Name
                </th>

                <th className="border px-4 py-3">
                  Email
                </th>

                <th className="border px-4 py-3">
                  Phone
                </th>

                <th className="border px-4 py-3">
                  City
                </th>

                <th className="border px-4 py-3">
                  Status
                </th>

                <th className="border px-4 py-3">
                  Registered On
                </th>

                <th className="border px-4 py-3">
                  Action
                </th>

              </tr>

            </thead>

            {/* Table Body */}
            <tbody>

              {agents.map((agent, index) => (

                <tr
                  key={index}
                  className="text-center"
                >

                  <td className="border px-4 py-3">
                    {index + 1}
                  </td>

                  <td className="border px-4 py-3">
                    {agent.fullName}
                  </td>

                  <td className="border px-4 py-3">
                    {agent.email}
                  </td>

                  <td className="border px-4 py-3">
                    {agent.phone}
                  </td>

                  <td className="border px-4 py-3">
                    {agent.city}
                  </td>

               <td
                 className={`p-4 border font-semibold ${
                 agent.status === "Approved"
                 ? "text-green-600"
                 : agent.status === "Rejected"
                 ? "text-red-600"
                 : "text-orange-500"
                  }`}
               >
                       {agent.status || "Pending"}

               </td>

                  <td className="border px-4 py-3">
                    {new Date(agent.registeredOn).toLocaleString()}
                  </td>

                  <td className="border px-4 py-3">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => approveAgent(agent._id)}
                        className="bg-teal-700 hover:bg-teal-800 text-white px-3 py-1 rounded">
                        Approve
                      </button>

                      <button
                        onClick={() => rejectAgent(agent._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                        Reject
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}