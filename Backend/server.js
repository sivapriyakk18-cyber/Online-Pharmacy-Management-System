// ================= IMPORTS =================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECTION =================

mongoose
  .connect(
    "mongodb://test:test@ac-h3ocbh7-shard-00-00.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-01.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-02.siyg6sp.mongodb.net:27017/OnlinePharmacySystem?ssl=true&replicaSet=atlas-30ifzf-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ================= MEDICINE SCHEMA =================

const medicineSchema = new mongoose.Schema({
  pharmacyName: String,
  medicineName: String,
  manufacturer: String,
  expiryDate: String,
  quantity: Number,
  price: Number,
  prescription: Boolean
});

const Medicine = mongoose.model(
  "Medicine",
  medicineSchema
);

// ================= ADMIN LOGIN SCHEMA =================

const adminLoginSchema = new mongoose.Schema({
  username: String,
  password: String
});

const AdminLogin = mongoose.model(
  "AdminLogin",
  adminLoginSchema
);

// ================= PHARMACIST SCHEMA =================

const pharmacistSchema = new mongoose.Schema({
  pharmacyName: String,
  ownerName: String,
  email: String,
  phone: String,
  city: String,
  address: String,
  password: String,

  status: {
    type: String,
    default: "Pending"
  },

  registeredOn: String
});

const Pharmacist = mongoose.model(
  "Pharmacistlogins",
  pharmacistSchema
);

// ================= CUSTOMER SCHEMA =================

const customerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  city: String,
  password: String
});

const Customer = mongoose.model(
  "Customers",
  customerSchema
);

// ================= DELIVERY AGENT SCHEMA =================

const deliveryAgentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  city: String,
  password: String,

  status: {
    type: String,
    default: "Pending"
  },

  registeredOn: {
    type: Date,
    default: Date.now
  }
});

const DeliveryAgent = mongoose.model(
  "DeliveryAgent",
  deliveryAgentSchema
);

// ================= CART SCHEMA =================

const cartSchema = new mongoose.Schema({
  medicineName: String,
  price: Number,
  quantity: Number,
  pharmacyName: String
});

const Cart = mongoose.model(
  "Cart",
  cartSchema
);

// ================= ORDER SCHEMA =================

