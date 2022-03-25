import axios from "axios";
import i18next from "i18next";
import {useTranslation, withTranslation} from "react-i18next";
import { Translation } from 'react-i18next';

import {push} from "connected-react-router";
import {
 ADD_TO_CART_SUCCESS,
} from "./type";
import {toast} from "react-toastify";
import {ADD_TO_CART, CART_URL} from "../../utils/Constant";
import Typography from "@material-ui/core/Typography";
import React from "react";



const cartAction = (userInput, operation, redirectTo) => dispatch => {


        if( operation === ADD_TO_CART)
            dispatch(addToCart(userInput, redirectTo))

}


const translate = (key) => {

    // Translation object
    const { t } = useTranslation();
    return (
        <Translation>
            {
                (t, {i18n}) => <Typography>{t(key)}</Typography>
            }
        </Translation>
    )
}


// Add to cart
const addToCart = (userInput, redirectTo) => dispatch =>{

             dispatch({type: ADD_TO_CART_SUCCESS,
                       payload: userInput})

             // toast.success(translate("cart_action_product_added_successfully"));
             if(redirectTo !== CART_URL){
                 toast.success("Product added to cart");
             }

             else if(redirectTo === CART_URL){
                 toast.success("Product removed from cart");
             }


             // Keep the state permanent
              localStorage.setItem("cart", JSON.stringify(userInput))

             dispatch(push(redirectTo))
}


export default cartAction;