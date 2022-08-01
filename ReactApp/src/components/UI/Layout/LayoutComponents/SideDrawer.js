import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { Logout } from 'mdi-material-ui/'

import makeStyles from '@mui/styles/makeStyles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Home from '@mui/icons-material/Home';

import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';

const useStyles = makeStyles(theme => ({
    drawerItems: {
        minWidth: 250,
    },
}))

const SideDrawer = (props) => {

    const classes = useStyles(props)

    const context = useContext(AutomationStudioContext)
    const notInStyleGuide = context.styleGuideRedirect

    const username = notInStyleGuide ? context.userData.username : "Guest"

    const { showDrawer, setShowDrawer } = props

    const handleLogout = () => {
        if (notInStyleGuide) {
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
                        <ListItem button component={Link} to="userprofile">
                            <ListItemIcon><AccountCircle /></ListItemIcon>
                            <ListItemText style={{ textOverflow: 'ellipsis' }} primary={username} />
                        </ListItem>
                        <ListItem button onClick={handleLogout} component={notInStyleGuide ? Link : 'div'} to="/Login" >
                            <ListItemIcon><Logout /></ListItemIcon>
                            <ListItemText primary={"Log Out"} />
                        </ListItem>
                    </React.Fragment>
                }
            </List>
        </div>
    )

    return (
        <SwipeableDrawer
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            onOpen={() => setShowDrawer(true)}
        >
            {drawerItems}
        </SwipeableDrawer>
    );
};

export default SideDrawer;