import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {FaTachometerAlt,FaUserNurse,FaUsers,FaTruck,FaShoppingCart,FaCommentDots,FaChartBar,FaSignOutAlt} from "react-icons/fa";

export default function ManagePharmacists() {
  const navigate = useNavigate();
  const [pharmacists, setPharmacists] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/pharmacists")
      .then((res) => {

        setPharmacists(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);

 // APPROVE FUNCTION
const approvePharmacist = (id) => {

  axios
    .put(`http://localhost:5000/api/pharmacists/approve/${id}`)
    .then(() => {

      const updatedData = pharmacists.map((item) => {

        if (item._id === id) {

          return {
            ...item,
            status: "Approved"
          };

        }

        return item;

      });

      setPharmacists(updatedData);

    })
    .catch((err) => {

      console.log(err);

    });

};

// REJECT FUNCTION
const rejectPharmacist = (id) => {

  axios
    .put(`http://localhost:5000/api/pharmacists/reject/${id}`)
    .then(() => {

      const updatedData = pharmacists.map((item) => {

        if (item._id === id) {

          return {
            ...item,
            status: "Rejected"
          };

        }

        return item;

      });

      setPharmacists(updatedData);

    })
    .catch((err) => {

      console.log(err);

    });

};
  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-teal-700 text-white flex justify-between items-center px-8 py-4">

        <h1 className="text-2xl font-bold">
          Pharmacy Admin
        </h1>

        <div className="flex gap-6 text-sm font-medium">

         <p 
         onClick={() => navigate('/admin-dashboard')}
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
         onClick={() => navigate('/manage-feedback')}
         className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
           <FaCommentDots />
           Feedback
         </p>
         <p 
         onClick={() => navigate('/manage-analytics')}
         className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
           <FaChartBar />
           Analytics
         </p>
         <p
           onClick={() => navigate('/')}
           className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
           <FaSignOutAlt />
           Logout
                   </p>
        </div>

      </div>

      {/* Heading */}
      <h2 className="text-5xl font-bold text-center mt-10 mb-10">

        Manage Pharmacists

      </h2>

      {/* Table */}
      <div className="px-10 overflow-x-auto">

        <table className="w-full bg-white shadow-lg">

          {/* Table Heading */}
          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 border">
                ID
              </th>

              <th className="p-4 border">
                Pharmacy Name
              </th>

              <th className="p-4 border">
                Owner
              </th>

              <th className="p-4 border">
                Email
              </th>

              <th className="p-4 border">
                Phone
              </th>

              <th className="p-4 border">
                Status
              </th>

              <th className="p-4 border">
                Registered On
              </th>

              <th className="p-4 border">
                Action
              </th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {pharmacists.map((item, index) => (

              <tr
                key={index}
                className="text-center"
              >

                {/* ID */}
                <td className="p-4 border">

                  {index + 1}

                </td>

                {/* Pharmacy Name */}
                <td className="p-4 border">

                  {item.pharmacyName}

                </td>

                {/* Owner Name */}
                <td className="p-4 border">

                  {item.ownerName}

                </td>

                {/* Email */}
                <td className="p-4 border">

                  {item.email}

                </td>

                {/* Phone */}
                <td className="p-4 border">

                  {item.phone}

                </td>

                {/* Status */}
               <td
                 className={`p-4 border font-semibold ${
                 item.status === "Approved"
                 ? "text-green-600"
                 : item.status === "Rejected"
                 ? "text-red-600"
                 : "text-orange-500"
                  }`}
               >

                {item.status || "Pending"}

               </td>

                {/* Registered Date and Time */}
                <td className="p-4 border">

                  {item.registeredOn}

                </td>

                {/* Action Buttons */}
                <td className="p-4 border">

               <div className="flex justify-center gap-2">

                    <button
                      onClick={() => approvePharmacist(item._id)}
                      className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700"
                    >

                     Approve

                    </button>

                    <button
                     onClick={() => rejectPharmacist(item._id)}
                     className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >

                     Reject

                    </button>

                </div>

               </td> 

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>


  );
}