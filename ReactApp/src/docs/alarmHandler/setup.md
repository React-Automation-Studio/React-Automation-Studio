The AlarmHandler component is built on a React Automation Studio based front end that connects to an alarm server back end.

The alarm server is written in Python and makes use of a MongoDB database to persist and archive alarm data. The alarm server must be configured correctly before connecting it to the AlarmHandler component on the front end.

**Breaking Change**
There has a time format change from V2.1.0 to V2.2.0 and you will need to clean the ALARM_DATABASE