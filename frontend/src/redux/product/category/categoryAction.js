import axios from "axios";
import {
    ADD_PRODUCT_URL,
    GET_PRODUCT_BY_CATEGORY,
    GET_PRODUCT_BY_NAME, NO_DISPATCH, PRODUCT_BY_CATEGORY_URL,
    PRODUCT_BY_NAME_URL, PRODUCT_TYPE_GET_URL, PRODUCT_UNIT_GET_URL,
    PRODUCT_URL, SEARCH_BY_CATEGORY_DEFAULT, UPDATE_RATE, UPDATE_RATE_URL
} from "../../../utils/Constant";
import {push} from "connected-react-router";
import {
    GET_PRODUCT_BY_CATEGORY_SUCCESS,
    GET_PRODUCT_BY_CATEGORY_FAIL,
    GET_PRODUCT_BY_NAME_SUCCESS,
    GET_PRODUCT_BY_NAME_FAIL, UPDATE_RATE_SUCCESS,
} from "./type";
import {toast} from "react-toastify";
import {errorFilter} from "../../../utils/Utils";
import {
    GET_ALL_PRODUCT_TYPE_FAIL,
    GET_ALL_PRODUCT_TYPE_SUCCESS,
    GET_ALL_PRODUCT_UNIT_FAIL,
    GET_ALL_PRODUCT_UNIT_SUCCESS
} from "../../admin/product/type";

const categoryAction = (userInput, operation, redirectTo) => dispatch => {


        if( operation === GET_PRODUCT_BY_CATEGORY)
            dispatch(getProductByCategory(userInput, redirectTo))
        else if( operation === GET_PRODUCT_BY_NAME)
            dispatch(getProductByName(userInput, redirectTo))
}

// Get product by category
const getProductByCategory = (userInput, redirectTo) => dispatch =>{

    // check if it's default request
    if(userInput === SEARCH_BY_CATEGORY_DEFAULT){

        // get product type
            axios
                .get(PRODUCT_TYPE_GET_URL)
                .then(result => {
                    dispatch({type: GET_ALL_PRODUCT_TYPE_SUCCESS,
                               payload: result.data})

                             let locale = localStorage.getItem("i18nextLng");
                             userInput = {
                                locale: locale,
                                category :  getLocaleCategory(result.data[0], locale)
                             }

                    dispatch(getProductByCategoriesDetail(userInput, redirectTo))
                })
                .catch(error => {
                     dispatch({type: GET_ALL_PRODUCT_TYPE_FAIL})
                     errorFilter(error)
                     dispatch(push(redirectTo))
                })
    }

    else {
        dispatch(getProductByCategoriesDetail(userInput, redirectTo))
    }

}

// locale return
const getLocaleCategory = (data, userLanguage) => {
        let placeholder;

        if (userLanguage === "en")
            placeholder =  data.en;
        else if (userLanguage ==="fr")
            placeholder =  data.fr;
        else if (userLanguage === "de")
            placeholder = data.de;
        else if (userLanguage === "am")
            placeholder = data.am;
        else if (userLanguage === "ti")
            placeholder = data.ti;
        else if (userLanguage ==="it")
            placeholder = data.it;
        else if (userLanguage ==="ar")
            placeholder = data.ar;
        else
            placeholder = data.de;

        return placeholder;

}
// details
const getProductByCategoriesDetail = (userInput, redirectTo) => dispatch => {

        axios
        .post(PRODUCT_BY_CATEGORY_URL, userInput)
        .then(result => {
             dispatch({type: GET_PRODUCT_BY_CATEGORY_SUCCESS,
                       payload: result.data})

             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: GET_PRODUCT_BY_CATEGORY_FAIL})
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

// Get product by name
const getProductByName = (userInput, redirectTo) => dispatch =>{

    axios
        .post(PRODUCT_BY_NAME_URL, userInput)
        .then(result => {
             dispatch({type: GET_PRODUCT_BY_NAME_SUCCESS,
                       payload: result.data})

             dispatch(getAllProductType(NO_DISPATCH))
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: GET_PRODUCT_BY_NAME_SUCCESS,
                       payload: []})

             dispatch(getAllProductType(NO_DISPATCH))
             dispatch(push(redirectTo))
        })
}



export default categoryAction;