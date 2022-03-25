import axios from "axios";
// import {ADD_ORDER_URL, ORDER_URL} from "../../../utils/Constant";
import {push} from "connected-react-router";
import {
DELETE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    GET_ALL_ORDER_FAIL,
    GET_ALL_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_SUCCESS
} from "./type";
import {toast} from "react-toastify";
import {errorFilter} from "../../../utils/Utils";
import {DELETE_ORDER, GET_ORDER, ORDER_URL, UPDATE_ORDER} from "../../../utils/Constant";

const orderAction = (userInput, operation, redirectTo) => dispatch => {



         if( operation === DELETE_ORDER)
            dispatch(removeOrder(userInput, redirectTo))
        else if( operation === UPDATE_ORDER)
            dispatch(updateOrder(userInput, redirectTo))
        else if( operation === GET_ORDER)
            dispatch(getAllOrder(redirectTo))

}


// Get all order
const getAllOrder = (redirectTo) => dispatch =>{

    axios
        .get(ORDER_URL)
        .then(result => {
             dispatch({type: GET_ALL_ORDER_SUCCESS,
                       payload: result.data})

             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: GET_ALL_ORDER_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Remove product by id
const removeOrder = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(ORDER_URL + id + "/")
        .then(result => {

             toast.success(
                      "Order removed successfully!"
                  )
             dispatch({type: DELETE_ORDER_SUCCESS
                       })
             dispatch(getAllOrder())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_ORDER_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update product by id
const updateOrder = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id


    axios
        .put(ORDER_URL + id + "/", userInput)
        .then(result => {

             toast.success(
                      "Order updated successfully!"
                  )
             dispatch({type: UPDATE_ORDER_SUCCESS
                       })

             dispatch(getAllOrder())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: UPDATE_ORDER_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}
export default orderAction;