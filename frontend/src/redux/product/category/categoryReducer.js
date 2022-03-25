import {
    GET_PRODUCT_BY_CATEGORY_SUCCESS,
    GET_PRODUCT_BY_CATEGORY_FAIL,
    GET_PRODUCT_BY_NAME_SUCCESS,
    GET_PRODUCT_BY_NAME_FAIL, UPDATE_RATE_SUCCESS, UPDATE_RATE_FAIL,
} from "./type";



const initialState = {
    productByCategory:[]
    ,
    productByName: []
    ,
    isSearchByCategory: true
}

const categoryReducer = (state =initialState, action) => {
    switch (action.type){

        case GET_PRODUCT_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                productByCategory: action.payload,
                isSearchByCategory: true
            }
        case GET_PRODUCT_BY_CATEGORY_FAIL:
            return {
                ...state
            }
        case GET_PRODUCT_BY_NAME_SUCCESS:
            return {
                ...state,
                productByName: action.payload,
                isSearchByCategory: false
            }
        case GET_PRODUCT_BY_NAME_FAIL:
            return {
                ...state,
                isSearchByCategory: false
            }
        default:
            return state
    }
}

export default categoryReducer;