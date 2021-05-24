import React, { useState, useEffect } from 'react';
import CheckoutProduct from './CheckoutProduct';
// import Checkout from './Checkout';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';
function Payment() {

    const [{basket, user}, dispatch]=useStateValue();
    const history=useHistory();

    // These are some of the powerful hooks
    const stripe=useStripe();
    const elements=useElements();
    
    const [succeeded, setSucceeded]=useState(false);
    const [processing, setProcessing]=useState("");
    const [error, setError]=useState(null);
    const [disabled, setDisabled]=useState(true);
    const [clientSecret, setClientSecret]=useState(true);
    
    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer
        
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currencies subunits
                //`` - for string interpolation
                url: `/payments/create?total=${getBasketTotal(basket)*100}` //total passed to API to allow us to charge the customer

            }); //axios is a way of making requests
            setClientSecret(response.data.clientSecret);
            
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret);
    console.log("🚚", user);
    const handleSubmit= async (event) =>{
        //here we do the stripe stuff
        event.preventDefault();
        setProcessing(true); //this will stop the user from clicking the button multiple times
 
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }  //this is the card
        }).then(({ paymentIntent })=> {
            //paymentIntent= payment confirmation
            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            }) //this is using a NoSQL database


            setSucceeded(true); //cz the transaction was good
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            }) //AFTER PROCESSING THE PAYMENT

            history.replace('/orders') //avoid the loop to the payments page
            //why not history.push because we dont want to come back to the payment page after the payment we want 
            //to swap the page with the order page.

        }) //destructuring of the response which comes
    }
    const handleChange = event => {
        //listen for changes in card element
        //and display any errors as the customer types their card details

        setDisabled(event.empty); //if there is an error disable the button
        setError(event.error ? event.error.message : "");// if the event has error display the message else empty string

    }
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                    {/* if we click this it will take us back to the checkout page */}
                </h1>
                {/* Payment section -delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p> {user?.email} </p>
                        <p> 123 React Lane </p>
                        <p> Orissa, India </p>
                    </div>
                </div>

                {/* Payment section -Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {/* all the products in the basket is shown here */}
                        {basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>

                </div>

                {/* Payment section -payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) =>(
                                        <h3>Order Total: {value} </h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>

                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default Payment
