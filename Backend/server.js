// ================= IMPORTS =================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECTION =================

mongoose
  .connect("mongodb://test:test@ac-h3ocbh7-shard-00-00.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-01.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-02.siyg6sp.mongodb.net:27017/OnlinePharmacySystem?ssl=true&replicaSet=atlas-30ifzf-shard-0&authSource=admin&appName=Cluster0")
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch((err) => {
    console.log(err)
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
  'Medicine',
  medicineSchema
);

// ================= ADMIN LOGIN SCHEMA =================

const adminLoginSchema = new mongoose.Schema({

  username: String,

  password: String

});

const AdminLogin = mongoose.model(
  'AdminLogin',
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
    default: 'Pending'
  },

  registeredOn: String

});

const Pharmacist = mongoose.model(
  'Pharmacistlogins',
  pharmacistSchema
);

// ================= CUSTOMER SCHEMA =================

const customerSchema = new mongoose.Schema({

  fullName: String,

  email: String,

  phone: String,

  city: String,

  address: String,

  password: String

});

const Customer = mongoose.model(
  'Customers',
  customerSchema
);

// ================= ADMIN LOGIN API =================

app.post('/api/admin-login', async (req, res) => {

  const { username, password } = req.body;

  try {

    const newLogin = new AdminLogin({
      username,
      password
    });

    await newLogin.save();

    if (
      username === 'admin' &&
      password === 'admin123'
    ) {

      res.send('Login Successful');

    } else {

      res.send('Invalid Username or Password');

    }

  } catch (error) {

    console.log(error);

    res.send('Server Error');

  }

});

// ================= MEDICINE APIs =================

// GET ALL MEDICINES
app.get('/api/medicines', async (req, res) => {

  try {

    const medicines = await Medicine.find();

    res.json(medicines);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// ADD MEDICINE
app.post('/api/medicines', async (req, res) => {

  try {

    const medicine = new Medicine(req.body);

    await medicine.save();

    res.send('Medicine Added Successfully');

  } catch (error) {

    console.log(error);

    res.status(500).send('Error Adding Medicine');

  }

});

// UPDATE MEDICINE
app.put('/api/medicines/:id', async (req, res) => {

  try {

    await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.send('Medicine Updated Successfully');

  } catch (error) {

    console.log(error);

    res.status(500).send('Error Updating Medicine');

  }

});

// DELETE MEDICINE
app.delete('/api/medicines/:id', async (req, res) => {

  try {

    await Medicine.findByIdAndDelete(
      req.params.id
    );

    res.send('Medicine Deleted Successfully');

  } catch (error) {

    console.log(error);

    res.status(500).send('Error Deleting Medicine');

  }

});

// ================= PHARMACIST APIs =================

// GET ALL PHARMACISTS
app.get('/api/pharmacists', async (req, res) => {

  try {

    const pharmacists = await Pharmacist.find();

    res.json(pharmacists);

  } catch (error) {

    console.log(error);

    res.send('Error Fetching Pharmacists');

  }

});

// ADD PHARMACIST
app.post('/api/pharmacists', async (req, res) => {

  try {

    const pharmacist = new Pharmacist(req.body);

    await pharmacist.save();

    res.send('Pharmacist Added Successfully');

  } catch (error) {

    console.log(error);

    res.send('Error Adding Pharmacist');

  }

});

// ================= PHARMACIST LOGIN =================

app.post(
  '/api/pharmacist-login',
  async (req, res) => {

    try {

      console.log(req.body);

      const {
        email,
        password
      } = req.body;

      // CHECK EMPTY

      if (!email || !password) {

        return res.status(400).json({

          message:
            'Email and Password Required'

        });

      }

      const pharmacist =
        await Pharmacist.findOne({

          email,
          password

        });

      console.log(pharmacist);

      // INVALID LOGIN

      if (!pharmacist) {

        return res.status(400).json({

          message:
            'Invalid Email or Password'

        });

      }

      // NOT APPROVED

      if (
        pharmacist.status !==
        'Approved'
      ) {

        return res.status(400).json({

          message:
            'Account Not Approved Yet'

        });

      }

      // SUCCESS

      res.status(200).json({

        message:
          'Login Successful',

        pharmacist: {

          _id:
            pharmacist._id,

          pharmacyName:
            pharmacist.pharmacyName,

          email:
            pharmacist.email

        }

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          'Server Error'

      });

    }

  }
);

// APPROVE PHARMACIST
app.put('/api/pharmacists/approve/:id', async (req, res) => {

  try {

    await Pharmacist.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Approved'
      }
    );

    res.send('Approved');

  } catch (error) {

    console.log(error);

    res.send('Error');

  }

});

// REJECT PHARMACIST
app.put('/api/pharmacists/reject/:id', async (req, res) => {

  try {

    await Pharmacist.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Rejected'
      }
    );

    res.send('Rejected');

  } catch (error) {

    console.log(error);

    res.send('Error');

  }

});

// ================= CUSTOMER APIs =================

