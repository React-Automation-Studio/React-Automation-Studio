This section describes the conventions that the alarm server adopts when alarm events occur (alarm triggered, acknowledged, enabled/disabled etc). These conventions can be seen as the rules that define the behaviour and response of the alarm server to the various alarm events.

These conventions will be refined and optimised as the alarm handler and server is developed further. We hope in future many of these rules/conventions will be able to be customised (in the form of alarm server settings) to cater to specific user requirements.

<br/>
**C1. Acknowledgement of alarms:**<br/>
An unlatched alarm is always acknowledged to its corresponding \_ACKED state as per Fig 2 above. A latched alarm is always acknowledged to the \_ACKED state of its current alarm severity level. The table below shows this convention in practice. 

<center>
| Current alarm status | Current alarm severity | When acknowledged |
| -------------------- | ---------------------- | ----------------- |
| MAJOR\_ALARM         | MAJOR\_ALARM           | MAJOR\_ACKED      |
| MAJOR\_ALARM         | MINOR\_ALARM           | MINOR\_ACKED      |
| MINOR\_ALARM         | NO\_ALARM              | NO\_ALARM         |
</center>

**C1.1 When acknowledged alarms are triggered:**<br/>
An alarm in an \_ACKED state whose alarm severity worsens will trigger a new alarm. An alarm in an \_ACKED state whose alarm severity improves will not trigger a new alarm - it will be demoted to the \_ACKED state corresponding to the new alarm severity. The table below shows this convention in practice. 

<center>
| Current alarm status | New alarm severity | New alarm status |
| -------------------- | ------------------ | ---------------- |
| MAJOR\_ACKED         | MAJOR\_ALARM       | MAJOR\_ACKED     |
| MINOR\_ACKED         | MAJOR\_ALARM       | MAJOR\_ALARM     |
| MAJOR\_ACKED         | MINOR\_ALARM       | MINOR\_ACKED     |
| MAJOR\_ACKED         | NO\_ALARM          | NO\_ALARM        |
</center>

<br/>
**C2. Disabled alarms:**<br/>

<br/>
**C3. Latched alarms:**<br/>

<br/>
**C4. Propagation of alarms up to subAreas and areas:**<br/>

**C4.1 Precedence of active alarms in subAreas and areas:**<br/>

**C4.2 Disabled alarms in subAreas and areas:**<br/>