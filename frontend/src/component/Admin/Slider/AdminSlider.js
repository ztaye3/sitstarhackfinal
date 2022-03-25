import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Content from "../../../Dashboard/Content";
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
import productAction from "../../../redux/admin/product/productAction";
import cartAction from "../../../redux/cart/cartAction";
import {Translation, withTranslation} from "react-i18next";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {isMobile} from "react-device-detect";
import ListItemText from "@material-ui/core/ListItemText";
import {
    ADD_TO_CART,
    CART_URL,
    HOME_URL,
    CURRENCY,
    STRIPE_PUB_KEY,
    CALL_CHECKOUT,
    CHECKOUT_URL,
    UPDATE_RATE,
    MANAGE_PRODUCT_URL,
    GET_SLIDER,
    MANAGE_SLIDER_URL,
    DELETE_SLIDER,
    ADD_SLIDER_URL,
    MANAGE_ADD_PRODUCT_UNIT_URL
} from "../../../utils/Constant";
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import {TextField} from "@material-ui/core";
import StripeCheckout from "react-stripe-checkout";
import checkoutAction from "../../../redux/checkout/checkoutAction";
import {isEmptyUtils} from "../../../utils/Utils";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import background from "../../../static/background/sefed-beckground.jpg";



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
    padding: theme.spacing(6),
  },
  textField: {
    width: '25ch',
  },
   image: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar2: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  avatar3: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

 formControl: {
        marginTop: theme.spacing(2),

  },
 headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(100%)",
    top: "-70px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    width: "330px",
    justifyContent: "space-between",
    marginRight: 0,
  },
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  MenuItem: {
        color: "textSecondary",
        fontSize: "100%"
  }
});

class AdminSlider extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {

        }
    }


    componentDidMount() {
        this.props.productAction(null, GET_SLIDER, MANAGE_SLIDER_URL)
    }

    onChange = e => {

        const target = e.target;
        const  value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });

        // Set image
       if(e.target.files != null){
            this.setState({
          image: e.target.files[0],
          imagePreview: URL.createObjectURL(e.target.files[0]),

        });
        }
    }



    removeSlide = id => {
        let data = {
            'id': id
        }
       this.props.productAction(data, DELETE_SLIDER, MANAGE_SLIDER_URL)
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


        let host = window.location.hostname;


        // Check dev and production host
        if(host === "localhost" || host === "0.0.0.0"){
            host = "http://" + host;
        }

        else {
            host = "https://" + host;
        }

        return (
            <Content>
                  <div
                    style={{
                      height: "200px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      filter: "contrast(75%)",
                      backgroundImage: "url(/img/wallpaper.jpeg)",
                    }}
                  />
                  <div className={classes.headerContainer}>
                    <div className={classes.header}>
                      <Avatar
                        alt={"Admin"}
                        src={this.props.loginUser.user.profile_picture}
                        classes={{ root: classes.avatar, circle: classes.circle }}
                      />
                      <Typography variant={"h5"}>{this.props.loginUser.user.first_name}</Typography>
                      <Chip variant={"outlined"} icon={<SupervisorAccountIcon />} label={t("admin.admin")} />
                      {!isMobile && (<Rating name="read-only" value={4.3} readOnly />)}
                      <div className={classes.spacer} />
                    </div>
                  </div>
                <Grid container justify="flex-end">
                     <Button
                      color="primary"
                      variant="contained"
                      startIcon={<PersonAddIcon />}
                      href={ADD_SLIDER_URL}
                    >
                      {t("admin.addPhoto")}
                    </Button>
                </Grid>

                <div style={{ maxWidth: "100%" }}>

                    <Container className={classes.cardGrid} maxWidth="xl">
                          {/* End hero unit */}
                          <Grid container spacing={5}>
                            {this.props.slider.map((slid, index) => (

                                    <Grid item key={slid.id} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                          <CardMedia
                                            className={classes.cardMedia}
                                            image={host + slid.image}
                                            title={"product.description"}
                                          />
                                          <CardContent className={classes.cardContent}>
                                            <Grid container wrap="nowrap" >
                                                 <Grid item xs>
                                                   <Typography gutterBottom variant="h5" component="h2">

                                                 </Typography>
                                                </Grid>

                                            </Grid>
                                          </CardContent>
                                          <CardActions>

                                            <Button
                                              color={"primary"}
                                              style={{color: "red"}}
                                              variant="outlined"
                                              component={RouterLink}
                                              onClick={()=>this.removeSlide(slid.id)}
                                              fullWidth
                                            >
                                              <Typography>{t('cart_button_remove')}</Typography>
                                            </Button>
                                          </CardActions>
                                        </Card>
                              </Grid>
                                ))}</Grid>

                    </Container>
                </div>
                      <footer className={classes.footer}>
                        <Copyright />
                      </footer>
            </Content>
        );
    }
}

AdminSlider.propTypes = {
  productAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
  cartAction: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  checkoutAction: PropTypes.func.isRequired,
  slider: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        products: state.productAdmin.products,
        cart: state.cart.cart,
        slider: state.productAdmin.slider,
    }
}
export default connect(mapStateToProps, {productAction, cartAction, checkoutAction})(withTranslation()(withStyles(styles) (withRouter(AdminSlider))));
