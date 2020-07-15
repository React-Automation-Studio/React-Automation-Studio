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
            title={props.title}
            alignTitle="center"
            titleVariant="h6"
            titleTextStyle={{ textTransform: 'uppercase' }}
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
    /** Title of Alarm Handler - to be displayed in the app bar */
    title: PropTypes.string,
    /** Name of the MongoDB alarm database to connect to */
    alarmDatabaseName: PropTypes.string,
}

AlarmHandler.defaultProps = {
    title: '',
    alarmDatabaseName: ''
}

export default React.memo(AlarmHandler);