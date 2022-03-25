import {
    DELETE_ORDER_FAIL, DELETE_ORDER_SUCCESS,
    GET_ALL_ORDER_FAIL,
    GET_ALL_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_SUCCESS
} from "./type";



const initialState = {
    productAdded: false,
    orders:[]
    ,
    deleteProduct: false,
    updateProduct: false
}

const orderReducer = (state =initialState, action) => {
    switch (action.type){
        case GET_ALL_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload
            }
        case GET_ALL_ORDER_FAIL:
            return {
                ...state
            }
        case DELETE_ORDER_FAIL:
        case DELETE_ORDER_SUCCESS:
        case UPDATE_ORDER_SUCCESS:
        case UPDATE_ORDER_FAIL:
        default:
            return state
    }
}

export default orderReducer;