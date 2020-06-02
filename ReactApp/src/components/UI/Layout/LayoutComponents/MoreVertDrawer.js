import React, {  useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

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
                    <ListItem button onClick={context.toggleTheme} >
                        <ListItemIcon><InvertColorsIcon /></ListItemIcon>
                        <ListItemText primary={"Toggle Theme"} />
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