import React from "react";
import {FaTachometerAlt,FaUserNurse,FaUsers,FaTruck,FaShoppingCart,FaCommentDots,FaChartBar,FaSignOutAlt} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import{ useEffect, useState } from "react";

export default function AdminDashboard() {

  const navigate = useNavigate();
  const [pharmacists, setPharmacists] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [deliveryAgent, setDeliveryAgent] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetch('http://localhost:5000/api/pharmacists')
      .then(res => res.json())
      .then(data => setPharmacists(data))
      .catch(err => console.log(err));

  }, []);

    fetch('http://localhost:5000/api/customers')
    .then(res => res.json())
    .then(data => setCustomers(data))
    .catch(err => console.log(err));

    fetch('http://localhost:5000/api/delivery-agent')
    .then(res => res.json())
    .then(data => setDeliveryAgent(data))
    .catch(err => console.log(err));

    fetch('http://localhost:5000/api/orders')
    .then(res => res.json())
    .then(data => setOrders(data))
    .catch(err => console.log(err));

  
  const cards = [

    {
      title: "Pharmacists",
      count: pharmacists.length,
      icon: "💊",
    },

    {
      title: "Customers",
      count: customers.length,
      icon: "👥",
    },

    {
      title: "Delivery Agents",
      count: deliveryAgent.length,
      icon: "🚚",
    },

    {
      title: "Orders",
      count: orders.length,
      icon: "🛒",
    },

  ];

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-teal-700 text-white flex justify-between items-center px-8 py-4">

        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <div className="flex gap-6 text-sm font-medium">

          <p className="flex items-center gap-2 cursor-pointer hover:text-gray-200">

            <FaTachometerAlt />
            Dashboard

          </p>

          <p
            onClick={() =>
              window.location.href='/manage-pharmacists'}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >

            <FaUserNurse />
            Pharmacists

          </p>

          <p className="flex items-center gap-2 cursor-pointer hover:text-gray-200">

            <FaUsers />
            Customers

          </p>

          <p
            onClick={() => 
              navigate('/manage-delivery-agents')
            } 
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >

            <FaTruck />
            Delivery Agents

          </p>

          <p className="flex items-center gap-2 cursor-pointer hover:text-gray-200">

            <FaShoppingCart />
            Orders

          </p>

          <p className="flex items-center gap-2 cursor-pointer hover:text-gray-200">

            <FaCommentDots />
            Feedback

          </p>

          <p className="flex items-center gap-2 cursor-pointer hover:text-gray-200">

            <FaChartBar />
            Analytics

          </p>

          <p
            onClick={() => navigate('/admin-login')}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          >

            <FaSignOutAlt />
            Logout

          </p>

        </div>

      </div>

      {/* Heading */}
      <h2 className="text-5xl font-bold text-center mt-10 mb-14">

        Dashboard Overview

      </h2>

      {/* Cards */}
      <div className="max-w-5xl mx-auto">

        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {cards.slice(0, 3).map((card, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-10 text-center border"
            >

              <div className="text-5xl mb-4">
                {card.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {card.title}
              </h3>

              <p className="text-4xl font-bold text-teal-700">
                {card.count}
              </p>

            </div>

          ))}

        </div>

        {/* Second Row */}
        <div className="flex justify-center mt-10">

          <div className="w-[300px]">

            <div className="bg-white rounded-xl shadow-md p-10 text-center border">

              <div className="text-5xl mb-4">
                {cards[3].icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {cards[3].title}
              </h3>

              <p className="text-4xl font-bold text-teal-700">
                {cards[3].count}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}