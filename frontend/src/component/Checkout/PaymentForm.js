import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {
    CHECKOUT_URL,
    CURRENCY,
    HOME_URL,
    STRIPE_PUB_KEY,
    SUBMIT_ORDER, UPDATE_ACTIVE_STATE,
    UPDATE_PAYMENT,
    UPDATE_SHIPPING
} from "../../utils/Constant";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import productAction from "../../redux/admin/product/productAction";
import cartAction from "../../redux/cart/cartAction";
import checkoutAction from "../../redux/checkout/checkoutAction";
import {useTranslation, withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

export let cardName;

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function PaymentForm(props) {

  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
      // Translation object
  const { t } = useTranslation();

    // Search product state
  const [name, setName]= React.useState(props.payment.card_name);

  const handleCardName = (e) => {

      setName(e.target.value);
  }

     // Handle real-time validation errors from the CardElement.
    const handleChange = (event) => {
      if (event.error) {
        setError(event.error.message);
      } else {
        setError(null);
      }
    }
  cardName = name;


  const handleNext = async () => {

      const card = elements.getElement(CardElement);

      const {paymentMethod, error} = await stripe.createPaymentMethod({
              type: 'card',
              card: card,
          });

      const userInput = {
              card_name: cardName,
              paymentMethod: paymentMethod.id
          }

      // store card element and name
      props.checkoutAction(userInput, UPDATE_PAYMENT, CHECKOUT_URL)

      // update step
      const activeStep = props.checkout.activeStep;
      props.checkoutAction(activeStep + 1, UPDATE_ACTIVE_STATE, CHECKOUT_URL);
  };

  const handleBack = () => {
    const activeStep  = props.checkout.activeStep;
    props.checkoutAction(activeStep - 1, UPDATE_ACTIVE_STATE, CHECKOUT_URL);
  };

  const activeStep  = props.checkout.activeStep;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("checkout.paymentMethod")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="name" name="name" label={t("checkout.nameOnCard")} fullWidth autoComplete="cc-name"
                     onChange={handleCardName} value={name}/>
        </Grid>
        <Grid item xs={12} >
           {/*<form  onSubmit={handleSubmit} className="stripe-form">*/}
               <CardElement id="card-element" onChange={handleChange}/>
                <div className="card-errors" role="alert">{error}</div>
           {/*</form>*/}

        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label={t("checkout.message.useThisCard")}
          />
        </Grid>
      </Grid>

        <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          {t("checkout.review.text.back")}
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {t("checkout.review.text.next")}
                      </Button>
        </div>
    </React.Fragment>
  );
}

PaymentForm.propTypes = {
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
export default connect(mapStateToProps, {productAction, cartAction, checkoutAction})(withTranslation() (withRouter(PaymentForm)));