A hierarchy of authority can be established for the alarm handler using roles. This is to ensure the desired mode of operation and security. Three roles are defined in this hierarchy: (1) alarmAdmin, (2) alarmUser, and (3) alarmObserver. These roles have the following rights:

<br/>
<center>
|                                                                      | alarmAdmin    |   alarmUser  |    alarmObserver |
|----------------------------------------------------------------------|:-------------:|:------------:|:----------------:|
| View alarms                                                          | [x]           | [x]          | [x]              |
| View areas and subAreas                                              | [x]           | [x]          | [x]              |
| View alarm logs                                                      | [x]           | [x]          | [x]              |
| Enable/disable alarms                                                | [x]           | [x]          |                  |
| Set latch and notify settings for alarms                             | [x]           | [x]          |                  |
| Enable/disable areas and subAreas                                    | [x]           | [x]          |                  |
| Acknowledge alarms and area/subArea alarms                           | [x]           | [x]          |                  |
| View and edit own notification expressions and schedules             | [x]           | [x]          | [x]              |
| View and edit other users' notification expressions and schedule     | [x]           |              |                  |
| Add/remove alarms                                                    | [x]           |              |                  |
| Add/remove areas and subAreas                                        | [x]           |              |                  |
| Add/remove alarm users                                               | [x]           |              |                  |
</center>
<center>*Table 2: Alarm handler hierarchy of authority*</center>
<br/><br/>

The screenshots below show the user access control group (UAG) configurations for each of the roles described above. **These settings assume that the alarm handler EPICS record prefix is `alarmIOC:` and that the alarm handler MongoDB database is named `demoAlarmDatabase`**.