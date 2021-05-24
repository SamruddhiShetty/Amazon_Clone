import React from 'react'
import './Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router';

function Subtotal() {
    const history=useHistory(); //reat router module which gives browser history       
    const[{ basket }] = useStateValue();  

    
    return (
        <div className="subtotal">
            <CurrencyFormat   //this is the one seen on the screen
              renderText={(value)=>(
                  <>
                    <p>
                        {/* part of homework */}
                        Subtotal ({ basket?.length } items): <strong> { value }</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" />This order contains a gift.
                    </small>
                  </>
                    
              )}
              decimalScale={2}
              value={getBasketTotal(basket)}//part of homework
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}

            />
            {/* Link is used to redirect to differnt pages using url but history can be used to get
            to differnt pages programmatically and also keeps the css styling intact while rerouting. */}
            <button onClick={e =>  history.push('/payment')}>Proceed to Checkout</button>
            
        </div>
    );
}

export default Subtotal
