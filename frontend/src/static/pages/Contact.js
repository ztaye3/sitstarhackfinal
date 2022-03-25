import React from "react";

import Container from "@material-ui/core/Container";
import Content from "../../Dashboard/Content";
import {makeStyles} from "@material-ui/core/styles";
import {drawerWidth} from "../../AppBarAndDrawer/AppBarAndDrawer";
import Link from "@material-ui/core/Link";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { withStyles } from '@material-ui/core/styles';
import {useTranslation} from "react-i18next";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
// import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
// import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
// import EmailIcon from '@mui/icons-material/Email';
// import BusinessIcon from '@mui/icons-material/Business';
// import WebIcon from '@mui/icons-material/Web';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
	    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),

    position: "relative",
  },
}));

const Contact = () => {
	const classes = useStyles();
	   // Translation object
    const { t } = useTranslation();
return (

  <Content>
    <Grid  container justify = "center">
          <Typography variant="h5" component="h5"  >
          {t("footer.title.contact")}
        </Typography>
    </Grid>
    <br/>

    {/*<Typography variant="h6" component="h6">*/}
    {/*  Tekle Haile*/}
    {/*</Typography>*/}
    {/*<Typography>*/}
    {/*  <BusinessIcon/> 8200 Schaffhausen*/}
    {/*</Typography>*/}
    {/*<Typography>*/}
    {/*  <WebIcon/> www.afropa.ch*/}
    {/*</Typography>*/}
    {/*  <Typography>*/}
    {/*  <ContactPhoneIcon/> +41-(0)52 553 06 36*/}
    {/*</Typography>*/}
    {/*<Typography>*/}
    {/*  <PhoneIphoneIcon/> +41-(0)79 738 31 45*/}
    {/*</Typography>*/}
    {/*<Typography>*/}
    {/*  <EmailIcon/> info@afropa.ch*/}
    {/*</Typography>*/}



      <Grid container spacing={1}>
        <Grid >
        <Typography variant="h6" component="h6">
        Tekle Haile
        </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid >
    <Typography>
       CH-8200 Schaffhausen
    </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid >
            <Typography style={{textDecoration: "underline"}}>Web</Typography>
        </Grid>
        <Grid>
            <Typography> : www.afropa.ch</Typography>
        </Grid>
    </Grid>

      <Grid container spacing={1}>
        <Grid >
            <Typography style={{textDecoration: "underline"}}>Tel/Fax</Typography>
        </Grid>
        <Grid>
            <Typography> : +41-(0)52 553 06 36</Typography>
        </Grid>
    </Grid>

      <Grid container spacing={1}>
        <Grid >
            <Typography style={{textDecoration: "underline"}}>Mobile</Typography>
        </Grid>
        <Grid>
            <Typography> : +41-(0)79 738 31 45</Typography>
        </Grid>
    </Grid>
    <Grid container spacing={1}>
        <Grid >
            <Typography style={{textDecoration: "underline"}}>Email</Typography>
        </Grid>
        <Grid>
            <Typography> :info@afropa.ch</Typography>
        </Grid>
    </Grid>

    <br/>
      <br/>
      <br/>


         <Grid container spacing={1}>
        <Grid >
        <Typography variant="h6" component="h6">
            {t("contact.bank")}
        </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid >
    <Typography>
       Afropa - Verein für Solarenergienutzung
    </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid >
            <Typography style={{textDecoration: "underline"}}>Postfach</Typography>
        </Grid>
        <Grid>
            <Typography> : 62</Typography>
        </Grid>
    </Grid>

      <Grid container spacing={1}>
        <Grid >
            <Typography >CH/8201 Schaffhausen</Typography>
        </Grid>
    </Grid>

      <Grid container spacing={1}>
        <Grid >
            <Typography >Raiffeisenbank Schaffhausen</Typography>
        </Grid>
    </Grid>
    <Grid container spacing={1}>
        <Grid >
            <Typography style={{textDecoration: "underline"}}>IBAN-Nr</Typography>
        </Grid>
        <Grid>
            <Typography> :CH26 8080 8002 9423 4089 1</Typography>
        </Grid>
    </Grid>


  </Content>


);
};
export default Contact;
