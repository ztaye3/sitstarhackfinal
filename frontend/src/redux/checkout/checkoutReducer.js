import {
    CALL_CHECKOUT_FAIL,
    CALL_CHECKOUT_SUCCESS,
    STRIP_CHECKOUT_BACKEND_FAIL,
    STRIP_CHECKOUT_BACKEND_SUCCESS,
    STRIP_CHECKOUT_FRONTEND_FAIL,
    STRIP_CHECKOUT_FRONTEND_SUCCESS,
    UPDATE_ACTIVE_STATE_FAIL,
    UPDATE_ACTIVE_STATE_SUCCESS,
    UPDATE_PAYMENT_DETAILS_SUCCESS,
    UPDATE_SHIPPING_SUCCESS

} from "./type";
import {isEmptyUtils} from "../../utils/Utils";



const initialState = {
   order: {},
   checkoutData : {},
   amountBought: {},
   isFrontendCheckout: false,
   isBackendCheckout: false,
    shippingData: {
                    first_name: '',
                    last_name: '',
                    address: '',
                    apartment: '',
                    zip_code: '',
                    phone: '',
                    email: '',
                    city: '',
                    country: '',
                    state: ''
    }
    ,
  payment: {},
  activeStep: 0

}

const checkoutReducer = (state =initialState, action) => {
    switch (action.type){

        case CALL_CHECKOUT_SUCCESS:
            return {
                ...state,
                amountBought: action.payload,
                isAddToCart: true
            }
        case CALL_CHECKOUT_FAIL:
            return {
                ...state,
                isAddToCart: false
            }
        case STRIP_CHECKOUT_FRONTEND_SUCCESS:
            return {
                ...state,
                isFrontendCheckout: true,
                order: action.payload
            }
        case STRIP_CHECKOUT_FRONTEND_FAIL:
            return {
                ...state,
                isFrontendCheckout: false
            }
        case STRIP_CHECKOUT_BACKEND_SUCCESS:
            return {
                ...state,
                isBackendCheckout: true
            }
        case STRIP_CHECKOUT_BACKEND_FAIL:
            return {
                ...state,
                isBackendCheckout: false
            }

        case UPDATE_SHIPPING_SUCCESS:
            return {
                ...state,
                shippingData: action.payload
            }
        case UPDATE_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                payment: action.payload
            }
        case UPDATE_ACTIVE_STATE_SUCCESS:
            return {
                ...state,
                activeStep: action.payload
            }
        case UPDATE_ACTIVE_STATE_FAIL:

        default:
            return state
    }
}

export default checkoutReducer;