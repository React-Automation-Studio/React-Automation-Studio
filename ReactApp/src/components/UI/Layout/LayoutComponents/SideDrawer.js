import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { Logout } from 'mdi-material-ui/'

import { makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';

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
    const socket = context.socket

    const username = notInStyleGuide ? context.userData.username : "Guest"

    const { showDrawer, setShowDrawer } = props

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