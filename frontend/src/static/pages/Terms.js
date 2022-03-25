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

const Terms = () => {
	const classes = useStyles();
	   // Translation object
    const { t } = useTranslation();
return (

  <Content>
    <Grid  container justify = "center">
          <Typography variant="h5" component="h5"  >
          {t("terms.title")}
        </Typography>
    </Grid>
    <br/>
    <Typography variant="h6" component="h6">
      1. {t("terms.one.title")}
    </Typography>
    <Typography>
      {t("terms.one.content")}
    </Typography>
    <br/>
    <Typography variant="h6" component="h6">
      2. {t("terms.two.title")}
    </Typography>
        <Typography>
      {t("terms.two.content")}
    </Typography>
     <br/>
    <Typography variant="h6" component="h6">
      3. {t("terms.three.title")}
    </Typography>
    <Typography>
      {t("terms.three.content")}
    </Typography>

    <br/>
    <Typography variant="h6" component="h6">
      4. {t("terms.four.title")}
    </Typography>
    <Typography >
      {t("terms.four.content")}
    </Typography>
    <br/>
    <Typography variant="h6" component="h6">
      5. {t("terms.five.title")}
    </Typography>
    <Typography>
      {t("terms.five.content")}
    </Typography>
    <br/>
    <Typography variant="h6" component="h6">
      6. {t("terms.six.title")}
    </Typography>
    <Typography >
       {t("terms.six.content")}
    </Typography>
    <br/>
    <Typography variant="h6" component="h6">
      7. {t("terms.seven.title")}
    </Typography>
    <Typography >
      {t("terms.seven.content")}
    </Typography>
    <br/>
    <Typography variant="h6" component="h6">
      8. {t("terms.eight.title")}
    </Typography>
   <Typography>
      {t("terms.eight.content")}
    </Typography>

  </Content>


);
};
export default Terms;
