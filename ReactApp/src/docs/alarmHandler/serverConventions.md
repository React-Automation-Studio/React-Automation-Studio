This section describes the conventions that the alarm server adopts when alarm events occur (alarm triggered, acknowledged, enabled/disabled etc). These conventions can be seen as the rules that define the behaviour and response of the alarm server to the various alarm events.

These conventions will be refined and optimised as the alarm handler and server is developed further. We hope in future many of these rules/conventions will be able to be customised (in the form of alarm server settings) to cater to specific user requirements.

<br/>
**C1. Acknowledgement of alarms:**<br/>
An unlatched alarm is always acknowledged to its corresponding \_ACKED state as per Table 2 above. A latched alarm is always acknowledged to the \_ACKED state of its current alarm severity level. The table below shows this convention in practice. 

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

**C1.2 Unacknowledging and reacknowledging alarms:**<br/>
It is currently not possible to unacknowledge an alarm - i.e. revert back to an alarm state. Alarms in an \_ACKED state cannot be acknowledged again.

**C1.3 Last alarm acknowledge time:**<br/>
The last alarm acknowledge time is updated whenever an alarm is acknowledged from an alarm state to an \_ACKED state. Acknowledging an alarm that is already in an \_ACKED state is an invalid action and will not update this timestamp.

<br/>
**C2. Disabled alarms:**<br/>
Disabled alarms behave like unlatched alarms. The alarm status, last alarm value and last alarm time will be updated accordingly. However, disabled alarms will not propagate their severity up to their subAreas or areas nor are their alarm events logged.

<br/>
**C3. Latched alarms:**<br/>
A latched alarm will always latch on its worst alarm severity. Its last alarm value and last alarm time will also latch the value and time when its worst alarm was triggered. The table below shows this convention in practice.

<center>
| Current alarm status | New alarm severity | New alarm status | Update LAST ALM VAL and TIME? |
| -------------------- | ------------------ | ---------------- | ----------------------------- |
| MAJOR\_ALARM         | MAJOR\_ALARM       | MAJOR\_ALARM     | No                            |
| MINOR\_ALARM         | MAJOR\_ALARM       | MAJOR\_ALARM     | Yes                           |
| MAJOR\_ALARM         | NO\_ALARM          | MAJOR\_ALARM     | No                            |
</center>

**C3.1 Last alarm value and last alarm time:**<br/>
The last alarm value and last alarm time are updated whenever an alarm is triggered. For an unlatched alarm this value and time is updated on transition to any new alarm severity. For a latched alarm this value and time is only updated on transition to a worse alarm severity.

<br/>
**C4. Propagation of alarms up to subAreas and areas:**<br/>
SubAreas and areas are in themselves entities with their own alarm statuses and severities. A subArea or area will always reflect the worst severity of the pvs under it. The table below shows this convention in practice.

<center>
| pv0          | pv1          | pv2          | subArea/Area severity |
| ------------ | ------------ | ------------ | --------------------- |
| MAJOR\_ALARM | MINOR\_ALARM | NO\_ALARM    | MAJOR\_ALARM          |
| MINOR\_ALARM | NO\_ALARM    | MINOR\_ALARM | MINOR\_ALARM          |
| NO\_ALARM    | NO\_ALARM    | NO\_ALARM    | NO\_ALARM             |
</center>

**C4.1 Precedence of active alarms in subAreas and areas:**<br/>
As shown in the alarm severity ranking above in Table 2, active alarms will always supersede _ACKED alarms. The table below shows this convention in practice.

<center>
| pv0          | pv1            | pv2          | subArea/Area severity |
| ------------ | -------------- | ------------ | --------------------- |
| MAJOR\_ALARM | MINOR\_ALARM   | NO\_ALARM    | MAJOR\_ALARM          |
| MINOR\_ALARM | MAJOR\_ACKED   | NO\_ALARM    | MINOR\_ALARM          |
| MAJOR\_ACKED | INVALID\_ACKED | MINOR\_ALARM | MINOR\_ALARM          |
</center>

**C4.2 Disabled alarms in subAreas and areas:**<br/>
Disabled alarms do not propagate their severity up to their subAreas or areas. When an alarm is disabled, the corresponding subArea and area are reevaluated.