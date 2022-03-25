import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_SUCCESS, REMOVE_CART_SUCCESS
} from "./type";
import {isEmptyUtils} from "../../utils/Utils";



const initialState = {
   cart : !isEmptyUtils(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [],
   isAddToCart: false,
   isShipping: false,
   isPayment: false
}

const cartReducer = (state =initialState, action) => {
    switch (action.type){

        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload,
                isAddToCart: true
            }
        case ADD_TO_CART_FAIL:
            return {
                ...state,
                isAddToCart: false
            }
        case REMOVE_CART_SUCCESS:
            return {
                ...state,
                isAddToCart: false,
                cart: []
            }

        default:
            return state
    }
}

export default cartReducer;