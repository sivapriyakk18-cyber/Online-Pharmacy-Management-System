import {
  FaPills,
  FaClipboardList,
  FaCheckCircle,
  FaTruck,
  FaExclamationTriangle,
  FaTimesCircle,
  FaClock,
  FaChartBar,
  FaFilePrescription,
  FaCommentDots,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


export default function PharmacistDashboard() {

  const navigate = useNavigate();
  const location = useLocation();

  const [pharmacist, setPharmacist] = useState(JSON.parse(localStorage.getItem("pharmacist")));
  
  const pharmacyName = pharmacist?.pharmacyName || "Pharmacy Dashboard";


  const [medicines, setMedicines] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [expiredMedicines, setExpiredMedicines] = useState([]);

  useEffect(() => {

    fetch('http://localhost:5000/api/medicines')
      .then(res => res.json())
      .then(data => {

        const filteredMedicines = data.filter(
          (item) => item.pharmacyName === pharmacyName
        );

        setMedicines(filteredMedicines);

      })
      .catch(err => console.log(err));

  }, [pharmacyName]);
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => {

        const filteredOrders = data.filter(
          (item) => item.pharmacyName === pharmacyName
        );

        setPendingOrders(filteredOrders);

      })
      .catch(err => console.log(err));

  
 
  const cards = [
    {
      title: "Medicines",
      count: medicines.length,
      icon: <FaPills />
    },
    {
      title: "Pending Orders",
      count: pendingOrders.length,
      icon: <FaClipboardList />
    },
    {
      title: "Completed Orders",
      count: completedOrders.length,
      icon: <FaCheckCircle />
    },
    {
      title: "Assigned Orders",
      count: assignedOrders.length,
      icon: <FaTruck />
    },
    {
      title: "Low Stock",
      count: lowStock.length,
      icon: <FaExclamationTriangle />
    },
    {
      title: "Expired Medicines",
      count: expiredMedicines.length,
      icon: <FaTimesCircle />
    },
  ];

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-teal-700 text-white flex justify-between items-center px-8 py-4">

        <h1 className="text-2xl font-bold">
          {pharmacyName}
        </h1>

        <div className="flex gap-6 text-sm font-medium">

          <p 
            onClick={() =>
              navigate('/pharmacist-dashboard', {
                state: { pharmacyName }
              })
            }
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaChartBar />
            Dashboard
          </p>

          <p
            onClick={() => {
              localStorage.setItem("pharmacyName", pharmacyName);
              navigate('/manage-medicines', {
                state: { pharmacyName }
              });
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaPills />
            Medicines
          </p>

          <p 
          onClick={() => navigate('/manage-orders')}
          className="flex items-center gap-2">
            <FaBox />
            Orders
          </p>

          <p
          onClick={() => navigate('/manage-completed-orders')}
          className="flex items-center gap-2">
            <FaCheckCircle />
            Completed
          </p>

          <p className="flex items-center gap-2">
            <FaFilePrescription />
            Prescriptions
          </p>

          <p
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </p>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-5xl font-bold text-center mt-10 mb-12">
        Dashboard Overview
      </h2>

      {/* Cards */}
      <div className="flex flex-col items-center mt-6">

        {/* First Row */}
        <div className="flex gap-6 mb-6 flex-wrap justify-center">

          {cards.slice(0, 4).map((card, index) => (

            <div
              key={index}
              className="bg-white w-[170px] h-[90px] rounded-xl shadow-md border-l-4 border-teal-700 flex flex-col justify-center items-center"
            >

              <div className="flex items-center gap-2 font-semibold text-gray-700">
                {card.icon}
                <span>{card.title}</span>
              </div>

              <h1 className="text-3xl font-bold text-teal-700 mt-2">
                {card.count}
              </h1>

            </div>

          ))}

        </div>

        {/* Second Row */}
        <div className="flex gap-6 flex-wrap justify-center">

          {cards.slice(4, 6).map((card, index) => (

            <div
              key={index}
              className="bg-white w-[170px] h-[90px] rounded-xl shadow-md border-l-4 border-teal-700 flex flex-col justify-center items-center"
            >

              <div className="flex items-center gap-2 font-semibold text-gray-700">
                {card.icon}
                <span>{card.title}</span>
              </div>

              <h1 className="text-3xl font-bold text-teal-700 mt-2">
                {card.count}
              </h1>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}