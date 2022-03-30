import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item to the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="info">
        <p>{title}</p>
        <p className="price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="product" />

      <button className="btn" onClick={addToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
