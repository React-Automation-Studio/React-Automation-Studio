import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'

import { Logout } from 'mdi-material-ui/'
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Card from '@material-ui/core/Card';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import RedirectToLogIn from '../../SystemComponents/RedirectToLogin.js';

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: 20,
        flexGrow: 1
    },
    drawerItems: {
        minWidth: 250,
    },
    moreVert: {
        marginLeft: 'auto',
        flexGrow: 1
    },
    titleText: props => ({
        textAlign: props.alignTitle,
        flexGrow: 1000,
        ...props.titleTextStyle
    }),
    bottomNavigation: props => ({
        width: '100%',
        position: 'fixed',
        bottom: 0,
        height: props.footerHeight,
        borderRadius: 0,
        boxShadow: theme.shadows[24]
    })
}));

/**
* The TraditionalLayout Component is a wrapper on the Material-UI AppBar, BottomNavigation and Drawer components. The TraditionalLayout is intended to wrap content to provide a consistent look and feel across all interfaces.<br/><br/>
* The TraditionalLayout component is implemented with an elevated appbar (content scrolls under appbar), fixed footer (footer fixed to bottom of window) and swipeable drawers (swipe from left/right on touch devices).<br/><br/> 
* When used outside of the styleguide the appbar and footer will span the entire window.<br/><br/>

*/
const TraditionalLayout = (props) => {

    const classes = useStyles(props)
    const theme = useTheme()

    const themeType = theme.palette.type

    const context = useContext(AutomationStudioContext)
    const notInStyleGuide = context.styleGuideRedirect
    const socket = context.socket

    const username = notInStyleGuide ? context.userData.username : "Guest"

    const [showDrawer, setShowDrawer] = useState(false)
    const [showMVDrawer, setShowMVDrawer] = useState(false)

    const handleLogout = () => {
        if (notInStyleGuide) {
            socket.emit('disconnect', { "goodebye": "see you later" });
            socket.close()
            context.logout();
        }

    }

    const drawerItems = (
        <div className={classes.drawerItems}>
            <List onClick={props.hideDrawerAfterItemClick ? () => setShowDrawer(false) : null}>
                {!props.hideHomeDrawerButton &&
                    <ListItem button component={notInStyleGuide ? Link : 'div'} to="/" >
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                }
                {props.drawerItems && !props.hideHomeDrawerButton &&
                    <Divider />
                }
                {/* Drawer list items from user */}
                {props.drawerItems}
                {/* Drawer list items from user */}
                {process.env.REACT_APP_EnableLogin === 'true' &&
                    <React.Fragment>
                        <Divider />
                        <ListItem>
                            <ListItemIcon><AccountCircle /></ListItemIcon>
                            <ListItemText style={{ textOverflow: 'ellipsis' }} primary={username} />
                        </ListItem>
                        <ListItem button onClick={handleLogout} component={notInStyleGuide ? Link : 'div'} to="/LogIn" >
                            <ListItemIcon><Logout /></ListItemIcon>
                            <ListItemText primary={"Log Out"} />
                        </ListItem>
                    </React.Fragment>
                }
            </List>

        </div>
    )

    const moreVertDrawerItems = (
        <div className={classes.drawerItems}>
            <List onClick={props.hideMoreVertDrawerAfterItemClick ? () => setShowMVDrawer(false) : null}>
                {props.moreVertDrawerItems &&
                    <React.Fragment>
                        {/* MoreVert drawer list items from user */}
                        {props.moreVertDrawerItems}
                        {/* MoreVert drawer list items from user */}
                        <Divider />
                    </React.Fragment>
                }

                {!props.hideToggleThemeListItem &&
                    <ListItem button onClick={context.toggleTheme} >
                        <ListItemIcon><InvertColorsIcon /></ListItemIcon>
                        <ListItemText primary={"Toggle Theme"} />
                    </ListItem>
                }
            </List>
        </div >
    )

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar color={themeType === 'dark' ? "inherit" : "primary"} position={notInStyleGuide ? undefined : "static"}>
                    <Toolbar variant={props.denseAppBar ? "dense" : undefined} style={{ display: "flex"}}>
                        <IconButton
                            onClick={() => setShowDrawer(true)}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <SwipeableDrawer
                            open={showDrawer}
                            onClose={() => setShowDrawer(false)}
                            onOpen={() => setShowDrawer(true)}
                        >
                            {drawerItems}
                        </SwipeableDrawer>
                        <Typography
                            className={classes.titleText}
                            variant={props.titleVariant}
                        >
                            {props.title}
                        </Typography>
                        {!props.hideMoreVertMenu &&
                            <React.Fragment>
                                <IconButton
                                    className={classes.moreVert}
                                    aria-label="display more actions"
                                    edge="end"
                                    color="inherit"
                                    onClick={() => setShowMVDrawer(true)}
                                >
                                    <MoreVertRoundedIcon />
                                </IconButton>
                                <SwipeableDrawer
                                    anchor='right'
                                    open={showMVDrawer}
                                    onClose={() => setShowMVDrawer(false)}
                                    onOpen={() => setShowMVDrawer(true)}
                                >
                                    {moreVertDrawerItems}
                                </SwipeableDrawer>
                            </React.Fragment>}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {notInStyleGuide && <div style={{ marginBottom: props.denseAppBar ? "3em" : "4em" }} />}
            <main>
                {/* ---Children--- */}
                {props.children}
                {/* ---Children--- */}
            </main>
            {props.showFooter &&
                <React.Fragment>
                    <BottomNavigation
                        className={classes.bottomNavigation}
                        component={Card}
                        style={{
                            position: notInStyleGuide ? undefined : "relative",
                            backgroundColor: themeType === 'dark' ? undefined : theme.palette.primary.main
                        }}
                    >
                        {props.footerContents}
                    </BottomNavigation>
                    {notInStyleGuide && <div style={{ marginBottom: props.footerHeight }} />}
                </React.Fragment>
            }
            {notInStyleGuide && <RedirectToLogIn />}
        </React.Fragment>
    );
};

