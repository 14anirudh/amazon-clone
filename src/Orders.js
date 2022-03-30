import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc") //arrange the orders by the date created and in descending order
        .onSnapshot((snapshot) => {
          //realtime snapshot of order from firestore
          setOrders(
            snapshot.docs.map((doc) => ({
              //mapping the orders
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders_order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
