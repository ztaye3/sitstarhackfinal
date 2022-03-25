import React, {Component} from 'react';
import {useParams, withRouter} from "react-router-dom";
import Content from "../../../Dashboard/Content";
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
import {Translation, withTranslation} from "react-i18next";
import Link from "@material-ui/core/Link";
import MaterialTable from "material-table";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import {ListItem, MenuItem, Select, TextareaAutosize} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Copyright} from "../../../utils/StyleUtil";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CardContent from "@material-ui/core/CardContent";
import background from '../../../static/background/sefed-beckground.jpg'
import productAction from "../../../redux/admin/product/productAction";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import {DELETE_ORDER, GET_ORDER, MANAGE_ORDER_URL, MANAGE_PRODUCT_URL, UPDATE_ORDER} from "../../../utils/Constant";
import orderAction from "../../../redux/admin/order/orderAction";
import {isMobile} from 'react-device-detect';






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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
        fontSize: "80%"
  }
});

class AdminOrder extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.orderAction(null, GET_ORDER, MANAGE_ORDER_URL)
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

    editProduct = data => {

        console.log(data)
        this.props.orderAction(data, UPDATE_ORDER, MANAGE_ORDER_URL)
    }

    deleteProduct = data => {
       this.props.orderAction(data, DELETE_ORDER, MANAGE_ORDER_URL)
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


                <div style={{ maxWidth: "100%" }}>

                    <MaterialTable
                         options={{
                            filtering: true,
                            search: true
                          }}
                          title={t("admin.order.orders")}
                          columns={
                              [
                            { title: 'Id', field: 'id', type: 'numeric', editable: 'never' },
                            { title: t("admin.order.description"), field: 'description',

                            },

                            { title: t("admin.order.status"), field: 'order_status',
                              lookup: { "DELIVERED": 'Delivered', 'PAYMENT_SUCCESSFUL': 'Payment successful',
                                      "FAILED": 'Failed',
                                      "UNKNOWN": 'Unknown'}
                            },
                            { title: t("admin.order.amount"), field: 'total_cost', type: 'numeric'},
                            { title: t("admin.order.date"), field: 'created_date', type: 'datetime'},
                            { title: t("admin.order.paymentType"), field: 'payment_method' },
                            { title: t("admin.order.transactionDetail"), field: 'amount' },
                            { title: t("checkout.firstName"), field: 'shipping[0].first_name' },
                            { title: t("checkout.lastName"), field: 'shipping[0].last_name'},
                            { title: t("checkout.email"), field: 'shipping[0].email'  },
                            { title: t("checkout.phone"), field: 'shipping[0].phone' },
                            { title: t("admin.order.address"), field: 'shipping[0].address'},
                            { title: t("admin.order.apartment"), field: 'shipping[0].apartment'},
                            { title: t("admin.order.postalCode"), field: 'shipping[0].zip_code' },
                            { title: t("admin.order.city"), field: 'shipping[0].city' },
                            { title: t("admin.order.state"), field: 'shipping[0].state' },
                            { title: t("admin.order.country"), field: 'shipping[0].country' },

                          ]
                          }
                          data={this.props.orders}
                          editable={{
                            // onRowAdd: newData =>
                            //   new Promise((resolve, reject) => {
                            //     setTimeout(() => {
                            //       setData([...data, newData]);
                            //
                            //       resolve();
                            //     }, 1000)
                            //   }),
                            onRowUpdate: (newData, oldData) =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataUpdate = [...this.props.orders];
                                  const index = oldData.tableData.id;
                                  dataUpdate[index] = newData;
                                    this.editProduct(newData);

                                  resolve();
                                }, 1000)
                              }),
                            onRowDelete: oldData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataDelete = [...this.props.orders];
                                  const index = oldData.tableData.id;
                                  // dataDelete.splice(index, 1);
                                  this.deleteProduct(dataDelete[index]);

                                  resolve();
                                }, 1000)
                              }),
                          }}
                        />
                  </div>

                 <Box mt={5}>
                     <Copyright />
                 </Box>
            </Content>
        );
    }
}

AdminOrder.propTypes = {
  productAction: PropTypes.func.isRequired,
    orderAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        products: state.productAdmin.products,
        orders: state.order.orders
    }
}

export default connect(mapStateToProps, {productAction, orderAction})(withTranslation()(withStyles(styles) (withRouter(AdminOrder))));




