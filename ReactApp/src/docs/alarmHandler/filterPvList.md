The filtered pv list lists all the pvs currently filtered for. An example is shown below.

NOTE: When the component is first mounted, the filtered pv list lists all the pvs.

<center>
<img src="img/alarmHandler/userNotification_filteredPvList.png" alt="userNotification_filteredPvList" width="100%"/>
</center>
<center>*Filtered pv list*</center>
<br/><br/>

This list is updated in the following scenarios:

**User's row clicked in alarm handler users table**: If a user's row is clicked in the alarm handler users table, the pvs that match all the notification expressions of that user is shown. 

**Notification expression chip clicked in alarm handler users table**: If a notification expression chip is clicked in the alarm handler users table, the pvs that match that notification expression is shown. 

**New notification expression typed in alarm handler users table**: If a new notification expression is being entered in the alarm handler users table, the pvs that match the new notification expression is shown (dynamically updates as user types).

<br/>
**PV Name**

The PV Name column displays the name of the alarm pv.

<br/>
**PV Description**

The PV Description column shows the description of the pv (as per EPICS record DESC field).

<br/>
**IOC Server Hostname**

The IOC Server Hostname column displays the hostname of the machine on which the alarm pv IOC was deployed.

