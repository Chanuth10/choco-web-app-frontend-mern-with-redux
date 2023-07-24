import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import logo from "../../Assets/logo.PNG";

const Sidebar = () => {
  const button = () => {
    let items = document.querySelectorAll(".Dashboard__item");
  };

  return (
    <div className="sidebar">
      <Link to="/dashboard">
        <img src={logo} alt="Choco" />
      </Link>
      <Link to="/dashboard">
        <p className="Dashboard__item" onClick={button}>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/products">
        <p className="Dashboard__item">
          <PostAddIcon /> Products
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <PeopleIcon />
          Users
        </p>
      </Link>
      <Link to="/admin/Promotions">
        <p>
          <ListAltIcon />
          Promotions
        </p>
      </Link>
      <Link to="/admin/AddPromotions">
        <p>
          <PeopleIcon /> Add Promotions
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
      <Link to="/admin/Categories">
        <p>
          <RateReviewIcon />
          Category
        </p>
      </Link>
     
      <Link to="/admin/Brands">
        <p>
          <RateReviewIcon />
          Brand
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
