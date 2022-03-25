import React from "react";
// import {
// Box,
// Container,
// Row,
// Column,
// FooterLink,
// Heading,
// } from "./FooterStyles";
import  '../static/style/css/footer.css'
import Container from "@material-ui/core/Container";
import Content from "../Dashboard/Content";
import {makeStyles} from "@material-ui/core/styles";
import {drawerWidth} from "../AppBarAndDrawer/AppBarAndDrawer";
import Link from "@material-ui/core/Link";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { withStyles } from '@material-ui/core/styles';
import {useTranslation} from "react-i18next";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import  '../static/style/css/footer.css'


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

const Footer = () => {
	const classes = useStyles();
	   // Translation object
    const { t } = useTranslation();
return (

 <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>{t("footer.help")}</Box>
              <Box>
                <Link href="/contactUs" color="inherit">
                  {t("footer.title.contact")}
                </Link>
              </Box>
              {/*<Box>*/}
              {/*  <Link href="/" color="inherit">*/}
              {/*    Support*/}
              {/*  </Link>*/}
              {/*</Box>*/}
              <Box>
                <Link href="/aboutUs" color="inherit">
                  {t("about.us.title")}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>{t("footer.account")}</Box>
              <Box>
                <Link href="/" color="inherit">
                  {t("login.text.signIn")}
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  {t("signUp.signUp")}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>{t("footer.title.link")}</Box>
              <Box>
                <Link href="https://www.solar-afropa.ch/" color="inherit">
                  Solar afropa
                </Link>
              </Box>
              <Box>
                <Link href="https://www.afropa.ch/" color="inherit">
                  Afropa
                </Link>
              </Box>
            </Grid>
          </Grid>
          
          <Grid justify="flex-end" container wrap="nowrap"  spacing={3}>

            <Grid item><Link  class={"link-social"} href="https://www.facebook.com/tekle.haile.980?fref=ts"><FacebookIcon/></Link></Grid>
            <Grid item><Link  class={"link-social"} href="https://twitter.com/SolarTekle"><TwitterIcon/></Link></Grid>
            <Grid item><Link  class={"link-social"} href="https://www.youtube.com/results?search_query=solar-afropa"><YouTubeIcon/></Link></Grid>
          </Grid>

          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            <Link style={{color: 'white'}} href={"/terms"}>{t("footer.terms")}</Link> |
              Copyright &copy; <Link color="inherit" href="https://zekariashirpo.com/">
                Zekarias Taye Hirpo
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
          </Box>
        </Container>
      </Box>
    </footer>


);
};
export default Footer;
