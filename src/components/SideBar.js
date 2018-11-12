import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import RegisterIcon from "@material-ui/icons/AccountBox";
import LoginIcon from "@material-ui/icons/ExitToApp";
import ReportIcon from "@material-ui/icons/ReportProblem";
import DiscoveryIcon from "@material-ui/icons/AddLocation";
import LogoutIcon from "@material-ui/icons/Reply";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "transparent",
    zIndex: "1000",
    position: "absolute"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      sideMenuOpen: this.props.sideMenuOpen,
      isLoggedIn: false
    };
  }

  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { classes, theme } = this.props;

    const sidebar = (
      <List>
        <ListItem
          className={styles.profile__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(routerRedux.push({ pathname: "/profile" }));
          }}
        >
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          Profile
        </ListItem>
        <ListItem
          className={styles.report__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(routerRedux.push({ pathname: "/report" }));
          }}
        >
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          Report
        </ListItem>
        <ListItem
          className={styles.discovery__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(
              routerRedux.push({ pathname: "/new_discovery" })
            );
          }}
        >
          <ListItemIcon>
            <DiscoveryIcon />
          </ListItemIcon>
          New Discovery
        </ListItem>
        <ListItem
          className={styles.logout__text}
          onClick={e => {
            e.stopPropagation();
            localStorage.clear();
            this.props.dispatch(routerRedux.push({ pathname: "/logout" }));
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </ListItem>
      </List>
    );
    const sidebarWithoutLogin = (
      <List>
        <ListItem
          className={styles.profile__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(routerRedux.push({ pathname: "/login" }));
          }}
        >
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          Login
        </ListItem>
        <ListItem
          className={styles.report__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(routerRedux.push({ pathname: "/register" }));
          }}
        >
          <ListItemIcon>
            <RegisterIcon />
          </ListItemIcon>
          Register
        </ListItem>
        <ListItem
          className={styles.discovery__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(routerRedux.push({ pathname: "/login" }));
          }}
        >
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          Report
        </ListItem>
        <ListItem
          className={styles.logout__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(routerRedux.push({ pathname: "/login" }));
          }}
        >
          <ListItemIcon>
            <DiscoveryIcon />
          </ListItemIcon>
          New Discovery
        </ListItem>
      </List>
    );

    const isLoggedIn = this.state.isLoggedIn;
    let displayMenu;
    if (isLoggedIn) {
      displayMenu = sidebar;
    } else {
      displayMenu = sidebarWithoutLogin;
    }

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        {displayMenu}
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return state;
}
SideBar = withStyles(styles, { withTheme: true })(SideBar);
export default connect(mapStateToProps)(SideBar);

// import React from "react";
// import { connect } from "dva";
// // import PropTypes from 'prop-types';
// import styles from "./SideBar.css";
// // import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';
// // import Button from '@material-ui/core/Button';
// // import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// // import Grow from '@material-ui/core/Grow';
// // import Paper from '@material-ui/core/Paper';
// // import Popper from '@material-ui/core/Popper';
// // import MenuItem from '@material-ui/core/MenuItem';
// // import MenuList from '@material-ui/core/MenuList';
// // import { withStyles } from '@material-ui/core/styles';
// // import ListItemIcon from '@material-ui/core/ListItemIcon';
// import MenuIcon from '@material-ui/icons/Menu';
// import ProfileIcon from '@material-ui/icons/AccountCircle';
// import RegisterIcon from '@material-ui/icons/AccountBox';
// import LoginIcon from '@material-ui/icons/ExitToApp';
// import ReportIcon from '@material-ui/icons/ReportProblem';
// import DiscoveryIcon from '@material-ui/icons/AddLocation';
// import LogoutIcon from '@material-ui/icons/Reply';
// import { Drawer } from "antd-mobile";
// import { routerRedux } from "dva/router";

// class SideBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleLoginClick = this.handleLoginClick.bind(this);
//     this.handleLogoutClick = this.handleLogoutClick.bind(this);
//     this.state = {
//       sideMenuOpen: this.props.sideMenuOpen,
//       isLoggedIn: false
//     };
//   }

