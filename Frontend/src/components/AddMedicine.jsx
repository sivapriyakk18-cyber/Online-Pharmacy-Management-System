import {
  FaPills,
  FaClipboardList,
  FaCheckCircle,
  FaCommentDots,
  FaFilePrescription,
  FaChartBar,
  FaSignOutAlt,
  FaPlusCircle,
  FaCapsules,
  FaIndustry,
  FaCalendarAlt,
  FaBoxes,
  FaRupeeSign
} from "react-icons/fa";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  useState
} from "react";

import axios from "axios";

export default function AddMedicine() {

  const navigate = useNavigate();
  const location = useLocation();

  const pharmacyName =
    location.state?.pharmacyName ||
    localStorage.getItem("pharmacyName");

  const [medicineName, setMedicineName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [prescription, setPrescription] = useState(false);

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

          <p
            onClick={() => navigate('/manage-medicines')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaPills />
            Medicines
          </p>

          <p className="flex items-center gap-2 cursor-pointer">
            <FaClipboardList />
            Orders
          </p>

          <p className="flex items-center gap-2 cursor-pointer">
            <FaCheckCircle />
            Completed
          </p>

          <p className="flex items-center gap-2 cursor-pointer">
            <FaCommentDots />
            Feedback
          </p>

          <p className="flex items-center gap-2 cursor-pointer">
            <FaFilePrescription />
            Prescriptions
          </p>

          <p className="flex items-center gap-2 cursor-pointer">
            <FaChartBar />
            Sales
          </p>

          <p className="flex items-center gap-2 cursor-pointer">
            <FaChartBar />
            Analytics
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

      <h2 className="text-5xl font-bold text-center text-teal-700 mt-6 flex items-center justify-center gap-3">
        <FaPlusCircle />
        Add New Medicine
      </h2>

      {/* Form */}
      <div className="flex justify-center mt-6">

        <div className="bg-white p-8 rounded-xl shadow-lg w-[620px]">

          {/* Medicine Name */}
          <div className="mb-6">

            <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <FaCapsules />
              Medicine Name
            </label>

            <input
              type="text"
              value={medicineName}
              onChange={(e) =>
                setMedicineName(e.target.value)
              }
              className="w-full h-14 border border-gray-300 rounded-md px-4 text-lg outline-none"
            />

          </div>

          {/* Manufacturer */}

          <div className="mb-6">

            <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <FaIndustry />
              Manufacturer
            </label>

            <input
              type="text"
              value={manufacturer}
              onChange={(e) =>
                setManufacturer(e.target.value)
              }
              className="w-full h-14 border border-gray-300 rounded-md px-4 text-lg outline-none"
            />

          </div>

          {/* Expiry */}

          <div className="mb-6">

            <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <FaCalendarAlt />
              Expiry Date
            </label>

            <input
              type="date"
              value={expiryDate}
              onChange={(e) =>
                setExpiryDate(e.target.value)
              }
              className="w-full h-14 border border-gray-300 rounded-md px-4 text-lg outline-none"
            />

          </div>

          {/* Quantity */}

          <div className="mb-6">

            <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <FaBoxes />
              Quantity
            </label>

            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="w-full h-14 border border-gray-300 rounded-md px-4 text-lg outline-none"
            />

          </div>

          {/* Price */}
          <div className="mb-6">

            <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <FaRupeeSign />
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full h-14 border border-gray-300 rounded-md px-4 text-lg outline-none"
            />

          </div>

          {/* Prescription */}
          <div className="mb-5 flex items-center gap-3">

            <input
              type="checkbox"
              checked={prescription}
              onChange={(e) =>
                setPrescription(e.target.checked)
              }
            />

            <label className="text-gray-700 font-medium">

              Prescription Required

            </label>

          </div>

          {/* Button */}
          <button

            onClick={async () => {

              const medicineData = {

                pharmacyName: pharmacyName,

                medicineName,
                manufacturer,
                expiryDate,
                quantity,
                price,
                prescription

              };

              try {

                await axios.post(
                  'http://localhost:5000/api/medicines',
                  medicineData
                );

                navigate('/manage-medicines', {
                  state: {
                    pharmacyName: pharmacyName
                  }
                });

              } catch (error) {

                console.log(error);

                alert("Error Adding Medicine");

              }

            }}

            className="w-full bg-teal-700 text-white py-4 rounded-md text-xl font-semibold hover:bg-teal-800"
          >
            Add Medicine
          </button>

        </div>

      </div>

    </div>

  );

}