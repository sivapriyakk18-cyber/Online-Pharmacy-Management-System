import React,
{
  useEffect,
  useState
} from "react";

import {
  FaTruck,
  FaHome,
  FaCapsules,
  FaBox,
  FaCheck,
  FaComment,
  FaPrescriptionBottle,
  FaChartBar,
  FaChartLine,
  FaSignOutAlt
} from "react-icons/fa";

import {
  useNavigate,
  useParams
} from "react-router-dom";

export default function AssignAgent() {

  const navigate =
    useNavigate();

  const { orderId } =
    useParams();

  const pharmacist = JSON.parse(localStorage.getItem("pharmacist"));

  const [agents,
    setAgents] =
    useState([]);

  const [selectedAgent,
    setSelectedAgent] =
    useState("");

  // ================= FETCH DELIVERY AGENTS =================

  const fetchAgents =
  async () => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/delivery-agents"
        );

      const data =
        await response.json();

      console.log(data);

      const approvedAgents =
        data.filter(
          (agent) =>
            agent.status ===
            "Approved"
        );

      setAgents(
        approvedAgents
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchAgents();

  }, []);

  // ================= ASSIGN =================

  const assignAgent =
    async () => {

      if (!selectedAgent) {

        alert(
          "Select Delivery Agent"
        );

        return;

      }

      try {

        await fetch(
  `http://localhost:5000/api/orders/assign-agent/${orderId}`,
  {
    method: "PUT",

    headers: {
      "Content-Type":
        "application/json"
    },

    body: JSON.stringify({

      agentName:
        selectedAgent

    })

  }
);

        alert(
          "Agent Assigned Successfully"
        );

        navigate(
          "/manage-orders"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center">
      
              <h1 className="text-2xl font-bold">
      
                {pharmacist?.pharmacyName}
      
              </h1>
      
              <div className="flex items-center gap-5 text-sm font-medium">
      
                <p
                  onClick={() =>
                    navigate(
                      "/pharmacist-dashboard"
                    )
                  }
                  className="flex items-center gap-1 cursor-pointer"
                >
      
                  <FaHome />
      
                  Dashboard
      
                </p>
      
                <p
                  onClick={() =>
                    navigate(
                      "/add-medicine"
                    )
                  }
                  className="flex items-center gap-1 cursor-pointer"
                >
      
                  <FaCapsules />
      
                  Medicines
      
                </p>
      
                <p className="flex items-center gap-1 cursor-pointer">
      
                  <FaBox />
      
                  Orders
      
                </p>
      
                <p className="flex items-center gap-1 cursor-pointer">
      
                  <FaCheck />
      
                  Completed
      
                </p>
      
                <p className="flex items-center gap-1 cursor-pointer">
      
                  <FaComment />
      
                  Feedback
      
                </p>
      
                <p className="flex items-center gap-1 cursor-pointer">
      
                  <FaPrescriptionBottle />
      
                  Prescriptions
      
                </p>
      
                <p className="flex items-center gap-1 cursor-pointer">
      
                  <FaChartBar />
      
                  Sales
      
                </p>
      
                <p className="flex items-center gap-1 cursor-pointer">
      
                  <FaChartLine />
      
                  Analytics
      
                </p>
      
                <button
                  onClick={() => {
      
                    localStorage.removeItem(
                      "pharmacist"
                    );
      
                    navigate(
                      "/pharmacist-login"
                    );
      
                  }}
                  className="flex items-center gap-1"
                >
      
                  <FaSignOutAlt />
      
                  Logout
      
                </button>
      
              </div>
      
            </nav>

      {/* PAGE */}

      <div className="flex justify-center mt-16">

        <div className="bg-white shadow-xl rounded-xl p-10 w-[500px]">

          <h1 className="text-4xl font-bold text-teal-700 flex items-center gap-3 mb-8 justify-center">

            <FaTruck />

            Assign Delivery Agent

          </h1>

          <label className="font-semibold">

            Select Delivery Agent

          </label>

          <select
  value={selectedAgent}
  onChange={(e) =>
    setSelectedAgent(e.target.value)
  }
  className="w-full border p-3 rounded mt-3"
>

  <option value="">
    -- Select Agent --
  </option>

  {
    agents.length > 0 ? (

      agents.map((agent) => (

        <option
          key={agent._id}
          value={agent.fullName}
        >

          {agent.fullName}
          {" "}
          (
          {agent.city}
          )
          {" "}
          - Active Orders:
          {" "}
          {agent.activeOrders || 0}

        </option>

      ))

    ) : (

      <option disabled>
        No Agents Found
      </option>

    )
  }

</select>

          <button
            onClick={assignAgent}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-lg mt-6 text-lg font-bold"
          >

            Assign Agent

          </button>

        </div>

      </div>

    </div>

  );

}