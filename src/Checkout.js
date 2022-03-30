import React from "react";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket,user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="left">
        <img
          className="ad"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2022/January/ValentinesDay/LandingPage/Fuji_Vday_LP1_en.jpg"
          alt="advertisment"
        />

        <div>
          <h3>Hello,{user?.email}</h3>
          <h2 className="title">Your Shopping Basket</h2>

          {basket.map((item) => (
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
      <div className="right">
        <Subtotal />
        
      </div>
    </div>
  );
}

export default Checkout;