//   handleLoginClick() {
//     this.setState({isLoggedIn: true});
//   }

//   handleLogoutClick() {
//     this.setState({isLoggedIn: false});
//   }

//   render() {
//     const sidebar = (
//       <div className={styles.sidebar__background}><div><span className={styles.menuButton}>Menu</span><MenuIcon className={styles.menuIcon}/></div>
//         <div className={styles.sidebar__menu}>
//           <div
//             className={styles.profile__text}
//             onClick={e => {
//               e.stopPropagation();
//               this.props.dispatch(routerRedux.push({ pathname: "/profile" }));
//             }}
//           ><ProfileIcon />
//             Profile
//           </div>
//           <div
//             className={styles.report__text}
//             onClick={e => {
//               e.stopPropagation();
//               this.props.dispatch(routerRedux.push({ pathname: "/report" }));
//             }}
//           ><ReportIcon />
//             Report
//           </div>
//           <div
//             className={styles.discovery__text}
//             onClick={e => {
//               e.stopPropagation();
//               this.props.dispatch(routerRedux.push({ pathname: "/new_discovery" }));
//             }}
//           ><DiscoveryIcon />
//             New Discovery
//           </div>
//           <div
//             className={styles.logout__text}
//             onClick={e => {
//               e.stopPropagation();
//               localStorage.clear()
//               this.props.dispatch(routerRedux.push({ pathname: "/logout" }));
//             }}
//           ><LogoutIcon />
//             Logout</div>
//         </div>
//       </div>
//     );
//     const sidebarWithoutLogin = (
//       <div className={styles.sidebar__background}><div><span className={styles.menuButton}>Menu</span><MenuIcon className={styles.menuIcon}/></div>
//         <div className={styles.sidebar__menu}>
//           <div
//             className={styles.profile__text}
//             onClick={e => {
//               e.stopPropagation();
//               this.props.dispatch(routerRedux.push({ pathname: "/login" }));
//             }}
//           ><LoginIcon />
//             Login
//           </div>
//           <div
//             className={styles.report__text}
//             onClick={e => {
//               e.stopPropagation();
//               this.props.dispatch(routerRedux.push({ pathname: "/register" }));
//             }}
//           ><RegisterIcon />
//             Register
//           </div>
//           <div
//             className={styles.discovery__text}
//             onClick={e => {
//               e.stopPropagation();
//               this.props.dispatch(routerRedux.push({ pathname: "/login" }));
//             }}
//           ><ReportIcon />
//             Report
//           </div>
//           <div
//             className={styles.logout__text}
//             onClick={e => {
//               e.stopPropagation();
//               this.props.dispatch(routerRedux.push({ pathname: "/login" }));
//             }}
//           ><DiscoveryIcon />
//             New Discovery
//           </div>
//         </div>
//       </div>
//     );
//     const isLoggedIn = this.state.isLoggedIn;
//     let displayMenu;
//     if (isLoggedIn) {
//       displayMenu = sidebar;
//     } else {
//       displayMenu = sidebarWithoutLogin;
//     }
//     return (
//       <div>
//         <div
//           className={styles.button__menu}
//           onClick={() => this.onOpenChange()}
//         />

//         <Drawer
//           className="my-drawer"
//           style={{
//             minHeight: document.documentElement.clientHeight,
//             fontSize: 10
//           }}
//           contentStyle={{ color: "#A6A6A6", textAlign: "center" }}
//           sidebar={displayMenu}
//           open={this.state.sideMenuOpen}
//           onOpenChange={() => this.onOpenChange()}
//           children={<div />}
//         />
//       </div>
//     );
//   }

//   onOpenChange() {
//     if (this.state.buttonStyle !== styles.button__animated) {
//       this.setState({
//         sideMenuOpen: !this.state.sideMenuOpen,
//         buttonStyle: styles.button__animated
//       });
//     } else {
//       this.setState({
//         sideMenuOpen: !this.state.sideMenuOpen,
//         buttonStyle: styles.button__animated_reverse
//       });
//     }
//   }
// }

// SideBar.propTypes = {};

// function mapStateToProps(state) {
//   return state;
// }

// export default connect(mapStateToProps)(SideBar);
