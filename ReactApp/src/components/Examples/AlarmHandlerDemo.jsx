import React from 'react';
import AlarmHandler from '../AlarmHandler/AlarmHandler'

const AlarmHandlerDemo = () => {
    return (
        <AlarmHandler
            titleProps={{
                title: "Demo Alarm Handler",
                alignTitle: "center",
                titleVariant: "h6",
                titleTextStyle: { textTransform: 'uppercase' }
            }}
            alarmDatabaseName="demoAlarmDatabase"
        />
    );
};

export default AlarmHandlerDemo;