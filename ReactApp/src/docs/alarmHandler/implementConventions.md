The alarm handler maps the EPICS database record alarm severity (SEVR) field to an alarm status as follows:

<center>
| EPICS SEVR | Alarm Status   |
| ---------- | -------------- |
| NO\_ALARM  | NO\_ALARM   |
| MINOR      | MINOR\_ALARM   |
| MAJOR      | MAJOR\_ALARM   |
| INVALID    | INVALID\_ALARM |
</center>
<center>*Table 1: Mapping of EPICS record SEVR to alarm handler alarm status*</center>
<br/><br/>

In addition to this, the alarm handler also has a DISCONNECTED alarm and four acknowledge statuses to indicate when an alarm has been acknowledged. An alarm can thus be in one of nine (9) states as depicted in the table below. Each state is also colour coded (changing the theme can result in alarm colour variations).

<center>
<img src="img/alarmHandler/Alarm_colours2.png" alt="alarmSetup_ExpansionPanel1" width="30%"/>
</center>
<center>*Table 2: Alarm states and colours*</center>
<br/><br/>

The alarm server ranks the nine (9) states from best (least severe) to worst (most severe) severity as follows:

<center>
| Alarm Status   | Rank                |
| -------------- | ------------------- |
| NO\_ALARM      | Best (least severe) |
| MINOR\_ACKED   |                     |
| MAJOR\_ACKED   |                     |
| INVALID\_ACKED |                     |
| DISCONN_ACKED  |                     |
| MINOR\_ALARM   |                     |
| MAJOR\_ALARM   |                     |
| INVALID\_ALARM |                     |
| DISCONNECTED   | Worst (most severe) |
</center>
<center>*Table 3: Alarm severity ranking*</center>
<br/><br/>