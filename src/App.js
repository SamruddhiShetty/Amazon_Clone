
import './App.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import Orders from './Orders';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise=loadStripe("pk_test_51Isv4QSJz38k428umIoY8p3MY7CTwCoPOliWlQo3YqZ1oJK0f1yTJhsdltM5dLhxBMLtnt5CORWfJaMEsWhbiVSd002pnEIXbk");


function App() {
  const [{}, dispatch]=useStateValue();

  //listner 

  useEffect(()=>{
     //will run only once when the app command loads..

     auth.onAuthStateChanged(authUser =>{
       console.log('The user is >>>', authUser);

       if(authUser){
         //then the user just logged in or the user was logged in
         //this shoots the user info to the data layer
         dispatch({
           type:'SET_USER',
           user:authUser
         })
       }else{
         //the user is logged out
         
         dispatch({
           type: "SET_USER",
           user:  null
         })
       }
     })
  }, [])
  return (
    //BEM convention
    <Router>
      <div className="app">
        
        <Switch>
          <Route path="/orders">
            <Header />            
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            {/* This basically wraps the payment  */}
            
          </Route>

          <Route path="/">
            <Header /> 
            <Home />
          </Route>

        </Switch>

      </div>

    </Router>
    
  );
}

export default App;
