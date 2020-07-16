import React, { useState } from 'react';

import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import TableChartIcon from '@material-ui/icons/TableChart';

import Layout from '../UI/Layout/ComposedLayouts/TraditionalLayout';
import AlarmSetup from './AlarmSetup';
import UserNotification from './UserNotification';

/**
* This is a preview AlarmHandler component. This component is built on a React Automation Studio based front end that connects 
* to an alarm server back end.
* 
* The AlarmHandler component is still in development and is not considered production ready. Follow the setup and user guides is the Style
* Guide to deploy the AlarmHandler for testing and experimentation.
* <br/><br/>
*/
const AlarmHandler = (props) => {

    const [userSetup, setUserSetup] = useState(false)

    const moreVertDrawerItems = (
        <React.Fragment>
            <ListItem button onClick={() => setUserSetup(!userSetup)} >
                {userSetup
                    ? <React.Fragment>
                        <ListItemIcon >
                            <TableChartIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={"Alarm Table"} />
                    </React.Fragment>

                    : <React.Fragment>
                        <ListItemIcon >
                            <ContactPhoneIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={"Configure user notification"} />
                    </React.Fragment>
                }
            </ListItem>
        </React.Fragment>
    )

    return (
        <Layout
            {...props.titleProps}
            denseAppBar
            moreVertDrawerItems={moreVertDrawerItems}
            hideMoreVertDrawerAfterItemClick
        >
            {userSetup
                ? <UserNotification
                    dbName={props.alarmDatabaseName}
                />
                : <AlarmSetup
                    dbName={props.alarmDatabaseName}
                />
            }

        </Layout>
    );
};

AlarmHandler.propTypes = {
    /** Name of the MongoDB alarm database to connect to */
    alarmDatabaseName: PropTypes.string,
    /** Props passed to the underlying TraditionalLayout component and style the title displayed in the app bar.
     * See TraditionalLayout component for more information.
    */
    titleProps: PropTypes.object,
}

AlarmHandler.defaultProps = {
    titleProps: {},
    alarmDatabaseName: ''
}

export default React.memo(AlarmHandler);