import axios from "axios";
import {
    ADD_IMAGE_SLIDER_URL,
    ADD_PRODUCT_TYPE,
    ADD_PRODUCT_TYPE_URL,
    ADD_PRODUCT_UNIT,
    ADD_PRODUCT_UNIT_URL,
    ADD_PRODUCT_URL, ADD_SLIDER,
    DELETE_PRODUCT_TYPE,
    DELETE_PRODUCT_UNIT, DELETE_SLIDER,
    GET_PRODUCT_TYPE,
    GET_PRODUCT_UNIT,
    GET_PRODUCT_UNIT_TYPE, GET_SLIDER, IMAGE_SLIDER_GET_URL, IMAGE_SLIDER_URL,
    NO_DISPATCH,
    ORDER_URL,
    PRODUCT_TYPE_GET_URL,
    PRODUCT_TYPE_URL,
    PRODUCT_UNIT_GET_URL,
    PRODUCT_UNIT_URL,
    PRODUCT_URL,
    UPDATE_PRODUCT_TYPE,
    UPDATE_PRODUCT_UNIT,
    UPDATE_RATE,
    UPDATE_RATE_URL
} from "../../../utils/Constant";
import {push} from "connected-react-router";
import {
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_TYPE_FAIL,
    ADD_PRODUCT_TYPE_SUCCESS,
    ADD_PRODUCT_UNIT_FAIL,
    ADD_PRODUCT_UNIT_SUCCESS, ADD_SLIDER_FAIL, ADD_SLIDER_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_TYPE_FAIL,
    DELETE_PRODUCT_TYPE_SUCCESS,
    DELETE_PRODUCT_UNIT_FAIL,
    DELETE_PRODUCT_UNIT_SUCCESS, DELETE_SLIDER_FAIL, DELETE_SLIDER_SUCCESS,
    GET_ALL_PRODUCT_FAIL,
    GET_ALL_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_TYPE_FAIL,
    GET_ALL_PRODUCT_TYPE_SUCCESS,
    GET_ALL_PRODUCT_UNIT_FAIL,
    GET_ALL_PRODUCT_UNIT_SUCCESS, GET_ALL_SLIDER_FAIL, GET_ALL_SLIDER_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_TYPE_FAIL,
    UPDATE_PRODUCT_TYPE_SUCCESS,
    UPDATE_PRODUCT_UNIT_FAIL,
    UPDATE_PRODUCT_UNIT_SUCCESS
} from "./type";
import {toast} from "react-toastify";
import {errorFilter} from "../../../utils/Utils";
import {GET_PRODUCT_BY_NAME_FAIL, UPDATE_RATE_FAIL, UPDATE_RATE_SUCCESS} from "../../product/category/type";
import {
    DELETE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    GET_ALL_ORDER_FAIL,
    GET_ALL_ORDER_SUCCESS, UPDATE_ORDER_FAIL,
    UPDATE_ORDER_SUCCESS
} from "../order/type";

const productAction = (userInput, operation, redirectTo) => dispatch => {


        if( operation === "addProduct")
            dispatch(addProduct(userInput, redirectTo))
        else if( operation === "deleteProduct")
            dispatch(removeProduct(userInput, redirectTo))
        else if( operation === "editProduct")
            dispatch(updateProduct(userInput, redirectTo))
        else if( operation === "getAllProduct")
            dispatch(getAllProduct(redirectTo))
        else if(operation === UPDATE_RATE)
            dispatch(updateRate(userInput, redirectTo));

        else if( operation === ADD_PRODUCT_TYPE)
            dispatch(addProductType(userInput, redirectTo))
        else if( operation === DELETE_PRODUCT_TYPE)
            dispatch(removeProductType(userInput, redirectTo))
        else if( operation === UPDATE_PRODUCT_TYPE)
            dispatch(updateProductType(userInput, redirectTo))
        else if( operation === GET_PRODUCT_TYPE)
            dispatch(getAllProductType(redirectTo))

        else if( operation === ADD_PRODUCT_UNIT)
            dispatch(addProductUnit(userInput, redirectTo))
        else if( operation === DELETE_PRODUCT_UNIT)
            dispatch(removeProductUnit(userInput, redirectTo))
        else if( operation === UPDATE_PRODUCT_UNIT)
            dispatch(updateProductUnit(userInput, redirectTo))
        else if( operation === GET_PRODUCT_UNIT)
            dispatch(getAllProductUnit(redirectTo))
        else if( operation === GET_PRODUCT_UNIT_TYPE)
            dispatch(getProductUnitType(redirectTo))

        else if( operation === ADD_SLIDER)
            dispatch(addSlider(userInput, redirectTo))
        else if( operation === GET_SLIDER)
            dispatch(getAllSlider(redirectTo))
        else if( operation === DELETE_SLIDER)
            dispatch(removeSlider(userInput, redirectTo))

}

