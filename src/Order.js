import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ Order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(Order.data.created).format("MMMM Do YYYY,h:mma")}</p>
      <p className="order_id">
        <small>{Order.id}</small>
      </p>
      {Order.data.basket?.map(item => {
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      })}
      <CurrencyFormat
        renderText={(value) => <h3>Order Total :{value}</h3>}
        decimalScale={2}
        value={Order.data.amount/100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
