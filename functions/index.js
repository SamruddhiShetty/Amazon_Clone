//here we will build the express app and host it on firebase
const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors");

const stripe=require("stripe")('sk_test_51Isv4QSJz38k428udYaUI5CX1wjeBAY1i0JY2iS0oLDnQMOt8GAivYDVBqX5eyphu1U8AfeE19aZ7tajS0LS2c59007wYQNYbX');

//the whole process is to setup API

//App config
const app=express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API Routes
app.get('/', (request, response) =>response.status(200).send('hello world'));  //setting a dummy route

app.post('/payments/create', async (request, response) =>{
    const total=request.query.total;

    console.log('Payment request recieved boom!! for this amount>>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,  //this is in subunits of currency
        currency: "inr",  //inr= Indian Rupees(INR)
    });
    
    // OK- Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});

//Listen command
exports.api=functions.https.onRequest(app)

//example endpoint
//http://localhost:5001/clone-9db4b/us-central1/api
