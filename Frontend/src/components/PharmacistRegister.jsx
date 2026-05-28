import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

export default function PharmacistRegister({ goBack }) {

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-teal-700 text-white px-8 py-4 flex justify-between items-center shadow-lg">

        <h1 className="text-3xl font-bold">
          Online Pharmacy
        </h1>

        <button 
          onClick={goBack}
          className="flex items-center gap-2 hover:text-gray-200">
          <FaSignOutAlt />
          Exit
        </button>

      </nav>

      {/* Registration Form */}
      <div className="flex items-center justify-center py-10">

        <div className="bg-white w-[500px] rounded-xl shadow-2xl p-10">

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-6 flex items-center justify-center gap-3">
            <span>💊</span>
            <span>Pharmacist Registration</span>
          </h2>

          {/* Pharmacy Name */}
          <div className="mb-4">

            <label className="block mb-2 font-medium text-gray-700">
              Pharmacy Name
            </label>

            <input
              id="pharmacyName"
              type="text"
              placeholder="Enter Pharmacy Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
            />

          </div>

          {/* Owner Name */}
          <div className="mb-4">

            <label className="block mb-2 font-medium text-gray-700">
              Owner Name
            </label>

            <input
              id="ownerName"
              type="text"
              placeholder="Enter Owner Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
            />

          </div>

          {/* Email */}
          <div className="mb-4">

            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
            />

          </div>

          {/* Phone */}
          <div className="mb-4">

            <label className="block mb-2 font-medium text-gray-700">
              Phone
            </label>

            <input
              id="phone"
              type="text"
              placeholder="Enter Phone Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
            />

          </div>

          {/* City */}
          <div className="mb-4">

            <label className="block mb-2 font-medium text-gray-700">
              City
            </label>

            <input
              id="city"
              type="text"
              placeholder="Enter City"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
            />

          </div>

          {/* Address */}
          <div className="mb-4">

            <label className="block mb-2 font-medium text-gray-700">
              Address
            </label>

            <textarea
              id="address"
              placeholder="Enter Address"
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
            ></textarea>

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
            />

          </div>

          {/* Submit Button */}
          <button

            onClick={() => {

              const pharmacyName =
                document.getElementById('pharmacyName').value;

              const ownerName =
                document.getElementById('ownerName').value;

              const email =
                document.getElementById('email').value;

              const phone =
                document.getElementById('phone').value;

              const city =
                document.getElementById('city').value;

              const address =
                document.getElementById('address').value;

              const password =
                document.getElementById('password').value;

              axios.post(
                'http://localhost:5000/api/pharmacists',
                {
                  pharmacyName,
                  ownerName,
                  email,
                  phone,
                  city,
                  address,
                  password,
                  status: "Pending",
                  registeredOn: new Date().toLocaleString()
                }
              )

              .then(() => {

                alert('Registration Successful');

              })

              .catch(() => {

                alert('Error');

              });

            }}

            className="w-full bg-teal-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-800 transition"
          >
            Submit
          </button>

        </div>

      </div>

    </div>
  );
}