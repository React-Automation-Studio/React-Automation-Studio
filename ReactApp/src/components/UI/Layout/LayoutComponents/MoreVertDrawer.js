import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import InvertColorsIcon from '@material-ui/icons/InvertColors';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';

const useStyles = makeStyles(theme => ({
    drawerItems: {
        minWidth: 250,
    },
}))

const MoreVertDrawer = (props) => {

    const classes = useStyles(props)

    const context = useContext(AutomationStudioContext)
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