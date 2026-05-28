import React, { useEffect, useState } from "react";

import {
  FaPills,
  FaSignOutAlt,
  FaShoppingCart
} from "react-icons/fa";

import {
  useNavigate,
  useParams
} from "react-router-dom";

export default function ViewMedicines() {

  const navigate = useNavigate();

  const { pharmacyName } = useParams();

  const [medicines, setMedicines] =
    useState([]);

  // ================= FETCH MEDICINES =================

  useEffect(() => {

    fetchMedicines();

  }, []);

  const fetchMedicines = async () => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/pharmacy-medicines/${pharmacyName}`
      );

      const data = await response.json();

      setMedicines(data);

    } catch (error) {

      console.log(error);

      alert("Error Fetching Medicines");

    }

  };

    const addToCart = async (medicine) => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/cart",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          medicineName:
            medicine.medicineName,

          price:
            medicine.price

        })

      }
    );

    const data =
      await response.json();

    if (response.ok) {

      alert(
        "Medicine Added Successfully"
      );

    }

  } catch (error) {

    console.log(error);

  }

};


  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">

        <h1 className="text-3xl font-bold">
          Medicines
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white text-teal-700 px-4 py-2 rounded-lg font-semibold"
        >

          <FaSignOutAlt />

          Exit

        </button>

      </nav>

      {/* ================= PAGE TITLE ================= */}

      <div className="p-10">

        <h2 className="text-4xl font-bold text-teal-700 mb-10 text-center">

          {decodeURIComponent(pharmacyName)}

        </h2>

        {/* ================= MEDICINES ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {
            medicines.map((medicine) => (

              <div
                key={medicine._id}
                className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-700"
              >

                <div className="flex flex-col items-center text-center">

                  <FaPills className="text-6xl text-teal-700 mb-4" />

                  <h3 className="text-2xl font-bold text-teal-700">

                    {medicine.medicineName}

                  </h3>

                  <p className="mt-3 text-gray-600">

                    Manufacturer:
                    {" "}
                    {medicine.manufacturer}

                  </p>

                  <p className="text-gray-600">

                    Quantity:
                    {" "}
                    {medicine.quantity}

                  </p>

                  <p className="text-gray-600">

                    Expiry:
                    {" "}
                    {medicine.expiryDate}

                  </p>

                  <p
                    className={`mt-2 font-bold ${medicine.prescription
                      ? "text-green-600"
                      : "text-red-600"
                      }`}
                  >

                    {
                      medicine.prescription
                      ? "Prescription Required"
                      : "No Prescription Required"
                    }

                  </p>

                  <p className="text-2xl font-bold text-green-600 mt-4">

                    ₹ {medicine.price}

                  </p>

                  <button
                  onClick={async () => {

                    await fetch(
                      "http://localhost:5000/api/cart",
                      {
                        method: "POST",

                        headers: {
                        "Content-Type": "application/json"},

                        body: JSON.stringify({

                          medicineName: medicine.medicineName,

                          price: medicine.price,

                          pharmacyName: medicine.pharmacyName

                        })

                      }
                    );

                    alert("Medicine Added Successfully");
                    navigate(`/cart`);

                    }}
                    className="bg-teal-700 text-white px-4 py-2 rounded-lg"
                    >
                    Add To Cart
                  </button>
                  

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );

}