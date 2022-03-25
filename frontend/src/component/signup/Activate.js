import React, {Component} from 'react';
import PropTypes from 'prop-types';
import activateAction from "../../redux/signup/activateAction";
import {Link as RouterLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
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
import UpdatedComponent from "../../utils/StyleUtil";
import Container from "@material-ui/core/Container";
import {Copyright} from "../../utils/StyleUtil";
import { ListItem, withStyles } from '@material-ui/core';
import CardContent from "@material-ui/core/CardContent";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Fab from "@material-ui/core/Fab";
import CardMedia from "@material-ui/core/CardMedia";
import List from "@material-ui/core/List";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {isEmptyUtils} from "../../utils/Utils";
import {Translation, withTranslation} from "react-i18next";


class Activate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account_type: null,
            profile_picture: null,
            profilePicturePreview: null,
            identification: ""


        }
    }

    // Verify account
    verify_account = e => {

        const {uid, token} = this.props.match.params;
        const userInput = {
            'uid': uid,
            'token': token
            }
        this.props.activateAction(userInput, "activate");
    }

    // Configure state for view selection
    configureState = e => {
        this.props.activateAction(null, "changeState")
    }

    // Configure account
    configureAccount = e => {

        if(!isEmptyUtils(this.state.account_type)){
            const accountType = this.state.account_type;


            const userInput = {
                            is_merchant : accountType === "merchant" ,
                            is_customer : accountType === "customer",
                            }
            this.props.activateAction(userInput, "configureAccount");

        }

    }

    // Submit account choice and profile picture
    submitAccountDetails = e => {
        e.preventDefault()
         let is_merchant = this.props.is_merchant;
         let is_customer = this.props.is_customer;

         // avoid non boolean value
        let merchant = (is_merchant === true || is_merchant === false) ? is_merchant : false;
        let customer = (is_customer === true || is_customer === false) ? is_customer : false;

        const userInput = {




                is_merchant : merchant,
                is_customer : customer,
                profile_picture: this.state.profile_picture,
                identification: this.state.identification
        }

        this.props.activateAction(userInput, "setupAccountDetails");
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

    // Skip to login
    skipAccountSetup = () => {
        this.props.activateAction(null, "skip")
    }

    // Send user 'uid' and 'token' for account verification during component mount
    componentDidMount() {

        // If the component called for the first time
        if(!this.props.isAccountActivated && !this.props.configureAccountType && !this.props.uploadProfilePicture)
            this.verify_account()
        }

    render() {

        const classes = this.props.classes;
        const { t } = this.props;
        const flexContainer = {
          display: 'flex',
          flexDirection: 'row',
          padding: 0,
        };

        const translate = (key) => {
            return (
                <Translation>
                    {
                        (t, {i18n}) => <Typography>{t(key)}</Typography>
                    }
                </Translation>
            )
       }

       const merchantNumber = translate("activate.merchantNumber")

        // Check if account is already activated
        if(this.props.isAccountActivated){

            // If account configuration is true
           if(this.props.configureAccountType){

               return(

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
                                  <Typography
                                  component="h2"
                                  variant="h4"
                                  align="center"
                                  color="textPrimary"
                                  gutterBottom
                                >
                                      {t("activate.success.message")}
                                </Typography>
                                  <br/>

                                <Typography
                                      variant="h5"
                                      align="center"
                                      color="textSecondary"
                                      paragraph
                                    >
                                    {t("activate.profile")}

                                </Typography>
                                  <br/><br/>

                                  <Container  maxWidth="xl">
                                    <Container maxWidth="md" style={{paddingLeft: '60px'}}>
                                        <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                    </Avatar>
                                    </Container>

                                  <form className={classes.form} noValidate>

                                 <FormControl component="fieldset" color={"secondary"}>
                                      <FormLabel component="legend">
                                          <Typography
                                              variant="h5"
                                              color="textPrimary"
                                              paragraph
                                            >
                                              {t("activate.accountType")}
                                        </Typography>
                                      </FormLabel>
                                      <RadioGroup aria-label="account_type" name="account_type" value={this.state.account_type} onChange={this.onChange}>
                                        <FormControlLabel value="merchant" control={<Radio />} label={t("activate.merchant")} />
                                        <FormControlLabel value="customer" control={<Radio />} label={t("activate.customer")} />
                                      </RadioGroup>
                                 </FormControl>
                                      <br/><br/>
                                 <Container>
                                     <Button
                                    color="secondary"
                                    component={RouterLink}
                                    variant="outlined"
                                    onClick={this.configureState}
                                    style={{ borderRadius: 25, width: 100, height: 32, borderColor: "green",float: "left"
                                      }}
                                    >
                                    <Typography style={{color: 'green', fontSize: 'large', fontWeight: 'bold',  }}>{t("activate.skip")}</Typography>
                                  </Button>
                                      <Button
                                    component={RouterLink}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.configureAccount}
                                    style={{ borderRadius: 25, width: 100, height: 30, float: "right" }}
                                  >
                                    <Typography style={{color: 'white', fontSize: 'large', fontWeight: 'bold' }}>{t("activate.next")}</Typography>
                                  </Button>

                                 </Container>
                                  <Box mt={5}>
                                    <Copyright />
                                  </Box>
                                  </form>
                            </Container>
                              </Grid>
                            </Grid>
                          </Grid>
                    </Grid>

                )
           }

           // If profile picture is true
           else if(this.props.uploadProfilePicture){

               return(

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
                              <Typography
                              component="h2"
                              variant="h4"
                              align="center"
                              color="textPrimary"
                              gutterBottom
                            >
                            {t("activate.success.message")}
                            </Typography>
                              <br/>

                            <Typography
                                  variant="h5"
                                  align="center"
                                  color="textSecondary"
                                  paragraph
                                >
                              {t("activate.profile")}

                            </Typography>
                              <br/><br/>

                              <Typography
                                  variant="h6"
                                  color="textPrimary"
                                  paragraph
                                >
                                  {t("activate.uploadPicture")} {this.props.is_merchant && (
                                  <Typography>{t("activate.merchantNumber")}</Typography>
                              )}
                              </Typography>

                                  <Grid  container   wrap="nowrap" spacing={3}>
                                      <Grid item xs>
                                      {this.props.is_merchant && (

                                              <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="identification"
                                                    label={t("activate.merchantNum")}
                                                    name="identification"
                                                    autoComplete="identification"
                                                    onChange={this.onChange}
                                                    value={this.state.identification}
                                                    autoFocus
                                                  />

                                      )}
                                      </Grid>
                                  </Grid>
                              <br/><br/>
                              <Grid  container   wrap="nowrap" spacing={3} justify={"center"}>
                                   <Grid item>
                                                {this.state.profilePicturePreview && (
                                             <Avatar
                                            alt={"Profile picture"}
                                            src={this.state.profilePicturePreview}
                                            classes={{ root: classes.avatar2, circle: classes.circle }}
                                          />

                                             )}
                                   </Grid>

                                  <Grid item style={{marginTop: "25px"}}>
                                              <input
                                              accept="image/*"
                                              style={{display: "none"}}
                                              id="contained-button-file"
                                              multiple
                                              type="file"
                                              onChange={this.onChange}
                                            />

                                            <label htmlFor="contained-button-file">
                                              <Fab component="span" className={classes.button}>
                                                <CloudUploadIcon style={{color: "green"}}/>
                                              </Fab>
                                            </label>
                                          </Grid>
                                      </Grid>


                                  <br/><br/>
                              <List style={flexContainer}>
                                  <ListItem>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.configureState}
                                        style={{ borderRadius: 25, width: 100, height: 30}}
                                      >
                                        <Typography style={{color: 'white', fontSize: 'large', fontWeight: 'bold' }}>{t("activate.previous")}</Typography>
                                      </Button>
                                  </ListItem>

                                  <ListItem>
                                      <Button
                                        color="secondary"
                                        variant="outlined"
                                        onClick= {this.skipAccountSetup}
                                        style={{ borderRadius: 25, width: 100, height: 32, borderColor: "green"
                                          }}
                                        >
                                        <Typography style={{color: 'green', fontSize: 'large', fontWeight: 'bold'}}>{t("activate.skip")}</Typography>
                                      </Button>
                                  </ListItem>

                                  <ListItem>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick= {this.submitAccountDetails}
                                        style={{ borderRadius: 25, width: 100, height: 30}}
                                      >
                                        <Typography style={{color: 'white', fontSize: 'large', fontWeight: 'bold' }}>{t("activate.finish")}</Typography>
                                     </Button>

                                  </ListItem>

                              </List>

                              <Box mt={5}>
                                <Copyright />
                              </Box>

                          </Grid>
                        </Grid>
                      </Grid>
                </Grid>
            )

           }
           else {
                return (
                    <div>

                    </div>
                );
           }
        }
        else{
            return (
            <div>

            </div>
        );
        }
    }
}

Activate.propTypes = {
    activateAction: PropTypes.func.isRequired,
    isAccountActivated: PropTypes.bool.isRequired,
    configureAccountType: PropTypes.bool.isRequired,
    uploadProfilePicture: PropTypes.bool.isRequired,
    is_merchant : PropTypes.bool.isRequired,
    is_customer : PropTypes.bool.isRequired,
};

const mapStateToProps = state =>{
    return{
        isAccountActivated: state.activateUser.isAccountActivated,
        configureAccountType: state.activateUser.configureAccountType,
        uploadProfilePicture: state.activateUser.uploadProfilePicture,
        is_merchant : state.activateUser.is_merchant,
        is_customer : state.activateUser.is_customer,

    }
}

export default connect(mapStateToProps, {activateAction})(withTranslation()(withRouter(UpdatedComponent(Activate))));
