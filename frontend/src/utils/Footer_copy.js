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

			  <div className="footer">
				<div className="inner-footer">

					<div className="footer-items">
						<h1>Afropa</h1>
						<p>{t("footer.title.description")}</p>
					</div>

					<div className="footer-items">
						<h3>{t("footer.title.contact")}</h3>
						<div className="border1"></div>
						<ul  className="ul-footer">
								<li  className="ul-li-footer">Tekle Haile
								Lohnstrasse 2
								CH-8200 Schaffhausen
								info@solar-afropa.ch
								Mobile 079 738 31 45
								Tel / Fax: 052 625 91 53</li>
							<br/>
							<li  className="ul-li-footer">Workshop
Trüllenbuck 61
8207 Schaffhausen</li>
							{/*<li  className="ul-li-footer">Workshop*/}
							{/*Trüllenbuck 61*/}
							{/*8207 Schaffhausen</li>*/}
						</ul>
					</div>

					<div className="footer-items">
						<h3>{t("footer.title.support")}</h3>
						<div className="border1"></div>
						<ul  className="ul-footer">
							{/*<a  className="ul-a-footer " href="#">*/}
							{/*	<li  className="ul-li-footer">{t("footer.title.support.description")}</li>*/}
							{/*</a>*/}
							{/*<a  className="ul-a-footer " href="#">*/}
							{/*	<li  className="ul-li-footer">Afropa - Association for the use of solar energy</li>*/}
							{/*</a>*/}
							{/*<a  className="ul-a-footer " href="#">*/}
							{/*	<li  className="ul-li-footer">PO Box 62</li>*/}
							{/*</a>*/}
							{/*<a  className="ul-a-footer " href="#">*/}
							{/*	<li  className="ul-li-footer">CH / 8201 Schaffhausen*/}
							{/*	Raiffeisenbank Schaffhausen</li>*/}
							{/*</a>*/}
							{/*<a  className="ul-a-footer " href="#">*/}
							{/*	<li  className="ul-li-footer">IBAN no .: CH60 8134 4000 0053 0994 0</li>*/}
							{/*</a>*/}
							<li  className="ul-li-footer"><i className="i-footer"  aria-hidden="true"></i>For transfers, please use the account details below.

Afropa - Association for the use of solar energy
PO Box 62
CH / 8201 Schaffhausen
Raiffeisenbank Schaffhausen
IBAN no .:
CH60 8134 4000 0053 0994 0</li>
{/*							<li  className="ul-li-footer"><i className="i-footer"  aria-hidden="true"></i>Afropa - Association for the use of solar energy</li>*/}
{/*							<li  className="ul-li-footer"><i className="i-footer"  aria-hidden="true"></i>PO Box 62</li>*/}
{/*							<li  className="ul-li-footer"><i className="i-footer"  aria-hidden="true"></i>CH/8201 Schaffhausen Raiffeisenbank Schaffhausen</li>*/}
{/*							<li  className="ul-li-footer"><i className="i-footer"  aria-hidden="true"></i>IBAN no .:*/}
{/*CH60 8134 4000 0053 0994 0</li>*/}
						</ul>
					</div>

					<div className="footer-items">
						<h3>{t("footer.title.link")}</h3>
						<div className="border1"></div>
						<ul  className="ul-footer">
							<a  className="ul-a-footer " href="https://www.solar-afropa.ch/">
								<li  className="ul-li-footer">Solar afropa</li>
							</a>

						</ul>

						<div className="social-media">
							<a  className="ul-a-footer " href="https://www.facebook.com/tekle.haile.980?fref=ts"><i className="i-footer" ><FacebookIcon/></i></a>
							<a  className="ul-a-footer " href="https://twitter.com/SolarTekle"><i className="i-footer" ><TwitterIcon/></i></a>
							<a  className="ul-a-footer " href="https://www.youtube.com/results?search_query=solar-afropa"><i className="i-footer" ><YouTubeIcon/></i></a>
						</div>
					</div>
				</div>

				<div className="footer-bottom">
					Copyright &copy;<Link color="inherit" href="https://zekariashirpo.com/">
                Zekarias Taye Hirpo
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
				</div>
			</div>

);
};
export default Footer;
