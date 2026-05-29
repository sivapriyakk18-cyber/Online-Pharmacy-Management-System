import {
  FaPills,
  FaClipboardList,
  FaCheckCircle,
  FaCommentDots,
  FaFilePrescription,
  FaChartBar,
  FaSignOutAlt,
  FaPlusCircle
} from "react-icons/fa";

import { useNavigate,useLocation } from "react-router-dom";
import {useEffect, useState } from "react";
import axios from "axios";


export default function ManageMedicines() {

  const navigate = useNavigate();
  const location = useLocation();

  const pharmacyName =
     localStorage.getItem("pharmacyName");

  const medicine = location.state?.medicine;
  const [medicines,setMedicines] = useState([]);

    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/medicines");
        
        const filteredMedicines = response.data.filter(
          (medicine) =>
            medicine.pharmacyName === pharmacyName
        );

        setMedicines(filteredMedicines);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    const handleDelete = async (id) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/medicines/${id}`
    );

    fetchMedicines();

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchMedicines();

}, []);

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-teal-700 text-white flex justify-between items-center px-8 py-3">

        <h1 className="text-2xl font-bold">
          {pharmacyName}
        </h1>

        <div className="flex gap-6 text-sm font-medium">

          <p
            onClick={() => navigate('/pharmacist-dashboard')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaChartBar />
            Dashboard
          </p>

          <p className="flex items-center gap-2 cursor-pointer">
            <FaPills />
            Medicines
          </p>

          <p
            onClick={() =>
              navigate("/manage-orders")
            }
            className="flex items-center gap-2 cursor-pointer"
          >

            Orders

          </p>

          <p className="flex items-center gap-2 cursor-pointer">
            <FaCheckCircle />
            Completed
          </p>

          <p className="flex items-center gap-2 cursor-pointer">
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

      {/* Main Content */}
<div className="px-10 py-6">

  {/* Heading Center */}
  <h2 className="text-4xl font-bold text-center text-teal-700 flex items-center justify-center gap-3 mb-8">

    📦 Manage Medicines

  </h2>

  {/* Button Right */}
  <div className="flex justify-end mb-4">

    <button 
      onClick={() => {
        navigate('/add-medicine',
          {state: {pharmacyName: pharmacyName}}
        );
      }}
      className="bg-teal-700 text-white px-5 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-teal-800"
    >

      <FaPlusCircle />
      Add New Medicine

    </button>

  </div>

      {/* Table */}
<div className="w-[78%] mx-auto mt-8">

  <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">

    <thead>

      <tr className="text-gray-800 text-sm">

        <th className="py-3 border border-gray-200">ID</th>

        <th className="py-3 border border-gray-200">Name</th>

        <th className="py-3 border border-gray-200">Manufacturer</th>

        <th className="py-3 border border-gray-200">Expiry Date</th>

        <th className="py-3 border border-gray-200">Quantity</th>

        <th className="py-3 border border-gray-200">Price</th>

        <th className="py-3 border border-gray-200">Prescription</th>

        <th className="py-3 border border-gray-200">Actions</th>

      </tr>

    </thead>

    <tbody>

   {medicines.length > 0 ? (
     medicines.map((medicine, index) => ( 
       <tr key={index} className="text-center h-14">

    <td className="border border-gray-200">
      {index + 1}
    </td>

    <td className="border border-gray-200">
      {medicine.medicineName}
    </td>

    <td className="border border-gray-200">
      {medicine.manufacturer}
    </td>

    <td
  className={`border border-gray-200 font-bold ${
    new Date(medicine.expiryDate) < new Date()
      ? "text-red-600"
      : "text-green-600"
  }`}
>

  {new Date(medicine.expiryDate) < new Date()
    ? "Expired"
    : "Available"}

</td>

    <td className="border border-gray-200">
      {medicine.quantity}
    </td>

    <td className="border border-gray-200">
      ₹{medicine.price}
    </td>
  

    {/* Prescription */}
<td className="border border-gray-200 text-center">

  {medicine.prescription ? (

    <span className="text-green-600 text-xl">✔</span>

  ) : (

    <span className="text-red-500 text-xl">✖</span>

  )}

</td>

{/* Actions */}
<td className="border border-gray-200 text-center">

  <div className="flex justify-center gap-2">

    {/* Edit Button */}
    <button
      onClick={() => 
        navigate('/add-medicine',{
          state: {medicine}
        })
      }
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
    >
      ✏
    </button>

    {/* Delete Button */}
    <button
      onClick={() => handleDelete(medicine._id)}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
    >
      🗑
    </button>

  </div>

</td>

       </tr>
     ))
   ) : (
     <tr className="h-14">
       <td colSpan="8" className="text-center border border-gray-200">
         No medicines added
       </td>
     </tr>
   )}


    </tbody>

  </table>

    </div>

      </div>

    </div>

  );

}