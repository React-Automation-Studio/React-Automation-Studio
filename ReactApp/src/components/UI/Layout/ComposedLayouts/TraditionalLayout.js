import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Card from '@material-ui/core/Card';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

import SideDrawer from '../LayoutComponents/SideDrawer'
import MoreVertDrawer from '../LayoutComponents/MoreVertDrawer'

import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';
import RedirectToLogIn from '../../../SystemComponents/RedirectToLogin.js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

    const [showDrawer, setShowDrawer] = useState(false)
    const [showMVDrawer, setShowMVDrawer] = useState(false)



    return (
        <React.Fragment>
            <CssBaseline />
            {/* <ElevationScroll {...props}> */}
                <AppBar color={themeType === 'dark' ? "inherit" : "primary"} position={notInStyleGuide ? undefined : "static"}  elevation={theme.palette.paperElevation}>
                    <Toolbar variant={props.denseAppBar ? "dense" : undefined} style={{ display: "flex" }}>
                        <IconButton
                            onClick={() => setShowDrawer(true)}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <SideDrawer
                            showDrawer={showDrawer}
                            setShowDrawer={setShowDrawer}
                            hideDrawerAfterItemClick={props.hideDrawerAfterItemClick}
                            hideHomeDrawerButton={props.hideHomeDrawerButton}
                            drawerItems={props.drawerItems}
                        />
                        {props.title&&<Typography
                            className={classes.titleText}
                            variant={props.titleVariant}
                        >
                            {props.title}
                        </Typography>}
                        {props.tabs&&
                        <Tabs
                        style={{flexGrow: 1000,}}
                        value={props.tabValue}
                        onChange={props.handleTabChange}
                        {...props.tabProps}
                        
        
                        >
                            {props.tabs.map((option,index)=>(
                                <Tab key= {index.toString()} label={option}/>
                            ))}
                        </Tabs>}
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
                                <MoreVertDrawer
                                    showMVDrawer={showMVDrawer}
                                    setShowMVDrawer={setShowMVDrawer}
                                    hideMoreVertDrawerAfterItemClick={props.hideMoreVertDrawerAfterItemClick}
                                    moreVertDrawerItems={props.moreVertDrawerItems}
                                    hideToggleThemeListItem={props.hideToggleThemeListItem}
                                />
                            </React.Fragment>}
                    </Toolbar>
                </AppBar>
            {/* </ElevationScroll> */}
            {notInStyleGuide && <div style={{ marginBottom: props.denseAppBar ? "3em" : "4em" }} />}
            <React.Fragment>
                {/* ---Children--- */}
                {props.children}
                {/* ---Children--- */}
            </React.Fragment>
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