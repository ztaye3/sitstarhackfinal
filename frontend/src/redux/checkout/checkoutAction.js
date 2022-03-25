import {push} from "connected-react-router";
import {
    CALL_CHECKOUT_SUCCESS,
    STRIP_CHECKOUT_FRONTEND_FAIL,
    STRIP_CHECKOUT_FRONTEND_SUCCESS, UPDATE_ACTIVE_STATE_SUCCESS, UPDATE_PAYMENT_DETAILS_SUCCESS,
    UPDATE_SHIPPING_SUCCESS,
} from "./type";
import {
    CALL_CHECKOUT,
    SUBMIT_ORDER,
    SUBMIT_ORDER_URL,
    UPDATE_ACTIVE_STATE,
    UPDATE_PAYMENT,
    UPDATE_SHIPPING
} from "../../utils/Constant";
import axios from "axios";
import {errorFilter} from "../../utils/Utils";
import {REMOVE_CART_SUCCESS} from "../cart/type";
import {toast} from "react-toastify";

const checkoutAction = (userInput, operation, redirectTo) => dispatch => {


        if( operation === CALL_CHECKOUT)
            dispatch(callCheckout(userInput, redirectTo))
        else if( operation === SUBMIT_ORDER)
            dispatch(submitOrder(userInput, redirectTo))
        else if( operation === UPDATE_SHIPPING)
            dispatch(updateShipping(userInput, redirectTo))
        else if( operation === UPDATE_PAYMENT)
            dispatch(updatePayment(userInput, redirectTo))
        else if( operation === UPDATE_ACTIVE_STATE)
            dispatch(updateActiveState(userInput, redirectTo))



}

// updateActiveState
const updateActiveState = (userInput, redirectTo) => dispatch =>{
    dispatch({
        type: UPDATE_ACTIVE_STATE_SUCCESS,
        payload: userInput
    })
}

// update payment
const updatePayment = (userInput, redirectTo) => dispatch => {
    dispatch({
        type: UPDATE_PAYMENT_DETAILS_SUCCESS,
        payload: userInput
    })
}

// Update shipping
const updateShipping = (userInput, redirectTo) => dispatch => {
    dispatch({
        type: UPDATE_SHIPPING_SUCCESS,
        payload: userInput

    })
}

// Call checkout component
const callCheckout = (userInput, redirectTo) => dispatch => {

            // Add total price
             userInput["total_price"] = getTotalPrice(userInput);

             dispatch({type: CALL_CHECKOUT_SUCCESS,
                       payload: userInput})

             dispatch(push(redirectTo))
}

// Calculate total price
const getTotalPrice = (userInput) => {

    let sum = 0.00;

    for (let code in userInput){
        sum = sum + userInput[code]
    }

    return(
        parseFloat(sum.toFixed(2))
    )
}

// Submit order
const submitOrder = (userInput, redirectTo) => dispatch =>{

    axios
        .post(SUBMIT_ORDER_URL, userInput)
        .then(result => {

            // Display in success toast
              toast.success(

                  "Successful payment"
              )
            // Remove cart item
            localStorage.removeItem("cart");
            dispatch({
                type: REMOVE_CART_SUCCESS
            })

             dispatch({type: STRIP_CHECKOUT_FRONTEND_SUCCESS,
                       payload: result.data})

             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: STRIP_CHECKOUT_FRONTEND_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}


export default checkoutAction;