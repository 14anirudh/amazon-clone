import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider.js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";
import Orders from "./Orders";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [clientSecret, setclientSecret] = useState(true);

  //it runs when the payment component load or if any of the variables change inside the bracket
  useEffect(() => {
    // generaet the special stripe secret which allows payment from customer(but whenever the basket changes we have to tell stripe the upadated amount )
    const getClientSecret = async () => {
      const response = await axios({
        //axios is way of making a request
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`, //stripe expects currencies in subunits for dollars it will consider cents
      });
      setclientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("THE SCERET IS >>", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent refreshing error
    setProcessing(true); // enable buy now only for once and not for multiple times

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //payment intent = paymnet confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("Orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders"); //not push because do not wnat to come back on payment page
      });
  };

  const handleChange = (event) => {
    //listen for changes in the CardElement
    //and displays any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="address">
            <p>{user?.email}</p>
            <p>235 React Lane </p>
            <p>Los angeles</p>
          </div>
        </div>
        <div className="section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="items">
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
        <div className="section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/*stripe */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total :{value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
