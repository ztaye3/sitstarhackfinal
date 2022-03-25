import React, {Component, useState} from 'react';
import {withRouter, Redirect} from "react-router-dom";
import loginUserAction from "../../redux/login/loginAction";
import {connect} from "react-redux";
import {CATEGORY_URL, DASHBOARD_URL, GET_PRODUCT_BY_NAME, HOME_URL} from "../../utils/Constant";
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
import {Copyright} from "../../utils/StyleUtil";
import {ListItem} from "@material-ui/core";
import List from "@material-ui/core/List";
import {Translation, withTranslation} from "react-i18next";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "../../static/style/css/Home.css";
import {isMobile} from "react-device-detect";
import addUserAction from "../../redux/admin/user/addUserAction";
import { DateTimePicker } from "@material-ui/pickers";
import Switch from "@material-ui/core/Switch";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            from: "",
            to:"",
            selectedDate: new Date(),
            is_departure: true,
            reserve: 0
        }
    }

      padTo2Digits = num => {
      return num.toString().padStart(2, '0');
     }

     formatDate = date => {
          return (
            [
              date.getFullYear(),
              this.padTo2Digits(date.getMonth() + 1),
              this.padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
              this.padTo2Digits(date.getHours()),
              this.padTo2Digits(date.getMinutes()),
              this.padTo2Digits(date.getSeconds()),
            ].join(':')
          );
    }

    onChange = e => {


        if(e.target  === undefined){
            this.setState({
            selectedDate:this.formatDate(e)
        })
        }
        else if(e.target.checked !== undefined){
            this.setState({
            is_departure:e.target.checked
        })

        }

    }

    onChange_two = e => {
        this.setState({
                [e.target.name]: e.target.value
            })
    }

    onLoginClick = e =>{
        e.preventDefault();
        const userInput = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUserAction(userInput, HOME_URL)
    }

    handleSearchConnections = () => {

      const userInput = {
            from: this.state.from,
            to: this.state.to,
            selectedDate: this.state.selectedDate,
            is_departure: this.state.is_departure
      }

      this.props.addUserAction(userInput, "SEARCH_CONNECTIONS")

  }

      handleBook = () => {

      const userInput = {
            from: this.props.booking.connections.from,
            to: this.props.booking.connections.to,
            selectedDate: this.props.booking.connections.selectedDate,
            is_departure: this.props.booking.connections.is_departure,
            train_number: this.props.booking.connections.train_number,
            reserve: this.state.reserve
      }

      this.props.addUserAction(userInput, "BOOK")

  }
     handleSearchProduct = (e) => {

      // setSearchProduct(e.target.value);

  }
    render() {
        const classes = this.props.classes;
        const { t } = this.props;
        const flexContainer = {
          display: 'flex',
          flexDirection: 'row',
          padding: 0,
        };



        const userLanguage = localStorage.getItem("i18nextLng");

        // Translate plwallpaper-bigdata-1.jpgaceholder
        const  translateSearchPlaceholder = () => {

            let placeholder;


            // Switch statement is not working as expected

                if (userLanguage === "en")
                    placeholder =  "From";
                else if (userLanguage ==="fr")
                    placeholder =  "Rechercher un élément ...";
                else if (userLanguage === "de")
                    placeholder = "Artikel suchen ...";
                else if (userLanguage === "am")
                    placeholder = "ዕቃ ፈልግ ...";
                else if (userLanguage === "ti")
                    placeholder = "ዓቕሃ ድለይ ...";
                else if (userLanguage ==="it")
                    placeholder = "Cerca elemento ...";
                else if (userLanguage ==="ar")
                    placeholder = "عنصر البحث ...";
                else
                    placeholder = "Artikel suchen ..."

            return placeholder;

        }
        const search = translateSearchPlaceholder();
        const label = this.state.is_departure ? "Departure" : "Arrival"
        const connections = this.props.booking.connections
        const trip_type = connections.is_departure ? "Departure" : "Arrival"

        return (

            <Grid container component="main" className={classes.root}>
                <div style={{ flexGrow: 0.8 }}/>
              <CssBaseline />
                  <Grid container justify="center" className={classes.image}>
                                 <Grid container style={{ borderTop: "0px solid grey" }}>
              <Grid container direction="column" item xs={4}>
                <Grid
                  item
                  xs
                  className={classes.outerColumn}
                  style={{ display: "flex", justifyContent: "center",
                        flexDirection: "column", marginLeft: "100px"
                    }}
                                    >

                            <Grid
                                  container
                                  spacing={0}
                                  direction="column"

                                >

                                <Grid container wrap="nowrap"  spacing={5}>
                                    <Grid item>
                                        <TextField

                                                    style={{backgroundColor: "white",
                                                            borderRadius: "15px",
                                                        width: 323,
                                                            }}
                                                    placeholder={"From"}
                                                    variant="outlined"
                                                    size="medium"
                                                    fullWidth={false}
                                                        id="from"
                                                        name="from"
                                                        autoComplete="from"
                                                        onChange={this.onChange_two}
                                                        value={this.state.from}
                                                  />
                                            </Grid>


                                    <Grid item >
                                        <TextField

                                            style={{backgroundColor: "white",
                                                    borderRadius: "15px",
                                                width: 323,
                                                    }}
                                            placeholder={"To"}
                                            variant="outlined"
                                            size="medium"
                                            fullWidth={false}
                                                id="to"
                                                name="to"
                                                autoComplete="to"
                                                onChange={this.onChange_two}
                                                value={this.state.to}
                                          />
                                    </Grid>
                               </Grid>
                                <Typography style={{color: "white",
                                                        marginLeft: "0px", marginTop: "20px"}}>Date</Typography>
                                <Grid container wrap="nowrap"  spacing={6} >

                                    <Grid item>

                                    <DateTimePicker
                                        style={{border: "0px solid white",
                                                backgroundColor: "white",
                                                borderRadius: "15px",
                                                }}
                                    inputVariant="outlined"
                                    value={this.state.selectedDate}
                                    id="selectedDate"
                                    name="selectedDate"
                                    onChange={this.onChange}

                                  />
                                </Grid>
                                    <Grid item style={{marginLeft: "90px"}}>

                                        <FormControlLabel style={{color: "white"}}
                                                 control={
                                                    <Switch
                                            checked={this.state.is_departure}
                                            onChange={this.onChange}
                                            value={this.state.is_departure}
                                            color="primary"
                                            />
                                                }
                                                label={label}
                                              />





                                    </Grid>
                                </Grid>
                                <Grid container wrap="nowrap"  spacing={5}   style={{ display: "flex", justifyContent: "center",
                                         marginTop : "50px"
                                    }}>
                                <Button
                                        variant="contained"
                                        style={{width: 257.433,
                                                height: 48}}
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.handleSearchConnections}

                              >
                                Search for connection
                              </Button>
                            </Grid>
                            </Grid>

                      </Grid>

                                                      {
                      JSON.stringify(connections) !== '{}' ? (

                                          <Grid
                  item
                  xs
                  className={classes.outerColumn}
                  style={{ display: "flex", alignItems: "center", marginLeft: "90px", marginTop: "100px" }}
                >
                                                <Grid
                                  container
                                  spacing={0}
                                  direction="column"

                                >

                                <Grid container wrap="nowrap"  spacing={3}>
                                    <Grid item>
                                        <Typography style={{color: 'white'}}>{trip_type + ": "}{connections.selectedDate}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{color: 'white'}}>{"Trip: "}{connections.from + " ->  "}{connections.to}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{color: 'white'}}>{ " Train_no:   "}{connections.train_number}</Typography>
                                    </Grid>
                                </Grid>
                                                    <Grid container wrap="nowrap"  spacing={3} style={{marginTop: "10px"}}>
                                            <Grid item>
                                                <Typography style={{color: 'white'}}>{ "Free slots: "}{connections.free_space}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography style={{color: 'white'}}>{"Likelihood of availability: "}{connections.probability }</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography style={{color: 'white'}}>{ " Number of Search:   "}{connections.number_of_search}</Typography>
                                            </Grid>

                                </Grid>
                                                    <Grid container wrap="nowrap"  spacing={10} style={{marginTop: "10px"}}>
                                            <Grid item style={{marginTop: "20px"}}>

                                                        <TextField
                                                          id="reserve"
                                                          name="reserve"
                                                          label="Reserve"
                                                          type="number"
                                                          InputLabelProps={{
                                                            shrink: true,
                                                              inputProps: {
                                                                   max: 50, min: 1
                                                               }
                                                          }}
                                                          onChange={this.onChange_two}
                                                        />
                                            </Grid>
                                            <Grid item style={{marginLeft: "160px"}} >
                                                <Button
                                        variant="contained"
                                        // style={{width: 200.433,
                                        //         height: 48}}
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.handleBook}

                              >
                                Book
                              </Button>
                                            </Grid>

                                </Grid>

                                                </Grid>
                </Grid>

                      ) : ""
                  }
         <Grid
                  item
                  xs
                  className={classes.outerColumn}
                  direction="column"
                  align="left"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {/*<Typography>Bottom L.</Typography>*/}
                </Grid>
              </Grid>
              <Grid container direction="column" item xs={4} align="center">
                  {/*{*/}
                  {/*    this.props.booking.connection & (*/}
                  {/*                        <Grid*/}
                  {/*                        item*/}
                  {/*                        container*/}
                  {/*                        className={classes.centerColumn}*/}
                  {/*                        justify="center"*/}
                  {/*                      >*/}
                  {/*                        <Typography>Top Center</Typography>*/}
                  {/*                      </Grid>*/}
                  {/*    )*/}
                  {/*}*/}
                <Grid
                  item
                  container
                  className={classes.centerColumn}
                  direction="column"
                  justify="center"
                >
                  {/*<Typography>Center Center</Typography>*/}
                </Grid>
                <Grid
                  item
                  className={classes.centerColumn}
                  container
                  direction="row"
                  alignItems="flex-end"
                  justify="center"
                >
                    {
                        this.props.booking.is_trip_success === true ? (
                            <Typography style={{ fontWeight: 600, color: "white" }}>
                                Tripe successfully booked!
                            </Typography>
                        ): ""
                    }
                  {/*<Typography>Bottom Center</Typography>*/}
                </Grid>
              </Grid>
              <Grid container direction="column" item xs={4}>
                <Grid
                  item
                  className={classes.outerColumn}
                  container
                  direction="column"
                  alignItems="flex-end"
                  justify="flex-start"
                >
                  {/*<Typography>Top R.</Typography>*/}
                </Grid>
                <Grid
                  item
                  className={classes.outerColumn}
                  container
                  direction="row"
                  alignItems="center"
                  justify="flex-end"
                >
                  {/*<Typography>Center R.</Typography>*/}
                </Grid>
                <Grid
                  item
                  className={classes.outerColumn}
                  container
                  direction="column"
                  alignItems="flex-end"
                  justify="flex-end"
                >
                  {/*<Typography>Bottom R.</Typography>*/}
                </Grid>
              </Grid>
            </Grid>


              </Grid>
    </Grid>
        );
    }
}

Search.propTypes = {
  loginUserAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    addUserAction: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        booking: state.userAdmin
    }
}

export default connect(mapStateToProps, {loginUserAction, addUserAction}) (withTranslation()(withRouter(UpdatedComponent(Search))));