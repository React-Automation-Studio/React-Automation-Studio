The alarm handler maps the EPICS database record alarm severity (SEVR) field to an alarm status as follows:

<center>
| EPICS SEVR | Alarm Status   |
| ---------- | -------------- |
| NO\_ALARM  | MAJOR\_ALARM   |
| MINOR      | MINOR\_ALARM   |
| MAJOR      | MAJOR\_ALARM   |
| INVALID    | INVALID\_ALARM |
</center>
<center>*Table 1: Mapping of EPICS record SEVR to alarm handler alarm status*</center>
<br/><br/>

In addition to this, the alarm handler also has three acknowledge statuses to indicate when an alarm has been acknowledged. An alarm can thus be in one of seven (7) states as depicted in the table below. Each state is also colour coded (changing the theme can result in alarm colour variations).

<center>
| Alarm          | Acknowledged   |
| -------------- | -------------- |
| NO\_ALARM      | NO\_ALARM      |
| MINOR\_ALARM   | MINOR\_ACKED   |
| MAJOR\_ALARM   | MAJOR\_ACKED   |
| INVALID\_ALARM | INVALID\_ACKED |
</center>
<center>*Table 2: Alarm states*</center>
<br/><br/>

The alarm server ranks the seven (7) states from best (least severe) to worst (most severe) severity as follows:

<center>
| Alarm Status   | Rank                |
| -------------- | ------------------- |
| NO\_ALARM      | Best (least severe) |
| MINOR\_ACKED   |                     |
| MAJOR\_ACKED   |                     |
| INVALID\_ACKED |                     |
| MINOR\_ALARM   |                     |
| MAJOR\_ALARM   |                     |
| INVALID\_ALARM | Worst (most severe) |
</center>
<center>*Table 2: Alarm severity ranking*</center>
<br/><br/>