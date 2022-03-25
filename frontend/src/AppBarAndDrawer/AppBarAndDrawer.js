import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {Link as RouterLink, useLocation, withRouter} from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import PalettePicker from "../Theme/PalettePicker";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';
import { Gb, De, It, Fr, Et, Er, Sa} from 'react-flags-select';
import Tooltip from "@material-ui/core/Tooltip";
import ReactFlagsSelect from 'react-flags-select';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CategoryIcon from '@material-ui/icons/Category';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import i18next from "i18next";
import {useTranslation, withTranslation} from "react-i18next";
import { Translation } from 'react-i18next';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import loginUserAction, {adminModeController} from "../redux/login/loginAction";
import {isEmptyUtils} from "../utils/Utils";
import { useHistory } from "react-router-dom";
import categoryAction from "../redux/product/category/categoryAction";
import ClassIcon from '@material-ui/icons/Class';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import {isMobile} from 'react-device-detect';



import {
    ABOUT_URL,
    BLOG_URL,
    CART_URL,
    CATEGORY_URL,
    GET_PRODUCT_BY_NAME,
    HOME_URL, MANAGE_ABOUT_URL, MANAGE_BLOG_URL, MANAGE_ORDER_URL, MANAGE_PRODUCT_TYPE_URL, MANAGE_PRODUCT_UNIT_URL,
    MANAGE_PRODUCT_URL, MANAGE_SLIDER_URL, MANAGE_TYPE_URL, MANAGE_USER_URL, USER_PROFILE_URL
} from "../utils/Constant";
import {Link} from "@material-ui/core";




export const drawerWidth = 240;

const StyledMenu = withStyles({
  paper: {
    marginTop: 5,
    border: '1px solid #d3d4d5',
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;"
  },
})((props) => (
  <Menu

    marginThreshold={0}
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    marginThreshold: "0%",
    '&:focus': {
      backgroundColor: theme.palette.action.selected,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.primary.main,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
   orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  logo: {
    color: "#FFF" ,
    textDecoration: "none",
    fontWeight: "20px"
  },
    shadows: ["none"]
,
  drawer: {

    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#FBF4F4",
      shadow: "none"

      // backgroundColor: `#${theme.palette.primary[300].substring(1)}77`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    backgroundColor: theme.palette.action.selected,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  searchTextField: {backgroundColor: theme.palette.action.selected,
                            borderRadius: "10%",
                    },

}));

