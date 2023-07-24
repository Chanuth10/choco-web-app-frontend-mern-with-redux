import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      <Header />
      <div>
        <div className="profileContainer">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                fontFamily: "Poppins,sans-serif",
                opacity: "1",
                fontSize: "2vmax",
              }}
            >
              My Profile
            </h1>
            <img
              src={user.avatar.url}
              alt={user.name}
              className="profile__img"
            />
            <Link to="/me/update/info" className="edit__profile">
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="information">
          <div className="middle">
            <div className="info">
              <h4
                style={{
                  padding: "0px 5px",
                }}
              >
                Full Name:
              </h4>
              <p>{user.name}</p>
            </div>
            <div className="info">
              <h4
                style={{
                  padding: "0px 5px",
                }}
              >
                Email:
              </h4>
              <p>{user.email}</p>
            </div>
            <div className="info">
              <h4
                style={{
                  padding: "0px 5px",
                }}
              >
                Joined On:
              </h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
            </div>

            <div className="change__info">
              <Link to="/orders" className="settings">
                My Orders
              </Link>
              <Link to="/me/update" className="settings">
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
