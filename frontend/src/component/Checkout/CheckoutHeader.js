import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import productAction from "../../redux/admin/product/productAction";
import cartAction from "../../redux/cart/cartAction";
import checkoutAction from "../../redux/checkout/checkoutAction";
import {withRouter} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import i18next from "i18next";
import {useTranslation, withTranslation} from "react-i18next";
import { Translation } from 'react-i18next';
import {CHECKOUT_URL, UPDATE_ACTIVE_STATE} from "../../utils/Constant";

function Copyright() {
          return (
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://zekariashirpo.com/">
                Zekarias Taye Hirpo
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          );
        }

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

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

function CheckoutHeader(props) {
  const classes = useStyles();


  const handleNext = () => {
    const activeStep  = props.checkout.activeStep;
    props.checkoutAction(activeStep + 1, UPDATE_ACTIVE_STATE, CHECKOUT_URL);
  };

  const handleBack = () => {
    const activeStep  = props.checkout.activeStep;
    props.checkoutAction(activeStep - 1, UPDATE_ACTIVE_STATE, CHECKOUT_URL);
  };

  const activeStep  = props.checkout.activeStep;

    // Translation object
  const { t } = useTranslation();

    const translate = (key) => {
      return (
          <Translation>
              {
                  (t, {i18n}) => <Typography>{t(key)}</Typography>
              }
          </Translation>
      )
  }

  let shippingAddress = translate("checkout_shipping_address");
  let paymentDetails = translate("checkout.review.text.paymentDetails");
  let reviewOrder = translate("checkout.reviewOrder");

  const steps = [shippingAddress, paymentDetails, reviewOrder];

    // get total price
  const checkout = props.checkout
  let orderNumber = checkout.order.id;

  return (
    <React.Fragment>
      <Grid style={{marginLeft: 200}}>
            <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                {t("cart_button_checkout")}
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      {t("checkout.review.text.thankYou")}
                    </Typography>
                    <Typography variant="subtitle1">
                      {t("checkout.review.text.thankYou.orderNumber", {orderNumber})}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    {
                      activeStep !== 1 && (
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
                              {activeStep === steps.length - 1 ? t("checkout.review.text.placeOrder") : t("checkout.review.text.next")}
                            </Button>
                          </div>
                      )
                    }

                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
            <Copyright />
          </main>
      </Grid>
    </React.Fragment>
  );
}

CheckoutHeader.propTypes = {
  productAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
  cartAction: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
    checkoutAction: PropTypes.func.isRequired,
    checkout: PropTypes.object.isRequired,

};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        products: state.productAdmin.products,
        cart: state.cart.cart,
        checkout: state.checkout
    }
}
export default connect(mapStateToProps, {productAction, cartAction, checkoutAction})(withTranslation() (withRouter(CheckoutHeader)));