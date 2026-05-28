const mongoose = require('mongoose');

async function fixDB() {

  try {

    await mongoose.connect(
     "mongodb://test:test@ac-h3ocbh7-shard-00-00.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-01.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-02.siyg6sp.mongodb.net:27017/OnlinePharmacySystem?ssl=true&replicaSet=atlas-30ifzf-shard-0&authSource=admin&appName=Cluster0")

    const orderSchema = new mongoose.Schema({

      customerId: String,

      customerName: String,

      pharmacyName: String,

      medicines: Array,

      totalAmount: Number,

      paymentMethod: String,

      status: String,

      orderDate: Date

    });

    const Order = mongoose.model(
      "Order",
      orderSchema
    );

    // UPDATE ORDERS WITHOUT PHARMACY NAME

    const result = await Order.updateMany(

      {

        $or: [

          { pharmacyName: { $exists: false } },

          { pharmacyName: null }

        ]

      },

      {

        $set: {

          pharmacyName: "Aaron's Medicals"

        }

      }

    );

    console.log(

      "Updated Orders : ",
      result

    );

    process.exit(0);

  } catch (error) {

    console.log(error);

    process.exit(1);

  }

}

fixDB();