function ResponsiveDrawer(props) {
  const { container, setCurrentTheme, currentTheme } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { pathname } = useLocation();
  const isHome = false; // pathname === "/";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedItem, setColor] = React.useState('home');


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuColor = (item) => {
      setColor(item)
      return 0;
  }

  // Language code list
 const languages = [
    {
        icon_code: <De/>,
        name: 'Deutsche',
        iso_code: 'de'
    },
     {
        icon_code: <It/>,
        name: 'Italiano',
        iso_code: 'it'
    },
    {
        icon_code: <Fr/>,
        name: 'Français',
        iso_code: 'fr'
    },
    {
        icon_code: <Gb/>,
        name: 'English',
        iso_code: 'en'
    },
    {
        icon_code: <Et/>,
        name: 'አማርኛ',
        iso_code: 'am'
    },
    {
        icon_code: <Er/>,
        name: 'ትግርኛ',
        iso_code: 'ti'
    },
     {
        icon_code: <Sa/>,
        name: 'عربي',
        iso_code: 'ar'
    }
]

// Get current language tag
const getCurrentLanguage = () => {

    let languageTag;
    const userLanguage = localStorage.getItem("i18nextLng");

    // Switch statement is not working as expected

        if (userLanguage === "en")
            languageTag =  <Gb/>;
        else if (userLanguage ==="fr")
            languageTag =  <Fr/>;
        else if (userLanguage === "de")
            languageTag = <De/>;
        else if (userLanguage === "am")
            languageTag = <Et/>;
        else if (userLanguage === "ti")
            languageTag = <Er/>;
        else if (userLanguage ==="it")
            languageTag = <It/>;
        else if (userLanguage ==="ar")
            languageTag = <Sa/>;
        else
            languageTag = <De/>;

    return languageTag;

}


   // Translation object
    const { t } = useTranslation();
   const userLanguage = localStorage.getItem("i18nextLng");

const translate = (key) => {
    return (
        <Translation>
            {
                (t, {i18n}) => <Typography>{t(key)}</Typography>
            }
        </Translation>
    )
}

// Translate placeholder
const translateSearchPlaceholder = () => {

    let placeholder;


    // Switch statement is not working as expected

        if (userLanguage === "en")
            placeholder =  "Search item ...";
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
 let path_name = window.location.pathname;

  const customerMenu = [
          { text: translate('appbaranddrawer_nav_home'), icon: "home", name: HOME_URL },
          { text: translate('appbaranddrawer_nav_cart'), icon: <ShoppingCartIcon/>, name: CART_URL },
          { text: translate('appbaranddrawer_nav_categories'), icon: <CategoryIcon/>, name: CATEGORY_URL },
          // { text: translate('appbaranddrawer_nav_blog'), icon: <LibraryBooksIcon/>, name: BLOG_URL },
          { text: translate('appbaranddrawer_nav_aboutafropa'), icon: <PermDeviceInformationIcon/>, name: ABOUT_URL },

  ]

  const adminMenu = [
         { text: translate('admin.nav.products'), icon: <StorefrontIcon/>, name: MANAGE_PRODUCT_URL },
          { text: translate('admin.nav.user'), icon: <PeopleOutlineIcon/>, name: MANAGE_USER_URL },
          { text: translate('admin.nav.order'), icon: <AddShoppingCartIcon/>, name: MANAGE_ORDER_URL },
          { text: translate('admin.nav.productType'), icon: <ClassIcon/>, name: MANAGE_PRODUCT_TYPE_URL },
          { text: translate('admin.nav.productUnit'), icon: <AssessmentIcon/>, name: MANAGE_PRODUCT_UNIT_URL },
          { text: translate('admin.nav.slider'), icon: <PhotoCameraIcon/>, name: MANAGE_SLIDER_URL },
          { text: translate('admin.nav.setting'), icon: <SettingsIcon/>, name: USER_PROFILE_URL }
  ]

      // Admin mode controller
  let adminMode = (localStorage.getItem("adminMode") === "true");
  const history = useHistory()


  const [state, setState] = React.useState(adminMode);

  // Handle "Admin mode" switch
  const handleAdminSwitchChange = ( event) => {
      setState(event.target.checked );

      // Update locate storage value
      localStorage.setItem("adminMode", event.target.checked);

      let path;

      if(localStorage.getItem("adminMode") === "true")
          path = MANAGE_PRODUCT_URL;
      else
          path = HOME_URL;

      // redirect
      history.push(path)

  };

  const currentMenu = (props.loginUser.isAuthenticated && (localStorage.getItem("adminMode") === "true")) ? adminMenu : customerMenu ;

  const drawer = (
    <div style={{backgroundColor: "#FBF4F4"}}>
      <div className={classes.toolbar} style={{marginTop: "8%"}}/>
      {/*<Divider />*/}
      <List>
        {currentMenu.map(({ text, icon , name}, index) => (
          <ListItem
            component={RouterLink}
            selected={pathname === `${name}`}
            to={`${name}`}
            button onClick={() => handleMenuColor(name)}
            key={name}
          >
            <ListItemIcon>
              <Icon color={path_name === (name) ? "primary" : "black"}>{icon}</Icon>
            </ListItemIcon>
            <Grid container wrap="nowrap"  spacing={3}>
                <Grid item>
                    <ListItemText primary={text}/>
                </Grid>
                {
                    name === CART_URL && (
                                        <Grid item>
                                            <ListItemText style={{color: "#FFBF00"}} primary={props.cart.length}/>
                                        </Grid>
                    )
                }
            </Grid>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  // Search product state
  const [searchProduct, setSearchProduct]= React.useState("");

  const handleSearchProduct = (e) => {

      setSearchProduct(e.target.value);

  }

    const handleSearchProductSubmit = () => {

      let userInput = {
          name: searchProduct,
          locale: userLanguage
      }

      props.categoryAction(userInput, GET_PRODUCT_BY_NAME, CATEGORY_URL)

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  const search = translateSearchPlaceholder();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="sticky" className={isHome ? "" : classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

                      {
                !isMobile &&(
                    <Typography
                    variant="h5"
                    noWrap
                    to={"/"}
                    component={RouterLink}
                    className={classes.logo}
                  >
                    Afro-Store
                  </Typography>
                )}

          <div style={{ flexGrow: 0.8 }}/>

                      {
                !isMobile &&(
                              <img
                                    style={{maxWidth:"15%"}}
                                    alt={"Profile picture"}
                                    src='img/logo/afropa_logo_transparent.png'

                                  />
                )}

                                  {
                isMobile && !props.loginUser.isAuthenticated &&(
                  <TextField
                                      onKeyPress={(ev) => {
                                        console.log(`Pressed keyCode ${ev.key}`);
                                        if (ev.key === 'Enter') {
                                          // Do code here
                                          ev.preventDefault();
                                          handleSearchProductSubmit()
                                        }
                                      }}
                                    variant="outlined"
                                    placeholder={search}
                                    size="small"
                                    class={classes.searchTextField}
                                        id="searchProduct"
                                        name="searchProduct"
                                        autoComplete="searchProduct"
                                        onChange={handleSearchProduct}
                                        value={searchProduct}
                                    InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="end" >
                                        <IconButton onClick={handleSearchProductSubmit}>
                                            <SearchOutlinedIcon style={{color: "gray"}}/>
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  />
                )}

                      {
                !isMobile &&(
              <TextField
                                  onKeyPress={(ev) => {
                                    console.log(`Pressed keyCode ${ev.key}`);
                                    if (ev.key === 'Enter') {
                                      // Do code here
                                      ev.preventDefault();
                                      handleSearchProductSubmit()
                                    }
                                  }}
                                variant="outlined"
                                placeholder={search}
                                size="small"
                                class={classes.searchTextField}
                                    id="searchProduct"
                                    name="searchProduct"
                                    autoComplete="searchProduct"
                                    onChange={handleSearchProduct}
                                    value={searchProduct}
                                InputProps={{
                                startAdornment: (
                                  <InputAdornment position="end" >
                                    <IconButton onClick={handleSearchProductSubmit}>
                                        <SearchOutlinedIcon style={{color: "gray"}}/>
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              />
                )}
          <div style={{ flexGrow: 1 }}/>
          {/*<PalettePicker*/}
          {/*  setCurrentTheme={setCurrentTheme}*/}
          {/*  currentTheme={currentTheme}*/}
          {/*/>*/}


          {/*<Badge badgeContent={4} color="primary">*/}
          {/*  <MailIcon />*/}
          {/*</Badge>*/}

                        {
                props.loginUser.isAuthenticated ? (props.loginUser.user.is_admin === true || props.loginUser.user.is_staff) && !isMobile && (
                     <Grid item style={{marginLeft: "20px"}}>
                          <FormControlLabel style={{color: "orange"}}
                             control={
                          <Switch
                            checked={state}
                            onChange={handleAdminSwitchChange}
                            value="adminChecked"
                            color="primary"
                            />
                            }
                            label={t("admin.mode")}
                          />
                     </Grid>

                ) : ""
            }
            {
                !props.loginUser.isAuthenticated && !isMobile && (
                    <Button
                        color="primary"
                        aria-label="open drawer"
                        edge="end"
                        href={"/login"}
                      >
                          <Typography >
                              {t("appbaranddrawer_nav_login")}
                          </Typography>
                      </Button>
                )
            }



            {
                props.loginUser.isAuthenticated && !isMobile &&(
                    <Button
                        color="primary"
                        aria-label="open drawer"
                        edge="end"
                        href={"/logout"}
                      >
                          <Typography >
                              {t("appbaranddrawer_nav_logout")}
                          </Typography>
                      </Button>
                )
            }

             {/*mobile view */}
                                    {
                props.loginUser.isAuthenticated ? (props.loginUser.user.is_admin === true || props.loginUser.user.is_staff) && isMobile && (
                     <Grid item style={{marginLeft: "20px"}}>
                          <FormControlLabel style={{color: "orange"}}
                             control={
                          <Switch
                            checked={state}
                            onChange={handleAdminSwitchChange}
                            value="adminChecked"
                            color={"textPrimary"}
                            />
                            }
                            label={t("admin.mode")}
                          />
                     </Grid>

                ) : ""
            }
            {
                !props.loginUser.isAuthenticated && isMobile && (
                    <Button
                        color={"textPrimary"}
                        aria-label="open drawer"
                        edge="end"
                        href={"/login"}
                      >
                          <Typography >
                              {t("appbaranddrawer_nav_login")}
                          </Typography>
                      </Button>
                 )
             }



            {
                props.loginUser.isAuthenticated && isMobile &&(
                    <Button
                        color={"textPrimary"}
                        aria-label="open drawer"
                        edge="end"
                        href={"/logout"}
                      >
                          <Typography >
                              {t("appbaranddrawer_nav_logout")}
                          </Typography>
                      </Button>
                )
            }


            {
                (props.loginUser.isAuthenticated && (null !== props.loginUser.user.profile_picture)) && (
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    href={USER_PROFILE_URL}
                  >
                        <Avatar src={props.loginUser.user.profile_picture} />
                  </IconButton>
                )
            }
            {
                (props.loginUser.isAuthenticated && isEmptyUtils(props.loginUser.user.profile_picture) && !isEmptyUtils(props.loginUser.user.email)) && (
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    href={USER_PROFILE_URL}
                  >
                        <Avatar className={classes.orange}>{props.loginUser.user.first_name.charAt(0)}{props.loginUser.user.last_name.charAt(0)}</Avatar>
                  </IconButton>
                )
            }


                <Tooltip title="Select language">
                                            <IconButton aria-label="photo"
                                            onClick={handleClick}
                                            aria-controls="customized-menu"
                                            >
                                                <ArrowDropDownIcon color={"primary"}/>
                                                {getCurrentLanguage()}
                                            </IconButton>
                </Tooltip>


      {/*</Button>*/}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {languages.map(({icon_code, name, iso_code}) =>(
                <div onClick={handleClose}>
                    <StyledMenuItem onClick={() => i18next.changeLanguage(iso_code)}>
                      <ListItemIcon >
                          <IconButton >{icon_code}</IconButton>
                      </ListItemIcon>
                      <Typography color={i18next.language === iso_code ? "primary": "black"}>{name}</Typography>
                    </StyledMenuItem>
                </div>

              ))}

      </StyledMenu>


        </Toolbar>
      </AppBar>
      {isHome && !mobileOpen ? (
        <div />
      ) : (
        <nav aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open={isHome}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
    </div>
  );
}

ResponsiveDrawer.propTypes = {

  adminModeController: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
    categoryAction: PropTypes.func.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  ),
};


const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps, {adminModeController, categoryAction}) (withRouter(ResponsiveDrawer));
