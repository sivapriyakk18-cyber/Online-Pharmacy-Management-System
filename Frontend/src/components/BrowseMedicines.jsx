import React, { useState } from "react";

import {
  FaSearch,
  FaSignOutAlt,
  FaShoppingCart,
  FaBox,
  FaTachometerAlt,
  FaClinicMedical,
  FaPhone,
  FaMapMarkerAlt,
  FaEye
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function BrowseMedicines() {

  const navigate = useNavigate();

  const [city, setCity] = useState("");

  const [pharmacies, setPharmacies] =
    useState([]);

  const customer =
    JSON.parse(localStorage.getItem("customer"));

  // ================= SEARCH =================

  const handleSearch = async () => {

    if (!city) {

      alert("Enter City Name");

      return;

    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/search-pharmacies/${city}`
      );

      const data = await response.json();

      setPharmacies(data);

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">

        <h1 className="text-3xl font-bold">
          Online Pharmacy
        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">

          <p
            onClick={() => navigate("/customer-dashboard")}
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaTachometerAlt />

            Dashboard

          </p>

          <p className="flex items-center gap-2 cursor-pointer">

            <FaSearch />

            Browse Medicines

          </p>

          <p
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaShoppingCart />

            Cart

          </p>

          <p
            onClick={() => navigate("/order-history")}
            className="flex items-center gap-2 cursor-pointer"
          >

            <FaBox />

            My Orders

          </p>

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

      {/* ================= SEARCH BOX ================= */}

      <div className="flex justify-center mt-14">

        <div className="bg-white w-[80%] rounded-xl shadow-lg p-10">

          <h2 className="text-4xl font-bold text-teal-700 flex items-center gap-3 mb-8">

            <FaSearch />

            Search Pharmacies by City

          </h2>

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Enter city name"
              className="flex-1 border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-teal-700"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
            />

            <button
              onClick={handleSearch}
              className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-3 rounded-md font-semibold"
            >

              <span className="flex items-center gap-2">

                <FaSearch />

                Search

              </span>

            </button>

          </div>

          {/* ================= RESULTS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

            {
              pharmacies.map((pharmacy) => (

                <div
                  key={pharmacy._id}
                  className="bg-gray-50 border-l-4 border-teal-700 rounded-xl shadow-md p-6"
                >

                  {/* Pharmacy Name */}

                  <h2 className="text-2xl font-bold text-teal-700 flex items-center gap-2 mb-4">

                    <FaClinicMedical />

                    {pharmacy.pharmacyName}

                  </h2>

                  {/* Owner */}

                  <p className="mb-2 text-gray-700">

                    <span className="font-bold">
                      Owner:
                    </span>{" "}

                    {pharmacy.ownerName}

                  </p>

                  {/* Phone */}

                  <p className="mb-2 text-gray-700 flex items-center gap-2">

                    <FaPhone />

                    {pharmacy.phone}

                  </p>

                  {/* Address */}

                  <p className="mb-5 text-gray-700 flex items-center gap-2">

                    <FaMapMarkerAlt />

                    {pharmacy.address}

                  </p>

                  {/* Button */}

                  <button
                   onClick={() =>
                       navigate(
                         `/view-medicines/${encodeURIComponent(
                           pharmacy.pharmacyName
                         )}`
                       )
                     }
                     className="bg-teal-700 text-white px-5 py-2 rounded-lg"
                     >
                      👁 View Medicines
                    </button>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );

}