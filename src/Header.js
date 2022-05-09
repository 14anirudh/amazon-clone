import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="logo"
          src="https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png"
          alt="logo"
        />
      </Link>

      <div className="search">
        <input className="searchInput" type="text" />
        <SearchIcon className="searchIcon" />
      </div>
      <div className="nav">
        <Link to={!user && "/login"}>
          <div className="option" onClick={handleAuthentication}>
            <span className="optline1">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="optline2">{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>
        <Link to='/orders'>
        <div className="option">
          <span className="optline1">Returns &</span>
          <span className="optline2">Orders</span>
        </div>
        </Link>
        <div className="option">
          <span className="optline1">Your</span>
          <span className="optline2">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="optionBasket">
            <ShoppingBasketIcon />
            <span className="optline2 optionBasket">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
