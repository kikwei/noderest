// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

const database = {};

database.connection = () => {
  MongoClient.connect(
    "mongodb://localhost:27017/NodeJs",
    (err, client) => {
      if (err) {
        return console.log("Error connecting to mongo", err);
      }

      console.log("Connected to mongo successfully");

      const db = client.db("NodeJS");

      // Inserting
      db.collection("users").insertOne(
        {
          firstName: "William arapLagat",
          lastName: "Kikwei",
          phone: "0700436967",
          password: "com_08_15",
          tosAgreement: true
        },
        (err, result) => {
          if (err) {
            return console.log(
              `This error occured while inserting user details: ${err}`
            );
          }

          console.log(JSON.stringify(result.ops, undefined, 2));
        }
      );

      // fetching/selecting
      // specific
      // db.collection("users")
      //   .find({ _id: new ObjectID("57bb36afb3b6a3801d8c479d") })
      //   .toArray()
      //   .then(
      //     user => {
      //       console.log(JSON.stringify(user, undefined, 2));
      //     },
      //     err => {
      //       console.log(`Error while fetching user.Error: ${err}`);
      //     }
      //   );

      // count
      //       db.collection("users")
      //         .find()
      //         .count()
      //         .then(
      //           users => {
      //             console.log(`Users count: ${users}`);
      //           },
      //           err => {
      //             console.log(`Error counting users.Error: ${err}`);
      //           }
      //         );

      //       //update -> findOneAndUpdate
      // db.collection('users').findOneAndUpdate({
      //   _id = new ObjectID('57bb36afb3b6a3801d8c479d')
      // },{
      //   $set: {
      //     firstName: 'William arapLagat'
      //   },
      //   $inc: {
      //     age:2
      //   }
      // },{
      //   returnOriginal: false
      // }).then(result => {
      //   console.log(result)
      // });

      // // deleting -> findOneAndDelete
      // db.collection('users').findOneAndDelete({
      //   _id: new ObjectID('57bb36afb3b6a3801d8c479d')
      // }).then(results => {
      //   console.log(JSON.stringify(results))
      // });
      client.close();
    }
  );
};

database.init = () => {
  database.connection();
};

module.exports = database;
