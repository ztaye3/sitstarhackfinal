import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import i18next from "i18next";
import {useTranslation, withTranslation} from "react-i18next";
import { Translation } from 'react-i18next';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import productAction from "../../redux/admin/product/productAction";
import cartAction from "../../redux/cart/cartAction";
import checkoutAction from "../../redux/checkout/checkoutAction";
import {withRouter} from "react-router-dom";
import {isEmptyUtils} from "../../utils/Utils";
import {CHECKOUT_URL, UPDATE_SHIPPING} from "../../utils/Constant";

class AddressForm extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            first_name: this.props.shipping.first_name,
            last_name: this.props.shipping.last_name,
            address: this.props.shipping.address,
            apartment: this.props.shipping.apartment,
            zip_code: this.props.shipping.zip_code,
            phone: this.props.shipping.phone,
            email: this.props.shipping.email,
            city: this.props.shipping.city,
            country: this.props.shipping.country,
            state: this.props.shipping.state

        }
    }

    componentWillUnmount () {
        this.props.checkoutAction(this.state, UPDATE_SHIPPING, CHECKOUT_URL)
    }

    onChange = e => {

        e.preventDefault();
        const target = e.target;
        const  value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });

    }

    render() {
      // Translation object
      const { t } = this.props;

      const translate = (key) => {
        return (
            <Translation>
                {
                    (t, {i18n}) => <Typography>{t(key)}</Typography>
                }
            </Translation>
    )
}

      return (

                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    {t("checkout_shipping_address")}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="first_name"
                        name="first_name"
                        label={t("checkout.firstName")}
                        fullWidth
                        autoComplete="given-name"
                        onChange={this.onChange}
                        value={this.state.first_name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="last_name"
                        name="last_name"
                        label={t("checkout.lastName")}
                        fullWidth
                        autoComplete="family-name"
                        onChange={this.onChange}
                        value={this.state.last_name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="address"
                        name="address"
                        label={t("checkout.addressLine")}
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={this.onChange}
                        value={this.state.address}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="apartment"
                        name="apartment"
                        label={t("checkout.apartment")}
                        fullWidth
                        autoComplete="shipping address-line2"
                        onChange={this.onChange}
                        value={this.state.apartment}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label={t("checkout.city")}
                        fullWidth
                        autoComplete="shipping address-level2"
                        onChange={this.onChange}
                        value={this.state.city}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label={t("checkout.state")}
                            fullWidth
                            autoComplete="shipping state"
                            onChange={this.onChange}
                            value={this.state.state}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="zip_code"
                        name="zip_code"
                        label={t("checkout.zip")}
                        fullWidth
                        autoComplete="shipping postal-code"
                        onChange={this.onChange}
                        value={this.state.zip_code}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="country"
                        name="country"
                        label={t("checkout.country")}
                        fullWidth
                        autoComplete="shipping country"
                        onChange={this.onChange}
                        value={this.state.country}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="phone"
                        name="phone"
                        label={t("checkout.phone")}
                        fullWidth
                        autoComplete="phone number"
                        onChange={this.onChange}
                        value={this.state.phone}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label={t("checkout.email")}
                        fullWidth
                        autoComplete="email address"
                        onChange={this.onChange}
                        value={this.state.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label={t("checkout.message.useThisAddress")}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>

          );
  }
}

AddressForm.propTypes = {
  productAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
  cartAction: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
    checkoutAction: PropTypes.func.isRequired,
    checkout: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired,

};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        products: state.productAdmin.products,
        cart: state.cart.cart,
        checkout: state.checkout,
        shipping: state.checkout.shippingData
    }
}
export default connect(mapStateToProps, {productAction, cartAction, checkoutAction})(withTranslation() (withRouter(AddressForm)));
