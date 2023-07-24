import "./App.css";
import Home from "./component/Home/Home";
import UserData from "./more/UserData";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginSignup from "./component/Authentication/LoginSignup";
import WebFont from "webfontloader";
import Store from "./store";
import { loadUser } from "./actions/userAction";
import ProductDetails from "./component/Products/ProductDetails";
import Cart from "./component/Cart/Cart";
import ProtectedRoute from "./route/ProtectedRoute";
import Dashboard from "./component/Admin/Dashboard";
import AllProducts from "./component/Admin/AllProducts";
import CreateProduct from "./component/Admin/CreateProduct";
import EditProduct from "./component/Admin/EditProduct";
import UpdatePassword from './component/user/UpdatePassword';
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./component/Cart/Payment";
import Notfound from "./more/Notfound";
import Success from "./component/Cart/Success";
import MyOrder from "./component/user/MyOrder";
import MyOrderDetails from "./component/user/MyOrderDetails";
import AllOrder from "./component/Admin/AllOrder";
import UpdateOrder from "./component/Admin/UpdateOrder";

import AllUsers from "./component/Admin/AllUsers";
import UpdateUser from "./component/Admin/UpdateUser";
import Profile from "./component/user/Profile";
import EditProfile from "./component/user/EditProfile";
import Products from "./component/Products/Products";
import AllCategories from "./component/Admin/AllCategories";
import CreateCategory from "./component/Admin/CreateCategory";
import UpdateCategory from "./component/Admin/EditCategory";

import Promotions from "./component/Promotions/ViewPromotions";
import Reportpromo from "./component/Promotions/ReportPromo";
import Addpromo from "./component/Promotions/AddPromotion";
import Updatepromo from "./component/Promotions/UpdatePromotion";
import Review from "./component/Review/ViewReview";
import ReportReview from "./component/Review/ReportReview";
import AddReview from "./component/Review/AddReview";

import AllBrands from "./component/Admin/AllBrands";
import CreateBrand from "./component/Admin/CreateBrand";
import UpdateBrand from "./component/Admin/EditBrand";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("https://choco-e-app.onrender.com/api/v2/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });

    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/products/:keyword" component={Products} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={AllProducts}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={CreateProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/edit/product/:id"
          component={EditProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={AllUsers}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={AllOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={UpdateOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={Success} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/Categories"
          component={AllCategories}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/Category"
          component={CreateCategory}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/edit/category/:id"
          component={UpdateCategory}
        />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update/info" component={EditProfile} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/brands"
          component={AllBrands}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/brand"
          component={CreateBrand}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/edit/brand/:id"
          component={UpdateBrand}
        />
        //Ihill Routes
        <Route exact path="/admin/promotions" component={Promotions} />
        <Route exact path="/admin/GenReport" component={Reportpromo} />
        <Route exact path="/admin/AddPromotions" component={Addpromo} />
        <Route exact path="/admin/UpdatePromotions" component={Updatepromo} />
        <Route exact path="/admin/reviews" component={Review} />
        <Route exact path="/admin/GenReport/review" component={ReportReview} />
        <Route exact path="/admin/AddReview" component={AddReview} />
      </Switch>
    </Router>
  );
}

export default App;
