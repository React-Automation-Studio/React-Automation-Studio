The table below lists the alarm actions/events and parameters that the alarm server logs. **Note: As per convention C2, the alarm server does not log any alarm events of disabled alarms.**

<center>
| Action/Event             | Timestamp | Alarm Status | PV Value | Username |
| ------------------------ | :-------: | :----------: | :------: | :------: |
| Alarm triggered          |     X     |      X       |    X     |          |
| Alarm acknowledged       |     X     |      X       |          |    X     |
| Alarm demoted            |     X     |      X       |          |          |
| PV enabled/disabled      |     X     |              |          |          |
| SubArea enabled/disabled |     X     |              |          |          |
| Area enabled/disabled    |     X     |              |          |          |
</center>
<center>*Table 3: Actions and events logged by alarm server*</center>
<br/><br/>

The remainder of the user guide addresses the alarm handler user interface. This is comprised of two views - an alarm setup view and a user notification view.