// Add product
const addProduct = (userInput, redirectTo) => dispatch => {

     const formData = new FormData();

        formData.append("description", userInput.description);
        formData.append("image", userInput.image);
        formData.append("created_by", userInput.created_by);
        formData.append("product_type", userInput.product_type);
        formData.append("product_status", userInput.product_status);
        formData.append("updated_by", userInput.updated_by);
        formData.append("market_price", userInput.market_price);
        formData.append("customer_price", userInput.customer_price);
        formData.append("product_unit", userInput.product_unit);
        formData.append("en", userInput.en);
        formData.append("de", userInput.de);
        formData.append("fr", userInput.fr);
        formData.append("it", userInput.it);
        formData.append("ti", userInput.ti);
        formData.append("ar", userInput.ar);
        formData.append("am", userInput.am);
        formData.append("locale", localStorage.getItem("i18nextLng"));

        // console.log("product_type", userInput.product_type)





        axios
        .post(ADD_PRODUCT_URL, formData)
        .then(response => {
             dispatch({type: ADD_PRODUCT_SUCCESS})
               toast.success(
                      "Product added successfully!"
                  )
             dispatch(getAllProduct())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: ADD_PRODUCT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Get all product unit
const getAllProductUnit = (redirectTo) => dispatch =>{

    axios
        .get(PRODUCT_UNIT_GET_URL)
        .then(result => {
             dispatch({type: GET_ALL_PRODUCT_UNIT_SUCCESS,
                       payload: result.data})

            // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }
        })
        .catch(error => {
             dispatch({type: GET_ALL_PRODUCT_UNIT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}


// Get all product type
const getAllProductType = (redirectTo) => dispatch =>{

    axios
        .get(PRODUCT_TYPE_GET_URL)
        .then(result => {
             dispatch({type: GET_ALL_PRODUCT_TYPE_SUCCESS,
                       payload: result.data})
             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }

        })
        .catch(error => {
             dispatch({type: GET_ALL_PRODUCT_TYPE_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Get all product type and unit
const getProductUnitType = (redirectTo) => dispatch =>{
    // get all product unit and type for add product
    dispatch(getAllProductType(NO_DISPATCH))
    dispatch(getAllProductUnit(NO_DISPATCH))

    dispatch(push(redirectTo))
}

// Get all product
const getAllProduct = (redirectTo) => dispatch =>{

    axios
        .get(PRODUCT_URL)
        .then(result => {
             dispatch({type: GET_ALL_PRODUCT_SUCCESS,
                       payload: result.data})

             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: GET_ALL_PRODUCT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Remove product by id
const removeProduct = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(PRODUCT_URL + id + "/")
        .then(result => {

             toast.success(
                      "Product removed successfully!"
                  )
             dispatch({type: DELETE_PRODUCT_SUCCESS
                       })
             dispatch(getAllProduct())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_PRODUCT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update product by id
const updateProduct = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    const formData = new FormData();

        formData.append("id", userInput.id);
        formData.append("name", userInput.name);
        formData.append("code", userInput.code);
        formData.append("description", userInput.description);
        formData.append("created_by", userInput.created_by);
        formData.append("product_type", userInput.product_type);
        formData.append("product_status", userInput.product_status);
        formData.append("updated_by", userInput.updated_by);
        formData.append("market_price", userInput.market_price);
        formData.append("customer_price", userInput.customer_price);
        formData.append("product_unit", userInput.product_unit);


    axios
        .put(PRODUCT_URL + id + "/", formData)
        .then(result => {

             toast.success(
                      "Product updated successfully!"
                  )
             dispatch({type: UPDATE_PRODUCT_SUCCESS
                       })

             dispatch(getAllProduct())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: UPDATE_PRODUCT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update rate
const updateRate = (userInput, redirectTo) => dispatch =>{

    axios
        .post(UPDATE_RATE_URL, userInput)
        .then(result => {
             dispatch({type: UPDATE_RATE_SUCCESS})
             // Reload product
             dispatch(getAllProduct())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: UPDATE_RATE_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}



// Add product type
const addProductType = (userInput, redirectTo) => dispatch => {

        axios
        .post(ADD_PRODUCT_TYPE_URL, userInput)
        .then(response => {
             dispatch({type: ADD_PRODUCT_TYPE_SUCCESS})
               toast.success(
                      "Product added successfully!"
                  )
             dispatch(getAllProductType())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: ADD_PRODUCT_TYPE_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Remove product type by id
const removeProductType = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(PRODUCT_TYPE_URL + id + "/")
        .then(result => {

             toast.success(
                      "Order removed successfully!"
                  )
             dispatch({type: DELETE_PRODUCT_TYPE_SUCCESS
                       })
             dispatch(getAllProductType())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_PRODUCT_TYPE_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update product type by id
const updateProductType = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id


    axios
        .put(PRODUCT_TYPE_URL + id + "/", userInput)
        .then(result => {

             toast.success(
                      "Order updated successfully!"
                  )
             dispatch({type: UPDATE_PRODUCT_TYPE_SUCCESS
                       })

             dispatch(getAllProductType())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: UPDATE_PRODUCT_TYPE_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}




// Add product type
const addProductUnit = (userInput, redirectTo) => dispatch => {

        axios
        .post(ADD_PRODUCT_UNIT_URL, userInput)
        .then(response => {
             dispatch({type: ADD_PRODUCT_UNIT_SUCCESS})
               toast.success(
                      "Product added successfully!"
                  )
             dispatch(getAllProductUnit())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: ADD_PRODUCT_UNIT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Remove product type by id
const removeProductUnit = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(PRODUCT_UNIT_URL + id + "/")
        .then(result => {

             toast.success(
                      "Order removed successfully!"
                  )
             dispatch({type: DELETE_PRODUCT_UNIT_SUCCESS
                       })
             dispatch(getAllProductUnit())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_PRODUCT_UNIT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update product type by id
const updateProductUnit = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id


    axios
        .put(PRODUCT_UNIT_URL + id + "/", userInput)
        .then(result => {

             toast.success(
                      "Order updated successfully!"
                  )
             dispatch({type: UPDATE_PRODUCT_UNIT_SUCCESS
                       })

             dispatch(getAllProductUnit())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: UPDATE_PRODUCT_UNIT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Get all slider
const getAllSlider = (redirectTo) => dispatch =>{

    axios
        .get(IMAGE_SLIDER_GET_URL)
        .then(result => {
             dispatch({type: GET_ALL_SLIDER_SUCCESS,
                       payload: result.data})

             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: GET_ALL_SLIDER_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Add slider
const addSlider = (userInput, redirectTo) => dispatch => {

        const formData = new FormData();

        formData.append("image", userInput.image);

        axios
        .post(ADD_IMAGE_SLIDER_URL, formData)
        .then(response => {
             dispatch({type: ADD_SLIDER_SUCCESS})
               toast.success(
                      "Image slider added successfully!"
                  )
             dispatch(getAllSlider())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: ADD_SLIDER_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Remove slider
const removeSlider = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(IMAGE_SLIDER_URL + id + "/")
        .then(result => {

             toast.success(
                      "Image slider removed successfully!"
                  )
             dispatch({type: DELETE_SLIDER_SUCCESS
                       })
             dispatch(getAllSlider())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_SLIDER_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}
export default productAction;