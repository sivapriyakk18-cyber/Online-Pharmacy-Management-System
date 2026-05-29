import React,
{
  useEffect,
  useState
} from "react";

import {
  FaUsers,
  FaTrash,
  FaTachometerAlt,
  FaUserNurse,
  FaTruck,
  FaShoppingCart,
  FaSignOutAlt
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

export default function ManageCustomers() {

  const navigate =
    useNavigate();

  const [customers,
    setCustomers] =
    useState([]);

  // ================= FETCH CUSTOMERS =================

  const fetchCustomers =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/customers"
          );

        const data =
          await response.json();

        setCustomers(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchCustomers();

  }, []);

  // ================= DELETE CUSTOMER =================

  const deleteCustomer =
    async (id) => {

      try {

        await fetch(
          `http://localhost:5000/api/customers/${id}`,
          {
            method: "DELETE"
          }
        );

        alert(
          "Customer Deleted"
        );

        fetchCustomers();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center px-8 py-4">

        <h1 className="text-2xl font-bold">

          Pharmacy Admin

        </h1>

        <div className="flex gap-6 text-sm font-medium">

          <p
          onClick={() => 
            navigate('/admin-dashboard')
          }
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
          <FaTachometerAlt />
          Dashboard
          </p>

          <p
          onClick={() => navigate('/manage-pharmacists')}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
          <FaUserNurse />
          Pharmacists
          </p>

          <p
          onClick={() => navigate('/manage-customers')}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
          <FaUsers />
          Customers
          </p>

          <p
          onClick={() => navigate('/manage-delivery-agents')}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
          <FaTruck />
          Delivery Agents
          </p>

          <p
          onClick={() => navigate('/manage-orders')}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
          <FaShoppingCart />
          Orders
          </p>

          <p
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
          <FaSignOutAlt />
          Logout
          </p>

        </div>

      </nav>

      {/* PAGE */}

      <div className="p-10">

        <h1 className="text-4xl font-bold text-teal-700 text-center mb-10">

          Manage Customers

        </h1>

        <div className="overflow-x-auto">

          <table className="w-full bg-white shadow-lg">

            <thead className="bg-gray-100">

              <tr>

                <th className="border p-3">
                  ID
                </th>

                <th className="border p-3">
                  Name
                </th>

                <th className="border p-3">
                  Email
                </th>

                <th className="border p-3">
                  Phone
                </th>

                <th className="border p-3">
                  City
                </th>

                <th className="border p-3">
                  Address
                </th>

                <th className="border p-3">
                  Status
                </th>

                <th className="border p-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {
                customers.map(
                  (customer, index) => (

                    <tr key={customer._id}>

                      <td className="border p-3">

                        {index + 1}

                      </td>

                      <td className="border p-3">

                        {customer.fullName}

                      </td>

                      <td className="border p-3">

                        {customer.email}

                      </td>

                      <td className="border p-3">

                        {customer.phone}

                      </td>

                      <td className="border p-3">

                        {customer.city}

                      </td>

                      <td className="border p-3">

                        {customer.address}

                      </td>

                      <td className="border p-3 text-green-700 font-bold">

                        Active

                      </td>

                      <td className="border p-3">

                        <button
                          onClick={() =>
                            deleteCustomer(
                              customer._id
                            )
                          }
                          className="bg-red-600 text-white px-3 py-2 rounded"
                        >

                          <FaTrash />

                        </button>

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}