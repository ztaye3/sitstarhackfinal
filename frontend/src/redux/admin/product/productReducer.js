import {
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS, ADD_SLIDER_FAIL, ADD_SLIDER_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_TYPE_FAIL,
    DELETE_PRODUCT_TYPE_SUCCESS,
    DELETE_PRODUCT_UNIT_FAIL,
    DELETE_PRODUCT_UNIT_SUCCESS, DELETE_SLIDER_FAIL, DELETE_SLIDER_SUCCESS,
    GET_ALL_PRODUCT_FAIL,
    GET_ALL_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_TYPE_SUCCESS,
    GET_ALL_PRODUCT_UNIT_SUCCESS, GET_ALL_SLIDER_FAIL, GET_ALL_SLIDER_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_TYPE_FAIL,
    UPDATE_PRODUCT_TYPE_SUCCESS, UPDATE_PRODUCT_UNIT_FAIL, UPDATE_PRODUCT_UNIT_SUCCESS
} from "./type";
import {UPDATE_RATE_FAIL, UPDATE_RATE_SUCCESS} from "../../product/category/type";
import {GET_PRODUCT_TYPE, GET_PRODUCT_UNIT} from "../../../utils/Constant";



const initialState = {
    productAdded: false,
    products:[
    ]
    ,
    deleteProduct: false,
    updateProduct: false,
    productType: [],
    productUnit: [],
    slider: []
}

const productReducer = (state =initialState, action) => {
    switch (action.type){
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                productAdded: true
            }
        case ADD_PRODUCT_FAIL:
        case GET_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload
            }
        case GET_ALL_PRODUCT_FAIL:
            return {
                ...state
            }
        case GET_ALL_PRODUCT_TYPE_SUCCESS:
                return {
                    ...state,
                    productType: action.payload
                }
        case GET_ALL_PRODUCT_UNIT_SUCCESS:
            return {
                ...state,
                productUnit: action.payload
            }
            case GET_ALL_SLIDER_SUCCESS:
            return {
                ...state,
                slider: action.payload
            }

        case GET_ALL_SLIDER_FAIL:
        case DELETE_SLIDER_SUCCESS:
        case DELETE_SLIDER_FAIL:
        case ADD_SLIDER_SUCCESS:
        case ADD_SLIDER_FAIL:
        case DELETE_PRODUCT_FAIL:
        case DELETE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_FAIL:
        case UPDATE_RATE_SUCCESS:
        case UPDATE_RATE_FAIL:
        case DELETE_PRODUCT_TYPE_SUCCESS:
        case DELETE_PRODUCT_TYPE_FAIL:
        case UPDATE_PRODUCT_TYPE_SUCCESS:
        case UPDATE_PRODUCT_TYPE_FAIL:
        case DELETE_PRODUCT_UNIT_SUCCESS:
        case DELETE_PRODUCT_UNIT_FAIL:
        case UPDATE_PRODUCT_UNIT_SUCCESS:
        case UPDATE_PRODUCT_UNIT_FAIL:
        default:
            return state
    }
}

export default productReducer;