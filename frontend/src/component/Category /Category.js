import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Translation, withTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
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
import {withStyles} from "@material-ui/core/styles";
import Content from "../../Dashboard/Content";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { BiDrink } from 'react-icons/bi';
import { GiTravelDress } from 'react-icons/gi';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import categoryAction from "../../redux/product/category/categoryAction";
import {
    ADD_TO_CART, CART_URL,
    CATEGORY_URL,
    GET_PRODUCT_BY_CATEGORY,
    GET_PRODUCT_BY_NAME, GET_PRODUCT_TYPE, HOME_URL, MANAGE_PRODUCT_TYPE_URL, PRODUCT_CATEGORY_FOUR,
    PRODUCT_CATEGORY_ONE, PRODUCT_CATEGORY_THREE,
    PRODUCT_CATEGORY_TWO, SEARCH_BY_CATEGORY_DEFAULT, UPDATE_RATE
} from "../../utils/Constant";
import Link from "@material-ui/core/Link";
import {Copyright} from "../../utils/StyleUtil";
import cartAction from "../../redux/cart/cartAction";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, NativeSelect} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import Footer from "../../utils/Footer";
import {isEmptyUtils} from "../../utils/Utils";


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
});

class Category extends Component {

    constructor(props) {
        super(props);
        this.state= {
            buttonNav: this.props.productCategory.isSearchByCategory ? 0: "",
            valueOld: 2,
            hoverOld: -1,
            rateValue: [],
            rateHover: [],
            lastCode: '',
            lastIndex: 0,
            selectCategory: ''

        }
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
                this.props.productAction(userInput,UPDATE_RATE, CATEGORY_URL)
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
            this.props.cartAction(carts, ADD_TO_CART, CATEGORY_URL)
    }



    getProductByCategory = (e) => {

        const target = e.target;
        const  value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });

         const userLanguage = localStorage.getItem("i18nextLng");

         let userInput = {
                        category : value,
                        locale : userLanguage
                        }

        this.props.categoryAction(userInput, GET_PRODUCT_BY_CATEGORY, CATEGORY_URL)
    }

    getProductByName = (productName) => {
        let userInput = {
                        name : productName
                        }

        this.props.categoryAction(userInput, GET_PRODUCT_BY_NAME, CATEGORY_URL)
    }

    componentDidMount() {

        // Search by category if search by name is "false"
        if(this.props.productCategory.isSearchByCategory){
        this.props.categoryAction(SEARCH_BY_CATEGORY_DEFAULT, GET_PRODUCT_BY_CATEGORY, CATEGORY_URL)
        }

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

        // Check if product is searched by category or name
        let isSearchByCategory = this.props.productCategory.isSearchByCategory;
        let productByCategory = this.props.productCategory.productByCategory;
        let productByName = this.props.productCategory.productByName;
        let products =  isSearchByCategory ? productByCategory : productByName;

        // Define host
        let host = window.location.hostname;
        let user = this.props.loginUser.user;



        // Check dev and production host
        if(host === "localhost" || host === "0.0.0.0"){
            host = "http://" + host;
        }

        else {
            host = "https://" + host;
        }

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

        return (
            <div>
                <Content>
                    <FormControl className={classes.formControl}>
                                <NativeSelect
                                    value={this.state.selectCategory}
                                  onChange={this.getProductByCategory}
                                  name="selectCategory"
                                  defaultValue={this.state.selectCategory}
                                  inputProps={{
                                    name: 'selectCategory',
                                    id: 'uncontrolled-native',
                                  }}
                                >
                                    {
                                        this.props.productType.map((productType, index) => (
                                            <option value={productType[localStorage.getItem("i18nextLng")]}>{productType[localStorage.getItem("i18nextLng")]}</option>
                                            ))
                                    }

                                </NativeSelect>
                                <FormHelperText>Categories</FormHelperText>
                    </FormControl>
                    {
                        (!isSearchByCategory && (productByName.length === 0)) && (
                            <Grid justify={"center"} style={{marginLeft: "40%", marginTop: "10%"}}>
                                <Typography variant="h5" component="h5" color={"secondary"}>
                                    {t("category_text_error_productDoesnNotExists")}
                                </Typography>
                            </Grid>
                        )
                    }

                       <Container className={classes.cardGrid} maxWidth="xl">
                          {/* End hero unit */}
                          <Grid container spacing={5}>
                            {
                                products !== "" ? products.map((product, index) => (
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
                            )) : ""}
                          </Grid>
                    </Container>
                      <footer className={classes.footer}>
                        <Footer/>
                      </footer>
                </Content>


            </div>
        );
    }
}

Category.propTypes = {
  categoryAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
  cartAction: PropTypes.func.isRequired,
    productAction: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
    productType: PropTypes.object.isRequired,
    productCategory: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        productCategory: state.productCategory,
        cart: state.cart.cart,
        productType: state.productAdmin.productType
    }
}


export default connect(mapStateToProps, {categoryAction, cartAction, productAction})(withTranslation()(withStyles(styles) (withRouter(Category))));

