// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")(
  "sk_test_51KagdESHn3ay7iVGo90P1R6rUiXn5qEIHosyKTrIRyQiKEUZHI918vKjUQSNivuEIyDTXPCgdHpGdgUBOZdf2DxG00SJoGZlR8"
);

//API

//App Config
const app = express();
//Middlewares
app.use(cors({ origin: true })); //security
app.use(express.json()); //send data in json format

//API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request Recieved for amount>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //in subunits of currency
    currency: "inr",
});
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen command
exports.api = functions.https.onRequest(app)

//endpoint of api
//http://localhost:5001/clone-8774e/us-central1/api
