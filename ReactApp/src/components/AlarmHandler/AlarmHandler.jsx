import React, { useState } from 'react';

import PropTypes from 'prop-types';

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

    const [tabVal, setTabVal] = useState(0)

    return (
        <Layout
            {...props.titleProps}
            denseAppBar
            tabs={['Alarm Table', 'Notification Setup']}
            tabValue={tabVal}
            handleTabChange={(event, value) => setTabVal(value)}
        >
            {tabVal === 1
                ? <UserNotification
                    dbName={props.alarmDatabaseName}
                    AHDBVer={props.alarmDatabaseVersion}
                />
                : <AlarmSetup
                    dbName={props.alarmDatabaseName}
                    AHDBVer={props.alarmDatabaseVersion}
                />
            }

        </Layout>
    );
};

AlarmHandler.propTypes = {
    /** Name of the MongoDB alarm database to connect to */
    alarmDatabaseName: PropTypes.string,
    /** Version of the MongoDB alarm database configuration */
    alarmDatabaseVersion: PropTypes.number,
    /** Props passed to the underlying TraditionalLayout component and style the title displayed in the app bar.
     * See TraditionalLayout component for more information.
    */
    titleProps: PropTypes.object,
}

AlarmHandler.defaultProps = {
    titleProps: {},
    alarmDatabaseName: '',
    alarmDatabaseVersion: 1.5
}

export default React.memo(AlarmHandler);