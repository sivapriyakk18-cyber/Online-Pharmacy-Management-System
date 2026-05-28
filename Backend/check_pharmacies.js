const mongoose = require('mongoose');

async function checkDB() {

  try {

    await mongoose.connect(
      "mongodb://test:test@ac-h3ocbh7-shard-00-00.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-01.siyg6sp.mongodb.net:27017,ac-h3ocbh7-shard-00-02.siyg6sp.mongodb.net:27017/OnlinePharmacySystem?ssl=true&replicaSet=atlas-30ifzf-shard-0&authSource=admin&appName=Cluster0"
    );

    const pharmacistSchema = new mongoose.Schema({

      pharmacyName: String

    });

    const Pharmacist = mongoose.model(
      "Pharmacistlogins",
      pharmacistSchema
    );

    const pharmacies =
      await Pharmacist.find(
        {},
        "pharmacyName"
      );

    console.log(pharmacies);

    process.exit(0);

  } catch (error) {

    console.log(error);

    process.exit(1);

  }

}

checkDB();