const orderSchema = new mongoose.Schema({
  customerId: String,
  customerName: String,
  pharmacyName: String,
  medicines: Array,
  totalAmount: Number,
  paymentMethod: String,

  orderStatus: {
    type: String,
    default: "Pending"
  },

  orderedOn: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model(
  "Order",
  orderSchema
);

// ================= ADMIN LOGIN API =================

app.post("/api/admin-login", async (req, res) => {

  const { username, password } = req.body;

  try {

    const newLogin = new AdminLogin({
      username,
      password
    });

    await newLogin.save();

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      res.send("Login Successful");

    } else {

      res.send("Invalid Username or Password");

    }

  } catch (error) {

    console.log(error);

    res.send("Server Error");

  }

});

// ================= MEDICINE APIs =================

// GET ALL MEDICINES
app.get("/api/medicines", async (req, res) => {

  try {

    const medicines =
      await Medicine.find();

    res.json(medicines);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

// ADD MEDICINE
app.post("/api/medicines", async (req, res) => {

  try {

    const medicine =
      new Medicine(req.body);

    await medicine.save();

    res.send(
      "Medicine Added Successfully"
    );

  } catch (error) {

    console.log(error);

    res.status(500).send(
      "Error Adding Medicine"
    );

  }

});

// UPDATE MEDICINE
app.put("/api/medicines/:id", async (req, res) => {

  try {

    await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.send(
      "Medicine Updated Successfully"
    );

  } catch (error) {

    console.log(error);

    res.status(500).send(
      "Error Updating Medicine"
    );

  }

});

// DELETE MEDICINE
app.delete("/api/medicines/:id", async (req, res) => {

  try {

    await Medicine.findByIdAndDelete(
      req.params.id
    );

    res.send(
      "Medicine Deleted Successfully"
    );

  } catch (error) {

    console.log(error);

    res.status(500).send(
      "Error Deleting Medicine"
    );

  }

});

// ================= PHARMACIST APIs =================

// GET ALL PHARMACISTS
app.get("/api/pharmacists", async (req, res) => {

  try {

    const pharmacists =
      await Pharmacist.find();

    res.json(pharmacists);

  } catch (error) {

    console.log(error);

    res.send(
      "Error Fetching Pharmacists"
    );

  }

});

// ADD PHARMACIST
app.post("/api/pharmacists", async (req, res) => {

  try {

    const pharmacist =
      new Pharmacist(req.body);

    await pharmacist.save();

    res.send(
      "Pharmacist Added Successfully"
    );

  } catch (error) {

    console.log(error);

    res.send(
      "Error Adding Pharmacist"
    );

  }

});

// PHARMACIST LOGIN
app.post("/api/pharmacist-login", async (req, res) => {

  const { email, password } =
    req.body;

  try {

    const pharmacist =
      await Pharmacist.findOne({
        email,
        password
      });

    if (!pharmacist) {

      return res.json({
        message:
          "Invalid Email or Password"
      });

    }

    if (
      pharmacist.status !== "Approved"
    ) {

      return res.json({
        message:
          "Account Not Approved"
      });

    }

    res.json({
      message: "Login Successful",
      pharmacyName:
        pharmacist.pharmacyName
    });

  } catch (error) {

    console.log(error);

    res.send("Server Error");

  }

});

// APPROVE PHARMACIST
app.put(
  "/api/pharmacists/approve/:id",
  async (req, res) => {

    try {

      await Pharmacist.findByIdAndUpdate(
        req.params.id,
        {
          status: "Approved"
        }
      );

      res.send("Approved");

    } catch (error) {

      console.log(error);

      res.send("Error");

    }

  }
);

// REJECT PHARMACIST
app.put(
  "/api/pharmacists/reject/:id",
  async (req, res) => {

    try {

      await Pharmacist.findByIdAndUpdate(
        req.params.id,
        {
          status: "Rejected"
        }
      );

      res.send("Rejected");

    } catch (error) {

      console.log(error);

      res.send("Error");

    }

  }
);

// ================= CUSTOMER APIs =================

// REGISTER CUSTOMER
app.post(
  "/api/customers/register",
  async (req, res) => {

    try {

      const existingCustomer =
        await Customer.findOne({
          email: req.body.email
        });

      if (existingCustomer) {

        return res.status(400).json({
          message:
            "Email Already Exists"
        });

      }

      const customer =
        new Customer(req.body);

      await customer.save();

      res.status(201).json({
        message:
          "Customer Registered Successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

// CUSTOMER LOGIN
app.post(
  "/api/customers/login",
  async (req, res) => {

    const { email, password } =
      req.body;

    try {

      const customer =
        await Customer.findOne({
          email,
          password
        });

      if (!customer) {

        return res.status(400).json({
          message:
            "Invalid Email or Password"
        });

      }

      res.status(200).json({
        message: "Login Successful",
        customer
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

// ================= DELIVERY LOGIN =================

app.post(
  "/api/delivery/login",
  async (req, res) => {

    const { email, password } =
      req.body;

    try {

      const delivery =
        await DeliveryAgent.findOne({
          email,
          password
        });

      if (!delivery) {

        return res.status(400).json({
          message:
            "Invalid Email or Password"
        });

      }

      if (
        delivery.status !== "Approved"
      ) {

        return res.status(400).json({
          message:
            "Account Not Approved Yet"
        });

      }

      res.json({
        message: "Login Successful",
        delivery
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

// ================= SEARCH PHARMACY =================

app.get(
  "/api/search-pharmacies/:city",
  async (req, res) => {

    try {

      const pharmacies =
        await Pharmacist.find({

          city: {
            $regex: req.params.city,
            $options: "i"
          },

          status: "Approved"

        });

      res.json(pharmacies);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

// ================= GET MEDICINES BY PHARMACY =================

app.get(
  "/api/pharmacy-medicines/:pharmacyName",
  async (req, res) => {

    try {

      const medicines =
        await Medicine.find({
          pharmacyName:
            req.params.pharmacyName
        });

      res.json(medicines);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

// ================= CART APIs =================

app.post("/api/cart", async (req, res) => {

  try {

    const {
      medicineName,
      price,
      pharmacyName
    } = req.body;

    const existingItem =
      await Cart.findOne({
        medicineName
      });

    if (existingItem) {

      existingItem.quantity += 1;

      await existingItem.save();

      return res.json({
        message:
          "Quantity Updated"
      });

    }

    const newCart = new Cart({
      medicineName,
      price,
      pharmacyName,
      quantity: 1
    });

    await newCart.save();

    res.json({
      message:
        "Medicine Added To Cart"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

app.get("/api/cart", async (req, res) => {

  try {

    const cartItems =
      await Cart.find();

    res.json(cartItems);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

app.put("/api/cart/:id", async (req, res) => {

  try {

    await Cart.findByIdAndUpdate(
      req.params.id,
      {
        quantity:
          req.body.quantity
      }
    );

    res.json({
      message:
        "Quantity Updated"
    });

  } catch (error) {

    console.log(error);

  }

});

app.delete(
  "/api/cart/:id",
  async (req, res) => {

    try {

      await Cart.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Deleted"
      });

    } catch (error) {

      console.log(error);

    }

  }
);

// ================= PLACE ORDER =================

app.post(
  "/api/place-order",
  async (req, res) => {

    try {

      const newOrder = new Order({

        customerId:
          req.body.customerId,

        customerName:
          req.body.customerName,

        pharmacyName:
          req.body.pharmacyName,

        medicines:
          req.body.medicines,

        totalAmount:
          req.body.totalAmount,

        paymentMethod:
          req.body.paymentMethod

      });

      await newOrder.save();

      res.json({
        message:
          "Order Placed Successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

// ================= GET ALL ORDERS =================

app.get("/api/orders", async (req, res) => {

  try {

    const orders =
      await Order.find();

    res.json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

// ================= GET CUSTOMER ORDERS =================

app.get(
  "/api/orders/:customerId",
  async (req, res) => {

    try {

      const orders =
        await Order.find({
          customerId:
            req.params.customerId
        });

      res.json(orders);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

// ================= PHARMACY DASHBOARD OVERVIEW =================

app.get(
  "/api/pharmacy-overview/:pharmacyName",
  async (req, res) => {

    try {

      const pharmacyName =
        req.params.pharmacyName;

      const totalMedicines =
        await Medicine.countDocuments({
          pharmacyName
        });

      const totalOrders =
        await Order.countDocuments({
          pharmacyName
        });

      const pendingOrders =
        await Order.countDocuments({
          pharmacyName,
          orderStatus: "Pending"
        });

      const orders =
        await Order.find({
          pharmacyName
        });

      let totalSales = 0;

      orders.forEach((order) => {

        totalSales +=
          order.totalAmount || 0;

      });

      res.json({

        totalMedicines,

        totalOrders,

        pendingOrders,

        totalSales

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

// ================= SERVER START =================

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});