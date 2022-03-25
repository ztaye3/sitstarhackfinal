import {makeStyles, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Content from "../../Dashboard/Content";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import  '../../static/style/css/overrides.css'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { withTranslation } from 'react-i18next';
import ProductList from "../Product/ProductList";
import {
    CATEGORY_URL,
    GET_PRODUCT_BY_CATEGORY,
    GET_PRODUCT_TYPE,
    GET_SLIDER,
    HOME_URL,
    MANAGE_SLIDER_URL
} from "../../utils/Constant";
import productAction from "../../redux/admin/product/productAction";
import Footer from "../../utils/Footer";






const styles = theme => ({
    root: {
    marginTop: theme.spacing(0),
    flexGrow: 0,
    overflow: 'hidden',
  },
  paper: {
    // maxWidth: '100%',
    padding: theme.spacing(2),
    variant: 'outlined',
    outlined: 'none'
  },
  formControl: {
        marginTop: theme.spacing(2),

  },
  selectEmpty: {
  },
  MenuItem: {
        color: "textSecondary",
        fontSize: "80%"
  }
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headline: '',
            body: '',
            updated_by: localStorage.getItem("signupEmail"),
            image: null,
            imagePreview: null,
            audio: null,
            audioPreview: null,
            video: null,
            videoPreview: null,
        }

    }

    componentDidMount() {
        this.props.productAction(null, GET_SLIDER, HOME_URL)
    }

     setFiles = (id, file) => {


        switch (id) {
            case "contained-button-photo": {
                this.setState({
                    image: file,
                    imagePreview: URL.createObjectURL(file),

                });

            }

            case "contained-button-video": {
                this.setState({
                    video: file,
                    videoPreview: URL.createObjectURL(file),

                });
            }

            case "contained-button-audio": {
                this.setState({
                    audio: file,
                    audioPreview: URL.createObjectURL(file),

                });
            }

            default:{

            }

        }
    }

     onChange = e => {

        e.preventDefault();

        this.setState({
            [e.target.name]:e.target.value
        })

        // Set image
       if(e.target.files != null){

        // Get the file Id
        let id = e.target.id;

        // Get the actual file itself
        let file = e.target.files[0];

           this.setFiles(id, file)
        }
    }


    render() {
        const { t } = this.props;
        const flexContainer = {
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 0 ,
        };

        // Function that will return range
        function rangeFunction(start, end) {
                  return Array.apply(0, Array(end - 1))
                    .map((element, index) => index + start);
                }

        const { classes } = this.props;

        const range = [rangeFunction(1, 8)]

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

        let host = window.location.hostname;


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

                    <Carousel autoPlay interval={7000} showThumbs={false} infiniteLoop={true} centerMode={true} transitionTime={1500} stopOnHover={false} preventMovementUntilSwipeScrollTolerance={false}>
                    {
                       this.props.slider.length > 0 && (
                        this.props.slider.map((slid, index) => (
                        <div>
                            <img src={host + slid.image} />
                                <div className="content">
                                    <h1>{t("home_slider_typography_text_supply")}</h1>
                                    <Button  style={{backgroundColor: "orange", color: "white", width: "10%"}}>
                                        <Typography>{t("home_slider_typography_button_order")}</Typography>
                                                  </Button>
                                </div>
                            </div>
                        ))
                       )
                    }
                    </Carousel>

                    <table>
                      <tr>
                        <th scope="col" class={"table-border"}>
                            <Grid container wrap="nowrap"  spacing={3}>
                                <Grid item>
                                    <LocalShippingIcon color={"primary"} fontSize="large"/>
                                </Grid>

                                <Grid item >
                                    <Typography  style={{ fontWeight: 600 }}>
                                        {t("home_slider_typography_freeShipping")}</Typography>
                                        <Typography>{t("home_slider_typography_freeShipping_sup")}</Typography>
                                </Grid>
                            </Grid>

                        </th>

                        <th scope="col" class={"table-top-border"}>

                            <Grid container wrap="nowrap"  spacing={3}>
                                <Grid item>
                                    <PermPhoneMsgIcon color={"primary"} fontSize="large"/>
                                </Grid>

                                <Grid item >
                                    <Typography  style={{ fontWeight: 600 }}>
                                        {t("home_slider_typography_support")}</Typography>
                                        <Typography>{t("home_slider_typography_support_sup")}</Typography>
                                </Grid>
                            </Grid>

                        </th>

                        <th scope="col" class={"table-top-border"}>
                            <Grid container wrap="nowrap"  spacing={3}>
                                <Grid item>
                                    <VpnLockIcon color={"primary"} fontSize="large"/>
                                </Grid>

                                <Grid item >
                                    <Typography  style={{ fontWeight: 600 }}>
                                        {t("home_slider_typography_safety")}</Typography>
                                        <Typography>{t("home_slider_typography_safety_sup")}</Typography>
                                </Grid>
                            </Grid>

                        </th>
                        <th scope="col" class={"table-top-border"}>

                            <Grid container wrap="nowrap"  spacing={3}>
                                <Grid item>
                                    <WhatshotIcon color={"primary"} fontSize="large"/>
                                </Grid>

                                <Grid item >
                                    <Typography  style={{ fontWeight: 600 }}>
                                        {t("home_slider_typography_offers")}</Typography>
                                        <Typography>{t("home_slider_typography_offers_sup")}</Typography>
                                </Grid>
                            </Grid>

                        </th>
                      </tr>
                    </table>

                     <ProductList/>


                  <Footer />
                  </Content>





            </div>
        );

    }
}

Home.propTypes = {
  loginUser: PropTypes.object.isRequired,
    productAction: PropTypes.func.isRequired,
    slider: PropTypes.object.isRequired,

};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        slider: state.productAdmin.slider,
    }
}

export default connect(mapStateToProps, {productAction})(withTranslation()(withStyles(styles) (withRouter(Home))));



