import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PharmacistRegister from './PharmacistRegister';
import {
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus
} from "react-icons/fa";

export default function PharmacistLogin({ goBack }) {

  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  if (showRegister) {

    return (
      <PharmacistRegister
        goBack={() => setShowRegister(false)}
      />
    );

  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-teal-700 text-white px-8 py-4 flex justify-between items-center shadow-lg">

        <h1 className="text-3xl font-bold">
          Online Pharmacy
        </h1>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-lg font-semibold cursor-pointer hover:text-gray-200"
        >

          <FaSignOutAlt />
          Exit

        </button>

      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center h-[85vh]">

        <div className="bg-white w-[400px] rounded-xl shadow-2xl p-10 border-t-4 border-teal-700">

          {/* Heading */}
          <h2 className="text-4xl font-bold text-center mb-8 text-teal-700 flex items-center justify-center gap-3">

            <span>💊</span>

            <span>Pharmacist Login</span>

          </h2>

          {/* Email */}
          <div className="mb-5">

            <label className="block mb-2 text-gray-700 font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
            />

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block mb-2 text-gray-700 font-medium">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
            />

          </div>

          {/* Login Button */}
          <button

            onClick={async () => {

              const email =
                document.getElementById('email').value;

              const password =
                document.getElementById('password').value;

              try {

                const res = await fetch(
                  'http://localhost:5000/api/pharmacist-login',
                  {
                    method: 'POST',

                    headers: {
                      'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                      email,
                      password
                    })
                  }
                );

                const data = await res.json();

                if (data.message === 'Login Successful') {

                  alert('Login successful.');

                  navigate('/pharmacist-dashboard', {
                    state: {
                      pharmacyName: data.pharmacyName
                    }
                  });

                } else {

                  alert(data.message);

                }

              } catch (error) {

                alert('Server Error');

              }

            }}

            className="w-full bg-teal-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-800 transition flex items-center justify-center gap-2"
          >

            <FaSignInAlt />
            Login

          </button>

          {/* Register */}
          <p className="text-center mt-6 text-gray-600">

            Not registered yet?

            <span
              onClick={() => setShowRegister(true)}
              className="text-teal-700 font-bold cursor-pointer ml-2 inline-flex items-center gap-1 hover:underline"
            >

              <FaUserPlus />
              Register here

            </span>

          </p>

        </div>

      </div>

    </div>

  );

}