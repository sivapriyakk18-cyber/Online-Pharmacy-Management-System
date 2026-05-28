import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

export default function AdminLogin({ goBack }) {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-teal-700 text-white px-8 py-4 flex justify-between items-center shadow-lg">

        <h1 className="text-3xl font-bold">
          Online Pharmacy
        </h1>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:text-gray-200"
        >

          <FaSignOutAlt />
          Exit

        </button>

      </nav>

      {/* Login Box */}
      <div className="flex items-center justify-center h-[85vh]">

        <div className="bg-white w-[320px] rounded-xl shadow-2xl p-4">

          {/* Heading */}
          <h2 className="text-4xl font-bold text-center text-teal-700 mb-8">

            Admin Login

          </h2>

          {/* Username */}
          <div className="mb-5">

            <label className="block mb-2 text-gray-700 font-medium">

              Admin Username

            </label>

            <input
              id="adminUsername"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-teal-700"
            />

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block mb-2 text-gray-700 font-medium">

              Password

            </label>

            <input
              id="adminPassword"
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-teal-700"
            />

          </div>

          {/* Login Button */}
          <button

            onClick={async () => {

              const username =
                document.getElementById('adminUsername').value;

              const password =
                document.getElementById('adminPassword').value;

              try {

                const response = await axios.post(
                  'http://localhost:5000/api/admin-login',
                  {
                    username,
                    password
                  }
                );

                if (response.data === 'Login Successful') {

                  alert('Login Successful. Welcome Admin');

                  navigate('/admin-dashboard');

                } else {

                  alert(response.data);

                }

              } catch (error) {

                console.log(error);

                alert('Server Error');

              }

            }}

            className="w-full bg-teal-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-800 transition"
          >

            Login

          </button>

        </div>

      </div>

    </div>

  );

}