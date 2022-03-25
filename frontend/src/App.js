import React from "react";
import AppBarAndDrawer from "./AppBarAndDrawer/AppBarAndDrawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "./theme";
import { DataProvider } from "./Providers/DataProvider";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Signup from "./component/signup/Signup";
import Login from "./component/login/Login";
import ResetPassword from "./component/login/ResetPassword";
import ResetPasswordConfirm from "./component/login/ResetPasswordConfirm";
import Root from "./redux/Root";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import authentication from "./utils/Authentication";
import {BASE_BACKEND_URL, BASE_FRONTEND_URL, STRIPE_PUB_KEY} from "./utils/Constant";
import Activate from "./component/signup/Activate";
import Logout from "./component/logout/Logout";
import Home from "./component/Home/Home"
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import AdminProduct from "./component/Admin/AdminProduct";
import AddProduct from "./component/Admin/AddProduct";
import AdminUser from "./component/Admin/User/AdminUser";
import AddUser from "./component/Admin/User/AddUser";
import Category from "./component/Category /Category";
import Cart from "./component/Cart/Cart";
import Checkout from "./component/Checkout/CheckoutHeader";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import AdminOrder from "./component/Admin/Order/AdminOrder";
import AboutUs from "./component/AboutUs/AboutUs";
import CheckoutHeader from "./component/Checkout/CheckoutHeader";
import AdminProductType from "./component/Admin/ProductType/AdminProductType";
import AdminProductUnit from "./component/Admin/ProductUnit/AdminProductUnit";
import AddProductType from "./component/Admin/ProductType/AddProductType";
import AddProductUnit from "./component/Admin/ProductUnit/AddProductUnit";
import AdminSlider from "./component/Admin/Slider/AdminSlider";
import AddSlider from "./component/Admin/Slider/AddSlider";
import Profile from "./component/User/Profile";
import Terms from "./static/pages/Terms";
import Contact from "./static/pages/Contact";


/* Check if server is running in development or production*/
if (window.location.origin === BASE_FRONTEND_URL) {
  axios.defaults.baseURL = BASE_BACKEND_URL; // Development
} else {
  axios.defaults.baseURL = window.location.origin; // Production
}

export default function App() {

  const [currentTheme, setCurrentTheme] = useTheme();
  const stripePromise = loadStripe(STRIPE_PUB_KEY);

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={currentTheme}>
            <ToastContainer hideProgressBar={true} newestOnTop={true} />
            <DataProvider>
              <Root>
                <div>

                  <Switch>

                    <Route  exact path="/activate/:uid/:token" component={Activate}/>

                    <Route path="/login" component={Login}/>

                    <Route path="/signup" component={Signup}/>

                    <Route exact path='/reset-password' component={ResetPassword} />

                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />


                    <AppBarAndDrawer
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}/>
                  </Switch>

                  <Switch>
                    <Route exact strict path="/">
                      <Home />
                    </Route>
                    <Route path="/home" component={Home}/>
                    <Route exact path="/logout">
                      <Logout />
                    </Route>

                    <Route exact path="/manageProduct" component={authentication(AdminProduct)}/>
                    <Route exact path="/addProduct" component={authentication(AddProduct)}/>
                    <Route exact path="/manageUser" component={authentication(AdminUser)}/>
                    <Route exact path="/addUser" component={authentication(AddUser)}/>
                    <Route exact path="/categories" component={Category}/>
                    <Route exact path="/cart" component={Cart}/>
                    <Route exact path="/manageOrder" component={authentication(AdminOrder)}/>
                    <Route exact path="/aboutUs" component={AboutUs}/>
                    <Route exact path="/manageProductType" component={authentication(AdminProductType)}/>
                    <Route exact path="/manageProductUnit" component={authentication(AdminProductUnit)}/>
                    <Route exact path="/manageAddProductType" component={authentication(AddProductType)}/>
                    <Route exact path="/manageAddProductUnit" component={authentication(AddProductUnit)}/>
                    <Route exact path="/manageSlider" component={authentication(AdminSlider)}/>
                    <Route exact path="/addSlider" component={authentication(AddSlider)}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/terms" component={Terms}/>
                    <Route exact path="/contactUs" component={Contact}/>



                    <Route exact path="/checkout">
                      <Elements stripe={stripePromise}>
                          <CheckoutHeader />
                      </Elements>
                    </Route>

                  </Switch>
                </div>
              </Root>
            </DataProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </div>
  );
}