TraditionalLayout.propTypes = {
    /** Title to be displayed in the app bar **/
    title: PropTypes.string,
    /** Alignment of the title in the app bar **/
    alignTitle: PropTypes.oneOf(['left', 'center', 'right']),
    /** Typography variant of the title text **/
    titleVariant: PropTypes.string,
    /** JSX style to override title text defaults **/
    titleTextStyle: PropTypes.object,
    /** Directive to use dense variant of the app bar **/
    denseAppBar: PropTypes.bool,
    /** Items to be displayed in the side drawer (left side) **/
    drawerItems: PropTypes.element,
    /** Items to be displayed in the more vert side drawer (right side) **/
    moreVertDrawerItems: PropTypes.element,
    /** Directive to hide the more vert side drawer icon and menu **/
    hideMoreVertMenu: PropTypes.bool,
    /** Directive to hide the 'Toggle Theme' item in the more vert side drawer menu **/
    hideToggleThemeListItem: PropTypes.bool,
    /** Directive to hide the 'Home' item in the side drawer menu **/
    hideHomeDrawerButton: PropTypes.bool,
    /** Directive to hide side drawer once item on it has been clicked **/
    hideDrawerAfterItemClick: PropTypes.bool,
    /** Directive to hide more vert side drawer once item on it has been clicked **/
    hideMoreVertDrawerAfterItemClick: PropTypes.bool,
    /** Directive to show Footer element **/
    showFooter: PropTypes.bool,
    /** Height of the Footer element **/
    footerHeight: PropTypes.number,
    /** Items to be displayed in the Footer element **/
    footerContents: PropTypes.element,
}

TraditionalLayout.defaultProps = {
    title: null,
    alignTitle: 'left',
    titleVariant: "h6",
    titleTextStyle: {},
    denseAppBar: false,
    drawerItems: null,
    moreVertDrawerItems: null,
    hideMoreVertMenu: false,
    hideToggleThemeListItem: false,
    hideHomeDrawerButton: false,
    hideDrawerAfterItemClick: false,
    hideMoreVertDrawerAfterItemClick: false,
    showFooter: false,
    footerHeight: 30,
    footerContents: null
}

export default React.memo(TraditionalLayout);