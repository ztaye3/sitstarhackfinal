import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import signupReducer from "./signup/signupReducer";
import loginReducer from "./login/loginReducer";
import activateReducer from "./signup/activateReducer";
import productReducer from "./admin/product/productReducer";
import addUserReducer from "./admin/user/addUserReducer";
import categoryReducer from "./product/category/categoryReducer";
import cartReducer from "./cart/cartReducer";
import checkoutReducer from "./checkout/checkoutReducer";
import orderReducer from "./admin/order/orderReducer";


// Synchronize state over history -> store-> router -> components
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    signupUser: signupReducer,
    loginUser: loginReducer,
    activateUser: activateReducer,
    productAdmin: productReducer,
    userAdmin: addUserReducer,
    productCategory: categoryReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
  });

export default createRootReducer;