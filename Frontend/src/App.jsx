
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// File: src/App.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import PharmacistLogin from './components/PharmacistLogin';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ManagePharmacists from './components/ManagePharmacists';
import PharmacistDashboard from './components/PharmacistDashboard';
import ManageMedicines from './components/ManageMedicines';
import AddMedicine from './components/AddMedicine';
import DeliveryLogin from './components/DeliveryLogin';
import DeliveryRegister from './components/DeliveryRegister';
import CustomerLogin from './components/CustomerLogin';
import CustomerRegister from './components/CustomerRegister';
import ManageDeliveryAgent from './components/ManageDeliveryAgent';
import CustomerDashboard from './components/CustomerDashboard';
import BrowseMedicines from './components/BrowseMedicines';
import ViewMedicines from './components/ViewMedicines';
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import OrderHistory from './components/OrderHistory';
import ManageOrders from './components/ManageOrder';
import AssignAgent from './components/AssignAgent';
import DeliveryDashboard from './components/DeliveryDashboard';
import AssignedOrders from './components/AssignedOrders';
import CompletedOrders from "./components/CompletedOrders";
import ManageCustomers from "./components/ManageCustomers";
import {FaHome,FaInfoCircle,FaStar,FaUser} from "react-icons/fa";
import { Routes, Route } from 'react-router-dom';

export default function App() 
{
  const [showPharmacistLogin, setShowPharmacistLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  const features = [
    {
      title: 'Online Orders',
      desc: 'Customers can order medicines online with real-time availability.',
      icon: '💊',
    },
    {
      title: 'Inventory Management',
      desc: 'Manage stock, pricing, and expiry dates easily.',
      icon: '📦',
    },
    {
      title: 'Fast Delivery',
      desc: 'Quick and secure delivery system.',
      icon: '🚚',
    },
    {
      title: 'Secure Login',
      desc: 'Separate login for Admin and Customers.',
      icon: '🔒',
    },
  ];

  return (
      <Routes>
      <Route
        path="/"
        element={
          <div className="font-sans bg-gray-100 min-h-screen">
            
      {/* Navbar */}
      <nav className="bg-teal-700 text-white px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-lg">
        <h1 className="text-xl font-bold">💊 Online Pharmacy System</h1>

        <ul className="flex gap-6 font-medium">
          <li 
           onClick={() => document.getElementById("Home").scrollIntoView({behavior: "smooth"})}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200">Home <FaHome /></li>
          <li
           onClick={() => document.getElementById("About").scrollIntoView({behavior: "smooth"})}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200">About <FaInfoCircle /></li>
          <li
          onClick={() => document.getElementById("Features").scrollIntoView({behavior: "smooth"})}
           className="flex items-center gap-2 cursor-pointer hover:text-gray-200">Features <FaStar /></li>
          <li
          onClick={() => document.getElementById("Login Portal").scrollIntoView({behavior: "smooth"})}
           className="flex items-center gap-2 cursor-pointer hover:text-gray-200">Login<FaUser /></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section
      id="Home"
        className="h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative text-center text-white px-6">
          <h2 className="text-5xl font-bold mb-6">
            Online Pharmacy Management System
          </h2>

          <p className="text-lg mb-8">
            Order Medicines Online | Manage Inventory | Secure Delivery
          </p>

          <button 
          onClick={() => document.getElementById("Login Portal").scrollIntoView({behavior: "smooth"})}
          className="bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* About Section */}
      <section 
      id="About"
      className="bg-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg leading-8">
            Our Online Pharmacy Management System streamlines medicine ordering,
            inventory management, and secure delivery services.
          </p>
        </div>
      </section>

      {/* Features */}
      <section 
      id="Features"
      className="bg-cyan-50 py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-teal-700 mb-14">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-teal-600 text-center hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>

              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>

              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Login Portal */}
<section
 id="Login Portal"
 className="bg-white py-20 px-6">

  <div className="max-w-6xl mx-auto text-center">

    <h2 className="text-5xl font-bold text-teal-700 mb-16">
      Login Portal
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      <button 
      onClick={() => window.location.href='/admin-login'}
      className="bg-teal-700 text-white py-4 rounded-xl text-lg font-semibold hover:bg-teal-800 transition shadow-lg">
        Admin Login
      </button>

      <button onClick={() => window.location.href='/pharmacist-login'}
       className="bg-teal-700 text-white py-4 rounded-xl text-lg font-semibold hover:bg-teal-800 transition shadow-lg">
        Pharmacist Login
      </button>

      <button  onClick={() => window.location.href='/customer-login'}
       className="bg-teal-700 text-white py-4 rounded-xl text-lg font-semibold hover:bg-teal-800 transition shadow-lg">
        Customer Login
      </button>

      <button onClick={() => window.location.href='/delivery-login'
      }className="bg-teal-700 text-white py-4 rounded-xl text-lg font-semibold hover:bg-teal-800 transition shadow-lg">
        Delivery Login
      </button>

    </div>

  </div>

</section>

      {/* Footer */}
      <footer className="bg-teal-700 text-white py-5 text-center">
        © 2026 Online Pharmacy Management System
      </footer>
      </div>
        }
      />

      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      <Route
        path="/pharmacist-login"
        element={<PharmacistLogin />}
      />
      <Route
        path="/manage-pharmacists"
        element={<ManagePharmacists />}
      />
      <Route
        path="/pharmacist-dashboard"
        element={<PharmacistDashboard />}
      />
      <Route
        path="/manage-medicines"
        element={<ManageMedicines />}
      />
       <Route
        path="/add-medicine"
        element={<AddMedicine />}
      />
      <Route
        path="/delivery-login"
        element={<DeliveryLogin />}
      />
      <Route
        path="/delivery-register"
        element={<DeliveryRegister />}
      />
      <Route
        path="/customer-login"
        element={<CustomerLogin />}
      />
      <Route
        path="/customer-register"
        element={<CustomerRegister />}
      />
      <Route
        path="/manage-delivery-agents"
        element={<ManageDeliveryAgent />}
      />
      <Route
        path="/customer-dashboard"
        element={<CustomerDashboard />}
      />
      <Route
        path="/browse-medicines"
        element={<BrowseMedicines />}
      />
      <Route
        path="/view-medicines/:pharmacyName"
        element={<ViewMedicines />}
      />
      <Route
        path="/cart"
        element={<Cart />}
      />
      <Route
        path="/payment"
        element={<Payment />}
      />
      <Route
        path="/order-history"
        element={<OrderHistory />}
      />
      <Route
        path="/manage-orders"
        element={<ManageOrders />}
      />
       <Route
        path="/assign-agent/:orderId"
        element={<AssignAgent />}
      />
       <Route
        path="/delivery-dashboard"
        element={<DeliveryDashboard />}
      />
      <Route
        path="/assigned-orders"
        element={<AssignedOrders />}
      />
      <Route
        path="/completed-orders"
        element={<CompletedOrders />}
      />
      <Route
        path="/manage-customers"
        element={<ManageCustomers />}
      />
      </Routes>
    );
}