The **ALARM TABLE** provides a tabular view of all the alarms in the currently selected area/subArea (selection via **ALARM AREAS** menu list). A sample is shown below. NOTE: When the component is first mounted, the alarm table lists all the pvs.

<center>
<img src="img/alarmHandler/alarmSetup_AlarmTable_Overview2.png" alt="alarmSetup_AlarmTable_Overview" width="100%"/>
</center>
<center>*Sample ALARM TABLE*</center>
<br/><br/>

<br/>
**Searching the table**

A search bar is provided on the top right that searches through the alarms currently in the table. The search string is case insensitive and accepts no breaks. An example is shown below. A user can also set the number of rows and navigate the alarm table using the table pagination navbar to the left of the search bar.

<center>
<img src="img/alarmHandler/alarmSetup_AlarmTable_Filter2.png" alt="alarmSetup_AlarmTable_Filter" width="100%"/>
</center>
<center>*Seaching ALARM TABLE*</center>
<br/><br/>

<br/>
**Acknowledging an alarm**

An alarm can be acknowledged by right clicking the relevant row within the table. This is shown below.

<center>
<img src="img/alarmHandler/alarmSetup_AlarmTable_AckAlarm12.png" alt="alarmSetup_AlarmTable_AckAlarm1" width="100%"/>
</center>
<center>*Acknowledging an alarm*</center>
<br/><br/>

The right click context menu is disabled for disabled alarms - disabled alarms can thus not be acknowledged.

<br/>
**PV NAME**

The PV NAME column displays the name of the alarm pv. Hovering over this column reveals the description of the pv (as per EPICS record DESC field) and the hostname of the machine on which the alarm pv IOC was deployed. This is shown below.

<center>
<img src="img/alarmHandler/alarmSetup_AlarmTable_Hover2.png" alt="alarmSetup_AlarmTable_Hover" width="100%"/>
</center>
<center>*Pv description and hostname on hover*</center>
<br/><br/>

<br/>
**PV VALUE**

The PV VALUE column shows the current value of the alarm pv. A colour coded border shows if the pv is in a MAJOR/MINOR alarm state.

<br/>
**ALM STATUS**

The ALM STATUS column shows the current status of the alarm pv. An alarm pv can be in one of seven (7) states and is colour coded as described is Table 2 above.

<br/>
**LAST ALM VAL**

The LAST ALM VAL column shows the pv value that triggered the last alarm. This value is updated as described in convention C3.1 above.

<br/>
**LAST ALM TIME**

The LAST ALM TIME column shows the timestamp when the last alarm was triggered. This value is updated as described in convention C3.1 above.

<br/>
**LAST ALM ACK TIME**

The LAST ALM ACK TIME column shows the timestamp when the last alarm was acknowledged. This value is updated as described in convention C1.3 above.

<br/>
**ENBL**

The ENBL checkbox allows a user to enable/disable an alarm pv. Disabled pvs behave as described in convention C2 above.

This checkbox will be disabled (greyed out) if the subArea/area to which the alarm pv belongs in disabled.

Disabled alarms are reflected with a grey colour as shown below. This follows the colour scheme used throughout the alarm handler.

<center>
<img src="img/alarmHandler/alarmSetup_AlarmTable_Disabled2.png" alt="alarmSetup_AlarmTable_Disabled" width="100%"/>
</center>
<center>*Disabled alarm in table*</center>
<br/><br/>

<br/>
**LAT**

The LAT checkbox allows a user to configure the alarm pv to be latched/unlatched. Latched pvs behave as described in convention C3 above.

This checkbox will be disabled (greyed out) if the subArea/area to which the alarm pv belongs in disabled.

<br/>
**NTFY**

The NTFY checkbox allows a user to configure whether alarms from the pv should notify users.

This checkbox will be disabled (greyed out) if the subArea/area to which the alarm pv belongs in disabled.