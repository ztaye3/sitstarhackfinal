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
import productAction from "../../../redux/admin/product/productAction";
import {withTranslation} from "react-i18next";
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
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import {ADD_SLIDER, ADD_SLIDER_URL, MANAGE_PRODUCT_URL, MANAGE_SLIDER_URL} from "../../../utils/Constant";
import {ADD_PRODUCT_TYPE, MANAGE_PRODUCT_TYPE_URL} from "../../../utils/Constant";
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

class AddSlider extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile_picture: null,
            profilePicturePreview: null,
        }
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
          profile_picture: e.target.files[0],
          profilePicturePreview: URL.createObjectURL(e.target.files[0]),

        });
        }
       }

    onAddSlider= (e) => {

        e.preventDefault()

        const userInput = {

                image: this.state.profile_picture,
        }

        this.props.productAction(userInput, ADD_SLIDER, MANAGE_SLIDER_URL);
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
                            {t("admin.addPhoto")}
                        </Typography>
                        <form className={classes.form} noValidate>
                             <CardContent>
                                      <Grid container justify="center" alignItems="center">
                                        {this.state.profilePicturePreview&& (
                                        <div style={{paddingRight: '2%'}}>
                                         <Avatar
                                        alt={"Profile picture"}
                                        src={this.state.profilePicturePreview}
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
                                onClick={this.onAddSlider}
                              >
                                  {t("admin.addPhoto")}
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

AddSlider.propTypes = {
  productAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        productAdmin: state.productAdmin,
    }
}

export default connect(mapStateToProps, {productAction})(withTranslation()(withStyles(styles) (withRouter(AddSlider))));