// REGISTER CUSTOMER
app.post('/api/customers/register', async (req, res) => {

  try {

    const existingCustomer =
      await Customer.findOne({
        email: req.body.email
      });

    if (existingCustomer) {

      return res.status(400).json({
        message: 'Email Already Exists'
      });

    }

    const customer = new Customer(req.body);

    await customer.save();

    res.status(201).json({
      message: 'Customer Registered Successfully'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// CUSTOMER LOGIN
app.post('/api/customers/login', async (req, res) => {

  const { email, password } = req.body;

  try {

    const customer = await Customer.findOne({
      email,
      password
    });

    if (!customer) {

      return res.status(400).json({
        message: 'Invalid Email or Password'
      });

    }

    res.status(200).json({
      message: 'Login Successful',
      customer
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// GET CUSTOMERS
app.get('/api/customers', async (req, res) => {

  try {

    const customers = await Customer.find();

    res.json(customers);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// DELETE CUSTOMER
app.delete('/api/customers/:id', async (req, res) => {

  try {

    await Customer.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Customer Deleted Successfully'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// ================= DELIVERY AGENT APIs =================

const deliveryAgentSchema = new mongoose.Schema({

  fullName: String,

  email: String,

  phone: String,

  city: String,

  password: String,

  activeOrders: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    default: 'Pending'
  },

  registeredOn: {
    type: Date,
    default: Date.now
  }

});

const DeliveryAgent = mongoose.model(
  'DeliveryAgents',
  deliveryAgentSchema
);

// REGISTER DELIVERY AGENT
app.post('/api/delivery-agents', async (req, res) => {

  try {

    const newAgent =
      new DeliveryAgent(req.body);

    const savedAgent =
      await newAgent.save();

    res.status(201).json(savedAgent);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// GET DELIVERY AGENTS
app.get('/api/delivery-agents', async (req, res) => {

  try {

    const agents =
      await DeliveryAgent.find();

    res.json(agents);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// APPROVE DELIVERY AGENT
app.put(
  '/api/delivery-agents/approve/:id',
  async (req, res) => {

    try {

      const updatedAgent =
        await DeliveryAgent.findByIdAndUpdate(
          req.params.id,
          {
            status: 'Approved'
          },
          {
            new: true
          }
        );

      res.json(updatedAgent);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: 'Server Error'
      });

    }

  }
);

// REJECT DELIVERY AGENT
app.put(
  '/api/delivery-agents/reject/:id',
  async (req, res) => {

    try {

      const updatedAgent =
        await DeliveryAgent.findByIdAndUpdate(
          req.params.id,
          {
            status: 'Rejected'
          },
          {
            new: true
          }
        );

      res.json(updatedAgent);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: 'Server Error'
      });

    }

  }
);

// DELIVERY LOGIN
app.post('/api/delivery/login', async (req, res) => {

  const { email, password } = req.body;

  try {

    const delivery =
      await DeliveryAgent.findOne({
        email,
        password
      });

    if (!delivery) {

      return res.status(400).json({
        message: 'Invalid Email or Password'
      });

    }

    if (delivery.status !== 'Approved') {

      return res.status(400).json({
        message: 'Account Not Approved Yet'
      });

    }

    res.json({
      message: 'Login Successful',
      delivery
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// ================= SEARCH PHARMACIES =================

// SEARCH PHARMACY BY CITY
app.get(
  '/api/search-pharmacies/:city',
  async (req, res) => {

    try {

      const city =
        req.params.city;

      const pharmacies =
        await Pharmacist.find({

          city: {
            $regex: city,
            $options: 'i'
          },

          status: 'Approved'

        });

      res.json(pharmacies);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: 'Server Error'
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

// ================= CART MODEL =================

const cartSchema = new mongoose.Schema({

  customerId: String,

  medicineName: String,

  pharmacyName: String,

  price: Number,

  quantity: Number

});

const Cart = mongoose.model("Cart", cartSchema);


// ================= GET CART =================

app.get("/api/cart/:customerId", async (req, res) => {

  try {

    const cartItems = await Cart.find({

      customerId: req.params.customerId

    });

    res.json(cartItems);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error"

    });

  }

});


// ================= UPDATE CART =================

app.put("/api/cart/:id", async (req, res) => {

  try {

    await Cart.findByIdAndUpdate(

      req.params.id,

      {

        quantity: req.body.quantity

      }

    );

    res.json({

      message: "Quantity Updated"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error"

    });

  }

});


// ================= DELETE CART =================

app.delete("/api/cart/:id", async (req, res) => {

  try {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({

      message: "Medicine Removed"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error"

    });

  }

});

// ================= ADD TO CART =================

app.post(
  "/api/add-to-cart",
  async (req, res) => {

    try {

      const {
        customerId,
        medicineName,
        pharmacyName,
        price,
        quantity
      } = req.body;

      // CHECK IF ALREADY EXISTS

      const existingItem =
        await Cart.findOne({

          customerId,
          medicineName,
          pharmacyName

        });

      // UPDATE QUANTITY

      if (existingItem) {

        existingItem.quantity += quantity;

        await existingItem.save();

        return res.json({

          message:
            "Cart Updated Successfully"

        });

      }

      // NEW ITEM

      const cartItem =
        new Cart({

          customerId,
          medicineName,
          pharmacyName,
          price,
          quantity

        });

      await cartItem.save();

      res.json({

        message:
          "Medicine Added To Cart"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"

      });

    }

  }
);

const orderSchema =
  new mongoose.Schema({

    customerId: String,

    customerName: String,

    customerAddress: String,

    pharmacyName: String,

    pharmacyAddress: String,

    medicines: Array,

    totalAmount: Number,

    paymentMethod: String,

    assignedAgent: String,

    deliveredDate: String,

    status: {
      type: String,
      default: "Pending"
    },

    orderDate: {
      type: Date,
      default: Date.now
    }

  });

const Order =
  mongoose.model(
    "Order",
    orderSchema
  );

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

app.put(
  "/api/orders/approve/:id",
  async (req, res) => {

    try {

      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status:
            "Approved"
        }
      );

      res.json({

        message:
          "Approved"

      });

    } catch (error) {

      console.log(error);

    }

  }
);

app.put(
  "/api/orders/reject/:id",
  async (req, res) => {

    try {

      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status:
            "Rejected"
        }
      );

      res.json({

        message:
          "Rejected"

      });

    } catch (error) {

      console.log(error);

    }

  }
);

app.get(
  "/api/pharmacy-orders/:pharmacyName",
  async (req, res) => {
    try {
      const orders = await Order.find({
        pharmacyName: req.params.pharmacyName
      });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

app.post(
  "/api/place-order",
  async (req, res) => {

    try {

      const pharmacist = await Pharmacist.findOne({ pharmacyName: req.body.pharmacyName });
      if (pharmacist) {
        req.body.pharmacyAddress = pharmacist.address || pharmacist.city;
      }

      const order =
        new Order(req.body);

      await order.save();

      await Cart.deleteMany({
        customerId: req.body.customerId
      });

      res.json({

        message:
          "Order Confirmed Successfully"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"

      });

    }

  }
);

// ================= ASSIGN DELIVERY AGENT =================

app.put(
  "/api/orders/assign-agent/:id",
  async (req, res) => {

    try {

      await Order.findByIdAndUpdate(
        req.params.id,
        {
          assignedAgent:
            req.body.agentName,

          status:
            "Assigned"
        }
      );

      res.json({
        message:
          "Agent Assigned"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error"
      });

    }

  }
);

// ================= DELIVERY DASHBOARD =================

app.get(
  "/api/delivery-dashboard/:agentName",
  async (req, res) => {

    try {

      const assignedOrders =
        await Order.find({

          assignedAgent:
            req.params.agentName

        });

      const completedOrders =
        await Order.find({

          assignedAgent:
            req.params.agentName,

          status:
            "Delivered"

        });

      const pendingOrders =
        await Order.find({

          assignedAgent:
            req.params.agentName,

          status:
            "Delivered"

        });

      res.json({

        assigned:
          assignedOrders.length,

        completed:
          completedOrders.length,

        pending:
          pendingOrders.length

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"

      });

    }

  }
);

app.get(
  "/api/assigned-orders/:agentName",
  async (req, res) => {

    try {

      const orders =
        await Order.find({

          assignedAgent:
            req.params.agentName

        });

      res.json(orders);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"

      });

    }

  }
);

app.put(
  "/api/orders/delivered/:id",
  async (req, res) => {

    try {

      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status:
            "Delivered"
        }
      );

      res.json({

        message:
          "Delivered"

      });

    } catch (error) {

      console.log(error);

    }

  }
);

// ================= GET ALL ORDERS =================

app.get(
  "/api/orders",
  async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// ================= COMPLETED ORDERS =================

app.get(
  "/api/completed-orders/:agentName",
  async (req, res) => {

    try {

      const orders =
        await Order.find({

          assignedAgent:
            req.params.agentName,

          status:
            "Delivered"

        });

      console.log(orders);

      res.json(orders);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"

      });

    }

  }
);

app.put(
  "/api/orders/complete/:id",
  async (req, res) => {

    try {

      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: "Completed"
        }
      );

      res.json({
        message:
          "Order Completed"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error"
      });

    }

  }
);

// ================= MARK DELIVERED =================

app.put(
  "/api/orders/delivered/:id",
  async (req, res) => {

    try {

      await Order.findByIdAndUpdate(
        req.params.id,
        {

          status:
            "Delivered",

          deliveredDate:
            new Date()

        }
      );

      res.json({

        message:
          "Order Delivered"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"

      });

    }

  }
);

// ================= GET CUSTOMERS =================

app.get(
  "/api/customers",
  async (req, res) => {

    try {

      const customers =
        await Customer.find();

      res.json(customers);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

// ================= DELETE CUSTOMER =================

app.delete(
  "/api/customers/:id",
  async (req, res) => {

    try {

      await Customer.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Customer Deleted"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error"
      });

    }

  }
);

// ================= SERVER START =================

// A simple root route to verify the backend is alive.
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Online Pharmacy Backend is running smoothly!",
  });
});

app.listen(5000, () => {

  console.log('Server running on port 5000');

});