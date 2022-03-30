import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div className="container">
        <img
          className="image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/row/sadlp/AVD-8688_SADLP_Intl_TheTick_SeriesLaunch_ROW_Image_Right_FT.jpg"
          alt="prime"
        />
      </div>
      <div className="row">
        <Product
          id={201223}
          title="Echo Dot (3rd Gen, 2018 release) Smart speaker with Alexa "
          price={35.29}
          image="https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SL1000_.jpg"
          rating={5}
        />
        <Product
          id={12312}
          title="Marshall Stanmore II Voice Black Speaker With Amazon Alexa"
          price={369.0}
          image="https://m.media-amazon.com/images/I/71wTTzKIkAL._AC_SL1500_.jpg"
          rating={4}
        />
      </div>
      <div className="row">
        <Product
          id={124324}
          title="Seiko Men's SNE102 Stainless Steel Solar Watch "
          price={94.48}
          image="https://m.media-amazon.com/images/I/5129eZlTIRL._AC_UX679_.jpg"
          rating={4}
        />
        <Product
          id={9879}
          title="ASICS Unisex-Adult Stormer Ls Sneakers"
          price={52.23}
          image="https://m.media-amazon.com/images/I/71QZ--cQJnL._UX675_.jpg"
          rating={4}
        />
        <Product
          id={786768}
          title="
          Instant Vortex 5.7QT Large Air Fryer Oven Combo "
          price={79.95}
          image="https://m.media-amazon.com/images/I/61dtu0t3g1L._AC_SL1500_.jpg"
          rating={4}
        />
      </div>
      <div className="row">
        <Product
          id={9687532}
          title="Amazon Brand-Ravenna Home Oakesdale Contemporary Glider Recliner"
          price={248.33}
          image="https://m.media-amazon.com/images/I/71pefmfDA9L._AC_SL1500_.jpg"
          rating={5}
        />
        <Product
          id={234252}
          title="LG 27GL83A-B 27 Inch Ultragear QHD IPS 1ms NVIDIA G-SYNC Compatible Gaming Monitor"
          price={279.23}
          image="https://m.media-amazon.com/images/I/81dAe2wXIqL._AC_SL1500_.jpg"
          rating={4}
        />
      </div>
    </div>
  );
}

export default Home;
