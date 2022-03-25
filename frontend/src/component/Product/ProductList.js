import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import {Link as RouterLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Translation, withTranslation} from "react-i18next";
import Content from "../../Dashboard/Content";
import Button from "@material-ui/core/Button";
import  '../../static/style/css/overrides.css'
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import productAction from "../../redux/admin/product/productAction";
import {ADD_TO_CART, CATEGORY_URL, HOME_URL, UPDATE_RATE} from "../../utils/Constant";
import cartAction from "../../redux/cart/cartAction";





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
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueOld: 2,
            hoverOld: -1,
            rateValue: [],
            rateHover: [],
            lastIndex: 0,
            lastCode: ''
        }
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
                this.props.productAction(userInput,UPDATE_RATE, HOME_URL)
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


    // Add to cart
    addToCart = code => {

        // Capture previous carts
        let carts = this.props.cart;

        // Add the new cart
        if(!carts.includes(code))
            carts.push(code)
            this.props.cartAction(carts, ADD_TO_CART, HOME_URL)
    }

    componentDidMount() {
        this.props.productAction(null, "getAllProduct", HOME_URL)
    }
    render() {

        const { classes } = this.props;
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

        let products = this.props.products;
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

                    <Container className={classes.cardGrid} maxWidth="xl">
                          {/* End hero unit */}
                          <Grid container spacing={5}>
                            {products.map((product, index) => (
                              <Grid item key={product.name} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                  <CardMedia
                                    className={classes.cardMedia}
                                    image={host + product.image}
                                    title= {product.description}
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

                                    <Grid container alignItems={"center"}>
                                        <Rating
                                        name="hover-feedback"
                                        value={this.state.rateValue[index] === undefined ?
                                                            product.rating_sum: this.state.rateValue[index]}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                                      this.setValue(newValue, index);
                                                    }}
                                        onChangeActive={(event, newValue) => {
                                                      this.setHover(newValue, index, product.code);
                                                    }}
                                      />
                                        {this.state.rateHover[index] !== undefined && <Box ml={2}>
                                            {labels[this.state.rateHover[index] !== undefined ?
                                                this.state.rateHover[index] : this.state.rateValue[index]]}</Box>}
                                    </Grid>
                                  </CardContent>
                                  <CardActions>
                                    <Button
                                      color="secondary"
                                      variant="outlined"
                                      component={RouterLink}
                                      onClick={()=>this.addToCart(product.code)}
                                      fullWidth
                                    >
                                      <Typography>{t('productlist_button_addToCart')}</Typography>
                                    </Button>
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                    </Container>
            </div>
        );
    }
}

ProductList.propTypes = {
  productAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
  cartAction: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        products: state.productAdmin.products,
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps, {productAction, cartAction})(withTranslation()(withStyles(styles) (withRouter(ProductList))));
