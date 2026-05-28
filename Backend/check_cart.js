const mongoose = require('mongoose');

async function checkCart() {

  try {

    await mongoose.connect(
      "mongodb://test:test@ac-h3ocbh7-shard-00-00.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-01.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-02.siyg6sp.mongodb.net:27017/OnlinePharmacySystem?ssl=true&replicaSet=atlas-30ifzf-shard-0&authSource=admin&appName=Cluster0")

    const cartSchema =
      new mongoose.Schema(
        {},
        {
          strict: false
        }
      );

    const Cart = mongoose.model(
      "Cart",
      cartSchema
    );

    const cartItems =
      await Cart.find({});

    console.log(
      "Cart Items:",
      JSON.stringify(
        cartItems,
        null,
        2
      )
    );

    process.exit(0);

  } catch (error) {

    console.log(error);

    process.exit(1);

  }

}

checkCart();