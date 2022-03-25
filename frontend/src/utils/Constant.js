export const AUTHORIZATION = "AUTHORIZATION";
export const DASHBOARD_URL = "/dashboard";

// Back end URLs
export const BASE_BACKEND_URL = "http://127.0.0.1:8000";
export const BASE_FRONTEND_URL = "http://localhost:3000"
export const LOGIN_URL = "/api/auth/v1/jwt/create/";
export const GET_USER_URL = "/api/auth/v1/users/me/";
export const SIGNUP_URL = "/api/auth/v1/users/";
export const LOGOUT_URL = "/api/auth/v1/token/logout/";
export const AUTH_LOGIN_REDIRECT_URL = "/login/?next=";
export const ACTIVATE_ACCOUNT_URL = "/api/auth/v1/users/activation/";
export const VERIFY_TOKEN_URL = "/api/auth/v1/jwt/verify/";
export const REFRESH_TOKEN_URL = "/api/auth/v1/jwt/";
export const RESET_PASSWORD_URL = "/api/auth/v1/users/reset_password/";
export const RESET_PASSWORD_CONFIRM_URL = "/api/auth/v1/users/reset_password_confirm/";
export const ACTIVATE_USER_UPDATE_PROFILE_URL = "/api/auth/v1/update-profile/";
export const ACTIVATE_USER_REDIRECT_URL = "/activate/uid/token";


export const PRODUCT_URL = "/api/product/v1/";
export const PRODUCT_TYPE_URL = "/api/product/v1/type/";
export const PRODUCT_UNIT_URL = "/api/product/v1/unit/";
export const PRODUCT_TYPE_GET_URL = "/api/product/v1/type/getAll/";
export const PRODUCT_UNIT_GET_URL = "/api/product/v1/unit/getAll/";
export const IMAGE_SLIDER_URL = "/api/product/v1/slider/";
export const IMAGE_SLIDER_GET_URL = "/api/product/v1/slider/getAll/";
export const ADD_IMAGE_SLIDER_URL = "/api/product/v1/slider/addImageSlider/";


export const USER_URL = "/api/auth/v1/user/";
export const ADD_USER_URL ="/api/auth/v1/addUser/";
export const ADD_PRODUCT_URL = "/api/product/v1/addProduct/";
export const ADD_PRODUCT_TYPE_URL = "/api/product/v1/type/addProductType/";
export const ADD_PRODUCT_UNIT_URL = "/api/product/v1/unit/addProductUnit/";
export const PRODUCT_BY_CATEGORY_URL = "/api/product/v1/searchCategory"
export const PRODUCT_BY_NAME_URL = "/api/product/v1/searchProduct"
export const SUBMIT_ORDER_URL = "/api/order/v1/addOrder/";
export const ORDER_URL = "/api/order/v1/";
export const UPDATE_RATE_URL = "/api/product/v1/updateRate"

// Front end URL
export const MANAGE_USER_URL = "/manageUser"
export const MANAGE_PRODUCT_TYPE_URL = "/manageProductType"
export const MANAGE_ADD_PRODUCT_TYPE_URL = "/manageAddProductType"
export const MANAGE_ADD_PRODUCT_UNIT_URL = "/manageAddProductUnit"
export const MANAGE_PRODUCT_UNIT_URL = "/manageProductUnit"
export const ADD_MANAGE_USER_URL = "/addUser"
export const MANAGE_PRODUCT_URL = "/manageProduct"
export const ADD_PRODUCT = "/addProduct"
export const HOME_URL = "/"
export const CATEGORY_URL = "/categories"
export const CART_URL = "/cart"
export const BLOG_URL = "/blog"
export const ABOUT_URL = "/aboutUs"
export const MANAGE_BLOG_URL = "/manageBlog"
export const MANAGE_ABOUT_URL = "/manageAbout"
export const MANAGE_ORDER_URL = "/manageOrder"
export const CHECKOUT_URL = "/checkout";
export const MANAGE_SLIDER_URL = "/manageSlider"
export const ADD_SLIDER_URL = "/addSlider"
export const USER_PROFILE_URL = "/profile"

// Variable constant
export const GET_PRODUCT_BY_CATEGORY = "getProductByCategory"
export const GET_PRODUCT_BY_NAME = "getProductByName"
export const PRODUCT_CATEGORY_ONE= "HABESHA_CLOTH"
export const PRODUCT_CATEGORY_TWO= "HABESHA_INGREDIENT"
export const PRODUCT_CATEGORY_THREE= "DETERGENT"
export const PRODUCT_CATEGORY_FOUR= "SOFT_DRINK"
export const ADD_TO_CART = "addToCart"
export const CURRENCY = 'CHF';
// Automate is b/n production and testing
export const STRIPE_PUB_KEY ="pk_test_51JIETXFjmXVud4Gb9QpJxJygu21vbmyutdVrYq4nsgICQLrcsUJBJ7abA3jxfkqMkCFiJVeLXgOXFklMLocYiitH00o5xqE3S5";
export const CALL_CHECKOUT = "stripeCheckout";
export const SUBMIT_ORDER = "submitOrder";
export const GET_ORDER = "getOrder";
export const UPDATE_ORDER = "updateOrder";
export const DELETE_ORDER = "deleteOrder";
export const UPDATE_RATE = "updateRate";
export const UPDATE_SHIPPING = "updateShipping";
export const UPDATE_PAYMENT = "updatePayment";
export const UPDATE_ACTIVE_STATE = "updateActiveState";

export const ADD_PRODUCT_TYPE = "ADD_PRODUCT_TYPE";
export const UPDATE_PRODUCT_TYPE = "UPDATE_PRODUCT_TYPE";
export const GET_PRODUCT_TYPE = "GET_PRODUCT_TYPE";
export const DELETE_PRODUCT_TYPE = "DELETE_PRODUCT_TYPE";

export const ADD_PRODUCT_UNIT = "ADD_PRODUCT_UNIT";
export const UPDATE_PRODUCT_UNIT = "UPDATE_PRODUCT_UNIT";
export const GET_PRODUCT_UNIT = "GET_PRODUCT_UNIT";
export const DELETE_PRODUCT_UNIT = "DELETE_PRODUCT_UNIT";
export const NO_DISPATCH = "NO_DISPATCH";
export const GET_PRODUCT_UNIT_TYPE = "GET_PRODUCT_UNIT_TYPE";
export const SEARCH_BY_CATEGORY_DEFAULT = "SEARCH_BY_CATEGORY_DEFAULT";

export const ADD_SLIDER = "ADD_SLIDER";
export const GET_SLIDER = "GET_SLIDER";
export const DELETE_SLIDER = "DELETE_SLIDER";


