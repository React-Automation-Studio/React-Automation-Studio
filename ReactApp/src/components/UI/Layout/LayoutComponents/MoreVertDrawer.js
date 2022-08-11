import React, { useContext } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom'
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Button from '@mui/material/Button';
const useStyles = makeStyles(theme => ({
    drawerItems: {
        minWidth: 250,
    },
}))

const MoreVertDrawer = (props) => {

    const classes = useStyles(props)

    const context = useContext(AutomationStudioContext)
    const isAdmin = context.userData.roles.includes("admin");

    const { showMVDrawer, setShowMVDrawer } = props

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
                    <ListItem  >
                        <ListItemIcon><InvertColorsIcon /></ListItemIcon>

                        <TextField
                            fullWidth={true}
                            select
                            label="Theme"
                            value={context.themeStyle}
                            onChange={context.changeTheme}
                        >
                            {context.themeStyles.map((option, index) => (
                                <MenuItem key={index.toString()} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </ListItem>
                }
                {(!props.hideAdminLinkListItem && isAdmin) &&
                    <ListItem  >
                        <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>

                        <Button component={Link} to="/administrator" >
                            Administrator
                        </Button>
                    </ListItem>
                }
            </List>
        </div >
    )

    return (
        <SwipeableDrawer
            anchor='right'
            open={showMVDrawer}
            onClose={() => setShowMVDrawer(false)}
            onOpen={() => setShowMVDrawer(true)}
        >
            {moreVertDrawerItems}
        </SwipeableDrawer>
    );
};

export default MoreVertDrawer;