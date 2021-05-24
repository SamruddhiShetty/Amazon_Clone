import React from 'react'
import { useState, useEffect } from 'react'
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from './StateProvider';
import Order from './Order'

function Orders() {
    const [{ basket, user }, dispatch]=useStateValue();
    const [orders, setOrders]= useState([]); //initial vlaue -[]

    useEffect(() => {
        if (user){

            db.collection('users').doc(user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(snapshot =>(
                setOrders(snapshot.docs.map(doc =>({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        } else{
            setOrders([])
        }
    }, [user])
    return (
        <div className='orders'>
            <h1>Your orders</h1>
            {/* this is where the real time database is introduced  */}
            
            <div className='orders__order'>
                {orders?.map(order =>(
                    <Order order={order} />
                ))}
            </div>
            
        </div>
    )
}

export default Orders
