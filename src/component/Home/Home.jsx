import React, { useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/background.jpg";
import bg2 from "../../Assets/background2.jpg";
import ProductCard from "../Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      <Header />
      <div className="banner">
        <Carousel>
          <img src={bg} className="bgImg" />
          <img src={bg2} className="bgImg" />
        </Carousel>
        <div className="home__content">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "Segoe Script",
                fontSize: "3em",
                fontWeight: "500",
              }}
            >
              Welcome
            </h2>
            <span
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                margin: "0px 10px",
                textAlign: "center",
                width: "150px",
                height: "40px",
                color: "#917236",
                fontFamily: "Segoe Script",
                fontSize: "2.4em",
                display: "flex",
                justifyContent: "center",
                lineHeight: ".7",
                alignItems: "center",
              }}
            >
              Choco
            </span>
          </div>
          <div>
            <h2
              style={{
                fontSize: "4.5em",
                fontFamily: "Poppins,sans-serif",
                color: "#fff",
              }}
            >
              Sweet
            </h2>
          </div>
          <div>
            <h2
              style={{
                fontSize: "4.5em",
                fontWeight: "400",
                fontFamily: "Poppins,sans-serif",
                color: "#fff",
                lineHeight: ".7",
              }}
            >
              Dream
            </h2>
          </div>
          <div>
            <h2
              style={{
                fontWeight: "400",
                fontFamily: "Poppins,sans-serif",
                color: "#fff",
                fontSize: "1em",
                paddingTop: "10px",
              }}
            >
              Get Free happiner for our product
            </h2>
          </div>
          <div>
            <a href="#container">
              <button
                type="submit"
                style={{
                  width: "135px",
                  height: "50px",
                  border: "1px",
                  background: "#917236",
                  margin: "10px 0",
                  fontSize: "1.2vmax",
                  color: "#fff",
                  textShadow: "initial",
                  cursor: "pointer",
                }}
                className="Home__button"
              >
                Click here
              </button>
            </a>
          </div>
        </div>
      </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </>
  );
};

export default Home;
