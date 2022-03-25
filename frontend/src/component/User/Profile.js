import React, {Component, useState} from 'react';
import {withRouter, Redirect, Link as RouterLink} from "react-router-dom";
import signupAction from "../../redux/signup/signupAction";
import {connect} from "react-redux";
import {DASHBOARD_URL, HOME_URL, MANAGE_USER_URL, USER_PROFILE_URL} from "../../utils/Constant";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import UpdatedComponent from "../../utils/StyleUtil";
import { FormControl} from "react-bootstrap";
import Container from "@material-ui/core/Container";
import {Copyright} from "../../utils/StyleUtil";
import List from "@material-ui/core/List";
import {ListItem} from "@material-ui/core";
import {withTranslation} from "react-i18next";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import addUserAction from "../../redux/admin/user/addUserAction";



class Profile extends Component{
    constructor(props, context) {
        super(props, context);
        let user = this.props.loginUser.user;
        this.state = {
            email : user.email,
            first_name : user.first_name,
            last_name : user.last_name,
            image: user.profile_picture,
            imagePreview: null,
            profileChanged: false

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
          image: e.target.files[0],
          imagePreview: URL.createObjectURL(e.target.files[0]),
          profileChanged: true
        });
        }
    }

    editUser = e => {

        let user = this.props.loginUser.user;

        const userInput = {
            id: this.state.email,
            email : this.state.email,
            first_name : this.state.first_name,
            last_name : this.state.last_name,
            profile_picture : this.state.image,
            profileChanged: this.state.profileChanged,
            is_admin:user.is_admin,
            is_customer:user.is_customer,
            is_merchant:user.is_merchant,
            is_staff:user.is_staff,
            is_activated:user.is_activated
        }
        
        this.props.addUserAction(userInput, "editUser", USER_PROFILE_URL)
    }
    
    

    render() {
        
        let host = window.location.hostname;

        // Check dev and production host
        if(host === "localhost" || host === "0.0.0.0"){
            host = "http://" + host;
        }

        else {
            host = "https://" + host;
        }  

        const flexContainer = {
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
        };
        const classes = this.props.classes;
        const {t} = this.props;


        return (


            <Grid container component="main" className={classes.root}>
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
                        <Avatar className={classes.avatar}>
                          <AccountCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {t("admin.updateProfile")}
                        </Typography>
                        <form className={classes.form} noValidate>

                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label={t("checkout.firstName")}
                            name="first_name"
                            autoComplete="first_name"
                            onChange={this.onChange}
                            value={this.state.first_name}
                            defaultValue={this.state.first_name}
                            autoFocus
                          />
                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label={t("checkout.lastName")}
                            name="last_name"
                            autoComplete="last_name"
                            onChange={this.onChange}
                            value={this.state.last_name}
                            defaultValue={this.state.last_name}
                            autoFocus
                          />
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t("login.text.emailAddress")}
                            name="email"
                            autoComplete="email"
                            onChange={this.onChange}
                            value={this.state.email}
                            defaultValue={this.state.email}
                            autoFocus
                          />
                            <CardContent>
                                      <Grid container justify="center" alignItems="center">
                                        {this.state.image && (
                                        <div style={{paddingRight: '2%'}}>
                                         <Avatar
                                        alt={"Profile picture"}
                                        src={this.state.profileChanged ? this.state.imagePreview : this.state.image}
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
                                            <Typography color={"textSecondary"}>{t("activate.profilePicture")}</Typography>
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
                            onClick={this.editUser}
                          >
                            {t("admin.updateProfile")}
                          </Button>
                        </form>
                      </Grid>
                    </Grid>
                  </Grid>
            </Grid>

        )
    }
}

Profile.propTypes = {
    loginUser: PropTypes.object.isRequired,
    addUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loginUser: state.loginUser,
});

export default connect(mapStateToProps, {
  addUserAction
})(withTranslation()(withRouter(UpdatedComponent(Profile))));