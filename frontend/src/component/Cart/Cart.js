import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Content from "../../Dashboard/Content";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link as RouterLink, withRouter} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";
import productAction from "../../redux/admin/product/productAction";
import cartAction from "../../redux/cart/cartAction";
import {Translation, withTranslation} from "react-i18next";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import {
    ADD_TO_CART,
    CART_URL,
    HOME_URL,
    CURRENCY,
    STRIPE_PUB_KEY,
    CALL_CHECKOUT,
    CHECKOUT_URL, UPDATE_RATE, MANAGE_PRODUCT_URL
} from "../../utils/Constant";
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import {TextField} from "@material-ui/core";
import StripeCheckout from "react-stripe-checkout";
import checkoutAction from "../../redux/checkout/checkoutAction";
import {isEmptyUtils} from "../../utils/Utils";
import Footer from "../../utils/Footer";



const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0)
  },
  card: {
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
      paddingTop: theme.spacing(30),
    paddingBottom: theme.spacing(0),
  },
  textField: {
    width: '25ch',
  },
});

class Cart extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            valueOld: 2,
            hoverOld: -1,
            amount: {},
            currentAmount: [],
            rateValue: [],
            rateHover: [],
            cartProduct: [],
            lastIndex: 0,
            lastCode: ''
        }
    }

    // Add unit of amount bought
    addAmount = (code, price, index) => e => {

                    // Filter old input amount
            let amountOld = this.state.currentAmount;

            // Add the new amount at new index
            amountOld[index] =  e.target.value;

                        // Set state
            this.setState({
                    currentAmount: amountOld
            })

        if(!isEmptyUtils(e.target.value) && !isNaN(e.target.value)){


            // Get current input
            let value = parseFloat(e.target.value)


            // Calculate cost
            let productPrice = parseFloat(price)
            let totalCost = value * productPrice;

            // Get the old code: amount dictionary
            let oldAmount = this.state.amount;

            // Add/update the new value
            oldAmount[code] = totalCost;

            // Set state
            this.setState({
                    amount: oldAmount,
            })
            }

    }

        // Remove from cart
    removeFromCart = code => {

        // Capture previous carts
        let carts = this.props.cart;
        let index = carts.indexOf(code);

        if (index !== -1) {
          carts.splice(index, 1);
        }

        // Remove from cart
        this.props.cartAction(carts, ADD_TO_CART, CART_URL)
    }

    onChange = e => {

        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setValue = (newValue, index) =>{

        index = this.state.lastIndex;

        if(!(index === 0 && this.state.valueOld === newValue)){
            if(newValue !== -1 && newValue!== null) {
                let oldValue = this.state.rateValue;
                oldValue[index] = newValue;
                // Update backend rate
                let userInput = {
                    "code": this.state.lastCode,
                    "rate": newValue
                }
                this.props.productAction(userInput,UPDATE_RATE, CART_URL)
                this.setState({
                    rateValue: oldValue,
                    valueOld: newValue,
                })
        }
        }


    }

    setHover = (newValue, index, code) =>{

        // Todo: bug with index 0
        if(!(index === 0 && this.state.hoverOld === newValue)){
             if (newValue !== -1 && newValue !== null) {
                let oldHover = this.state.rateHover;
                oldHover[index] = newValue;

                this.setState({
                    rateHover: oldHover,
                    hoverOld: newValue,
                    lastIndex: index,
                    lastCode: code
                })
            }
        }

    }
    callCheckout = () => {

         this.props.checkoutAction(this.state.amount, CALL_CHECKOUT, CHECKOUT_URL)
    }

    componentDidMount() {
        if(!(typeof this.props.products !== 'undefined' && this.props.products.length > 0)){
            this.props.productAction(null, "getAllProduct", CART_URL)
        }
    }

    render() {
        const { classes } = this.props;
        const { t } = this.props;

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

        const translate = (key) => {
            return (
                <Translation>
                    {
                        (t, {i18n}) => <Typography>{t(key)}</Typography>
                    }
                </Translation>
            )
       }

        const labels = {
          0.5: translate("productlist_review_useless"),
          1: translate("productlist_review_useless_plus"),
          1.5: translate("productlist_review_poor"),
          2: translate("productlist_review_poor_plus"),
          2.5: translate("productlist_review_ok"),
          3: translate("productlist_review_ok_plus"),
          3.5: translate("productlist_review_good"),
          4: translate("productlist_review_good_plus"),
          4.5: translate("productlist_review_excellent"),
          5: translate("productlist_review_excellent_plus"),
        };

        // Get carted product
        // let products = this.props.products;
        // let carts = this.props.cart;



        let host = window.location.hostname;
        let user = this.props.loginUser.user;


        // Check dev and production host
        if(host === "localhost" || host === "0.0.0.0"){
            host = "http://" + host;
        }

        else {
            host = "https://" + host;
        }

        return (
        <div>
                        <Content>
                    <Container className={classes.cardGrid} maxWidth="xl">
                          {/* End hero unit */}
                          <Grid container spacing={5}>
                            {
                                this.props.cart.length !==0 && (
                                this.props.products.map((product, index) => (
                                 this.props.cart.includes(product.code) &&  (

                                    <Grid item key={product.name} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                          <CardMedia
                                            className={classes.cardMedia}
                                            image={host + product.image}
                                            title={product.description}
                                          />
                                          <CardContent className={classes.cardContent}>
                                            <Grid container wrap="nowrap" >
                                                 <Grid item xs>
                                                   <Typography gutterBottom variant="h5" component="h2">
                                                    {product.name[0][localStorage.getItem("i18nextLng")]}
                                                 </Typography>
                                                </Grid>
                                                <Grid item xl>
                                                    {
                                                        (user.is_merchant && user.is_activated) && (
                                                            <Typography  >
                                                                {product.customer_price} fr.
                                                            </Typography>
                                                        )
                                                    }

                                                    {
                                                        !(user.is_merchant && user.is_activated) && (
                                                            <Typography  >
                                                                {product.market_price} fr.
                                                            </Typography>
                                                        )
                                                    }
                                                </Grid>
                                            </Grid>
                                            <Grid container wrap="nowrap">
                                                <Grid item xs>
                                                    <Rating

                                                        name="hover-feedback"
                                                        value={this.state.rateValue[index] === undefined ?
                                                            product.rating_sum: this.state.rateValue[index]}
                                                        precision={0.5}
                                                        onChange={(event, newValue) => { // OnClick handler
                                                                      this.setValue(newValue, index);
                                                                    }}
                                                        onChangeActive={(event, newValue) => { // onHover handler
                                                                      this.setHover(newValue, index, product.code);
                                                                    }}
                                                      />
                                                      {this.state.rateHover[index] !== undefined && <Box ml={2}>
                                                          {labels[this.state.rateHover[index] !== undefined ?
                                                              this.state.rateHover[index] : this.state.rateValue[index]]}</Box>}
                                                </Grid>

                                                <Grid item xl>
                                                    <TextField
                                                              onChange={this.addAmount(product.code,
                                                                  (user.is_merchant && user.is_activated) ? product.customer_price : product.market_price, index)}
                                                              placeholder={"1"}
                                                              label={t("cart_text_unit")}
                                                              name="currentAmount"
                                                              id="currentAmount"
                                                              value={this.state.currentAmount[index]}
                                                              className={clsx(classes.margin, classes.textField)}
                                                              InputProps={{
                                                                startAdornment: <InputAdornment position="start">{product.product_unit[0].name}</InputAdornment>,
                                                              }}
                                                            />
                                                </Grid>
                                            </Grid>
                                          </CardContent>
                                          <CardActions>

                                            <Button
                                              color={"primary"}
                                              style={{color: "red"}}
                                              variant="outlined"
                                              component={RouterLink}
                                              onClick={()=>this.removeFromCart(product.code)}
                                              fullWidth
                                            >
                                              <Typography>{t('cart_button_remove')}</Typography>
                                            </Button>
                                          </CardActions>
                                        </Card>
                              </Grid>
                                ))))}</Grid>

                    </Container>


                {
                    this.props.cart.length > 0 && (
                                    <Grid container wrap="nowrap"  spacing={3} justify={"center"}>
                                            <Grid item>
                                                <Button
                                                              color="primary"
                                                              variant="outlined"
                                                              component={RouterLink}
                                                              to={HOME_URL}
                                                              fullWidth
                                                            >
                                                            <Typography>{t('cart_button_keep_shopping')}</Typography>
                                                </Button>
                                            </Grid>

                                           <Grid item>
                                                 <Button
                                                              color="primary"
                                                              style={{color: "green"}}
                                                              variant="outlined"
                                                              component={RouterLink}
                                                              onClick={()=>this.callCheckout()}
                                                              fullWidth
                                                            >
                                                            <Typography>{t('cart_button_checkout')}</Typography>
                                                </Button>
                                           </Grid>

                                    </Grid>
                    )
                }
                      <footer className={classes.footer}>
                        <Footer/>
                      </footer>
            </Content>
        </div>
        );
    }
}

Cart.propTypes = {
  productAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
  cartAction: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  checkoutAction: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        products: state.productAdmin.products,
        cart: state.cart.cart
    }
}
export default connect(mapStateToProps, {productAction, cartAction, checkoutAction})(withTranslation()(withStyles(styles) (withRouter(Cart))));
