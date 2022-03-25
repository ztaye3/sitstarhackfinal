import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import productAction from "../../redux/admin/product/productAction";
import cartAction from "../../redux/cart/cartAction";
import checkoutAction from "../../redux/checkout/checkoutAction";
import {withRouter} from "react-router-dom";
import {useTranslation, withTranslation} from "react-i18next";
import {useElements, useStripe} from "@stripe/react-stripe-js";
import {CHECKOUT_URL, CURRENCY, SUBMIT_ORDER} from "../../utils/Constant";
import {isEmptyUtils} from "../../utils/Utils";


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function Review(props) {
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();

  // Get carted product
  let products = props.products;
  let carts = props.cart;

  // get user
  let user = props.loginUser.user;

  // get total price
  const checkout = props.checkout

  // Translation object
  const { t } = useTranslation();

  // address information
  let addresses = [checkout.shippingData.address, checkout.shippingData.apartment, checkout.shippingData.zip_code,
                   checkout.shippingData.city, checkout.shippingData.state, checkout.shippingData.country];

  const payments = [
  // { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: checkout.payment.card_name },
  // { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  // { name: 'Expiry date', detail: '04/2024' },
  ];

  // component will unmount
  useEffect(() => {

      return async () => {

          // Send payment request
          const paymentMethod = checkout.payment.paymentMethod;

          // Declare json input for backend submit
          let userInput = [];

          // Add payment
          let payment = {};
          payment["id"] = !isEmptyUtils(JSON.stringify(paymentMethod)) ? paymentMethod : "";
          payment["amount"] = checkout.amountBought.total_price * 100;
          payment["email"] = checkout.shippingData.email
          payment["currency"] = CURRENCY
          payment["payment_method"] = ["card"]

          userInput[0] = payment;

          // Add order
          let order = {}

          order["description"] = "Cart transaction";
          order["total_cost"] = checkout.amountBought.total_price;
          order["email"] = checkout.shippingData.email
          order["payment_method"] = "card"
          order["amount"] = JSON.stringify(checkout.amountBought);

          userInput[1] = order

          // Add products
          let product = {}
          product["products"] = props.cart
          userInput[2] = product

          // add shipping
          userInput[3] = props.checkout.shippingData;

          props.checkoutAction(userInput, SUBMIT_ORDER, CHECKOUT_URL)



      }
      }, [])



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("checkout.review.text.orderSummary")}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
            carts.includes(product.code) &&  (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name[0][localStorage.getItem("i18nextLng")]} secondary={product.description} />

              {
                (user.is_merchant && user.is_activated) && (
                    <Typography variant="body2">{product.customer_price} fr.</Typography>

                  )
              }

              {
                !(user.is_merchant && user.is_activated) && (
                    <Typography variant="body2">{product.market_price} fr.</Typography>
                )
              }
          </ListItem>
        )))}
        <ListItem className={classes.listItem}>
          <ListItemText primary={t("checkout.review.text.total")} />
          <Typography variant="subtitle1" className={classes.total}>
            {checkout.amountBought.total_price} fr.
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {t("checkout.review.text.shipping")}
          </Typography>
          <Typography gutterBottom>{checkout.shippingData.first_name + "  " + checkout.shippingData.last_name}
          </Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {t("checkout.review.text.paymentDetails")}
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  productAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
  cartAction: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
    checkoutAction: PropTypes.func.isRequired,
    checkout: PropTypes.object.isRequired,
    payment: PropTypes.object.isRequired

}

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        products: state.productAdmin.products,
        cart: state.cart.cart,
        checkout: state.checkout,
        payment: state.checkout.payment
    }
}
export default connect(mapStateToProps, {productAction, cartAction, checkoutAction})(withTranslation() (withRouter(Review)));
