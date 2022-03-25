import React, {Component} from 'react';
import {useParams, withRouter} from "react-router-dom";
import Content from "../../Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DriveIcon from "@material-ui/icons/DriveEta";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import {connect, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import productAction from "../../redux/admin/product/productAction";
import {Translation, withTranslation} from "react-i18next";
import Link from "@material-ui/core/Link";
import MaterialTable from "material-table";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import {InputLabel, ListItem, MenuItem, NativeSelect, Select, TextareaAutosize} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Copyright} from "../../utils/StyleUtil";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CardContent from "@material-ui/core/CardContent";
import background from '../../static/background/sefed-beckground.jpg'
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import {
    ADD_PRODUCT,
    CATEGORY_URL,
    GET_PRODUCT_BY_CATEGORY,
    GET_PRODUCT_UNIT_TYPE,
    MANAGE_PRODUCT_URL
} from "../../utils/Constant";
import FormHelperText from "@material-ui/core/FormHelperText";
import {isEmptyUtils} from "../../utils/Utils";
import {isMobile} from "react-device-detect";




const styles = theme => ({

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

class AddProduct extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            en : "",
            de : "",
            ti : "",
            it : "",
            fr : "",
            am : "",
            ar : "",
            description : "",
            image: null,
            created_by : "",
            updated_by : "",
            product_type : null,
            product_status : "",
            market_price: "",
            customer_price: "",
            imagePreview: null,
            product_unit: null
        }
    }

    componentDidMount() {

        this.props.productAction(null, GET_PRODUCT_UNIT_TYPE, ADD_PRODUCT)

    }
    onChange = e => {

        e.preventDefault();
        const target = e.target;
        const  value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value });

        // Set image
       if(e.target.files != null){
            this.setState({
          image: e.target.files[0],
          imagePreview: URL.createObjectURL(e.target.files[0]),

        });
        }
    }

    onAddProduct = () => {

        // if product type or unit are empty
        let productType = this.props.productType[0][localStorage.getItem("i18nextLng")];
        let productUnit = this.props.productUnit[0].name;

        const userInput = {
            en : this.state.en,
                        de : this.state.de,
                        ti : this.state.ti,
                        it : this.state.it,
                        fr : this.state.fr,
                        am : this.state.am,
                        ar : this.state.ar,
            description : this.state.description,
            image: this.state.image,
            created_by : "Admin",
            updated_by : "Admin",
            product_type : null !== this.state.product_type ? this.state.product_type : productType,
            market_price: this.state.market_price,
            customer_price: this.state.customer_price,
            product_status: this.state.product_status,
            product_unit: null !== this.state.product_unit ? this.state.product_unit : productUnit
        }

        console.log(userInput)

        this.props.productAction(userInput, "addProduct", MANAGE_PRODUCT_URL);
    }

    render() {
        const { classes } = this.props;
        const { t } = this.props;

        // Translate placeholder
        const translateDescriptionPlaceholder = () => {

            let placeholder;


            // Switch statement is not working as expected
                let userLanguage = localStorage.getItem("i18nextLng")
                if (userLanguage === "en")
                    placeholder =  "Description";
                else if (userLanguage ==="fr")
                    placeholder =  "Description";
                else if (userLanguage === "de")
                    placeholder = "Beschreibung";
                else if (userLanguage === "am")
                    placeholder = "መግለጫ";
                else if (userLanguage === "ti")
                    placeholder = "መግለጫ";
                else if (userLanguage ==="it")
                    placeholder = "Descrizione";
                else if (userLanguage ==="ar")
                    placeholder = "وصف";
                else
                    placeholder = "Artikel suchen ..."

            return placeholder;

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

       const description = translateDescriptionPlaceholder()


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


                <CssBaseline />
                  <Grid container justify="center" className={classes.image}>
                    <Grid
                      item
                      xs={12}
                      sm={8}
                      md={5}
                      component={Paper}
                      direction="row"
                      elevation={6}
                      square
                    >
                      <Grid className={classes.paper}>
                        <Avatar >
                          <AddCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {t("admin.addProduct.title")}
                        </Typography>
                        <form className={classes.form} noValidate>
                              <Typography>{t("admin.addProduct.productName")}</Typography>
                              <div>
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size={"small"}
                                    id="en"
                                    label={"English"}
                                    name="en"
                                    autoComplete="en"
                                    onChange={this.onChange}
                                    value={this.state.en}
                                    autoFocus
                                    />
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size={"small"}
                                    id="de"
                                    label={"Deutsch"}
                                    name="de"
                                    autoComplete="de"
                                    onChange={this.onChange}
                                    value={this.state.de}

                                    />
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size={"small"}
                                    id="fr"
                                    label={"French"}
                                    name="fr"
                                    autoComplete="fr"
                                    onChange={this.onChange}
                                    value={this.state.fr}

                                    />
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size={"small"}
                                    id="it"
                                    label={"Italian"}
                                    name="it"
                                    autoComplete="it"
                                    onChange={this.onChange}
                                    value={this.state.it}

                                    />
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size={"small"}
                                    id="ar"
                                    label={"Arabic"}
                                    name="ar"
                                    autoComplete="ar"
                                    onChange={this.onChange}
                                    value={this.state.ar}

                                    />
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size={"small"}
                                    id="am"
                                    label={"Amharic"}
                                    name="am"
                                    autoComplete="am"
                                    onChange={this.onChange}
                                    value={this.state.am}

                                    />
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size={"small"}
                                    id="ti"
                                    label={"Tigrinya"}
                                    name="ti"
                                    autoComplete="ti"
                                    onChange={this.onChange}
                                    value={this.state.ti}

                                    />
                              </div>


                              <TextareaAutosize

                                  value={this.state.description}
                                  margin="normal"
                                  required
                                  variant="outlined"
                                  id="description"
                                  name="description"
                                  autoComplete="description"
                                  label={"Product Description *"}
                                  fullWidth
                                  onChange={this.onChange}
                                  minRows={3}
                                  maxRows={8}
                                  placeholder={description}
                                  style={{backgroundColor: "white",
                                      borderRadius: "2%",
                                      width: "100%",
                                      outlineColor: "orange",
                                      marginTop: "15px"

                                  }}

                              />


                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="market_price"
                                label={t("admin.addProduct.marketPrice")}
                                name="market_price"
                                autoComplete="market_price"
                                onChange={this.onChange}
                                value={this.state.market_price}

                              />

                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="customer_price"
                                label={t("admin.addProduct.customerPrice")}
                                name="customer_price"
                                autoComplete="customer_price"
                                onChange={this.onChange}
                                value={this.state.customer_price}
                              />
                            <br/>
                            <br/>
                            <FormControl className={classes.formControl}>
                                {/*<InputLabel htmlFor="uncontrolled-native">Product Type</InputLabel>*/}
                                <NativeSelect
                                    value={this.state.product_type}
                                  onChange={this.onChange}
                                  name="product_type"
                                  defaultValue={this.state.product_type}
                                  inputProps={{
                                    name: 'product_type',
                                    id: 'product_type',
                                  }}
                                >
                                    {
                                        this.props.productType.map((productType, index) => (
                                            <option value={productType[localStorage.getItem("i18nextLng")]}>{productType[localStorage.getItem("i18nextLng")]}</option>
                                            ))
                                    }

                            </NativeSelect>
                                <FormHelperText>{t("admin.productType.productType")}</FormHelperText>

                            </FormControl>

                            <br/>
                            <br/>
                            <FormControl className={classes.formControl}>
                                {/*<InputLabel htmlFor="uncontrolled-native">Product Type</InputLabel>*/}
                                <NativeSelect
                                    value={this.state.product_unit}
                                  onChange={this.onChange}
                                  name="product_unit"
                                  defaultValue={this.state.product_unit}
                                  inputProps={{
                                    name: 'product_unit',
                                    id: 'product_unit',
                                  }}
                                >
                                    {
                                        this.props.productUnit.map((productUnit, index) => (
                                            <option value={productUnit.name}>{productUnit.name}</option>
                                            ))
                                    }

                            </NativeSelect>
                                <FormHelperText>{t("admin.productUnit.productUnit")}</FormHelperText>

                            </FormControl>
                            <br/>
                            <br/>
                              <FormControl className={classes.formControl}>
                                   <Typography
                                                                color={"textSecondary"}
                                                                margin="dense"
                                                                id="Category"
                                                                name="Category"
                                                                label="Category"
                                                                // onChange={this.onChange}
                                                                fullWidth
                                                        >{t("admin.addProduct.productStatus")}</Typography>
                                                        <Select
                                                          labelId="demo-simple-select-label"
                                                          id="product_status"
                                                          name="product_status"
                                                          value={this.state.product_status}
                                                          onChange={this.onChange}
                                                          className={classes.MenuItem}
                                                        >
                                                          <MenuItem className={classes.MenuItem} value={"AVAILABLE"}>Available</MenuItem>
                                                          <MenuItem className={classes.MenuItem} value={"NOT_AVAILABLE"}>Not Available</MenuItem>
                                                        </Select>
                                  <br/>

                              </FormControl>


                             <CardContent>
                                      <Grid container justify="center" alignItems="center">
                                        {this.state.imagePreview&& (
                                        <div style={{paddingRight: '2%'}}>
                                         <Avatar
                                        alt={"Profile picture"}
                                        src={this.state.imagePreview}
                                        classes={{ root: classes.avatar2, circle: classes.circle }}
                                      />
                                        </div>
                                         )}
                                          <input
                                          accept="image/*"
                                          style={{display: "none"}}
                                          id="contained-button-file"
                                          multiple
                                          type="file"
                                          onChange={this.onChange}
                                        />

                                        <label htmlFor="contained-button-file">
                                            <Typography color={"textSecondary"}>Photo</Typography>
                                          <Fab component="span" className={classes.button}>
                                            <CloudUploadIcon style={{color: "orange"}}/>
                                          </Fab>
                                        </label>
                                      </Grid>
                             </CardContent>

                              <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.onAddProduct}
                              >
                                  {t("admin.addProduct.title")}
                              </Button>


                        </form>
                      </Grid>
                </Grid>
              </Grid>
                 <Box mt={5}>
                            <Copyright />
                 </Box>
            </Content>
        );
    }
}

AddProduct.propTypes = {
  productAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
  productType: PropTypes.object.isRequired,
    productUnit: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        productAdmin: state.productAdmin,
        productType: state.productAdmin.productType,
        productUnit: state.productAdmin.productUnit

    }
}

export default connect(mapStateToProps, {productAction})(withTranslation()(withStyles(styles) (withRouter(AddProduct))));
