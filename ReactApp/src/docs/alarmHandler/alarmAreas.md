The **ALARM AREAS** section of the UI lists all the areas and subAreas of the alarm handler. **This serves as the primary method of navigating the different areas and subAreas within the alarm handler.**

Clicking (left click) on any area/subArea in the list updates the **ALARM TABLE** and the **ALARM LOG** to reflect the selected area/subArea.

Each area can be expanded/contracted to reveal/hide the subAreas within that area as shown below.

|                                        BEAMLINE DEMO Area (subAreas hidden)                                         |                                       BEAMLINE DEMO Area (subAreas shown)                                       |
| :-----------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| <img src="img/alarmHandler/alarmSetup_AlarmList_Contracted.png" alt="alarmSetup_AlarmList_Contracted" width="80%"/> | <img src="img/alarmHandler/alarmSetup_AlarmList_Expanded.png" alt="alarmSetup_AlarmList_Expanded" width="80%"/> |

<center>*Area with subAreas hidden or shown*</center>

<br/>
**Colour scheme**

The colour of each area/subArea in the **ALARM AREAS** list reflects the worst severity of the pvs that form part of that area/subArea. A disabled area/subArea is reflected with a grey colour. This follows the colour scheme used throughout the alarm handler.

<br/>
**Acknowledging alarms**

Alarms can be acknowledged by right clicking the relevant area/subArea and clicking on the acknowledge menu item, as shown below. This acknowledges all the alarms in that area/subArea. Individual alarms can be acknowledged using the **ALARM TABLE** which is described in the next section.

<center><img src="img/alarmHandler/alarmSetup_AlarmList_RightClick.png" alt="alarmSetup_AlarmList_RightClick" width="35%"/></center>  
<center>*Acknowledging alarms using ALARM AREAS list*</center>
<br/><br/>

<br/>
**Enabling/disabling areas or subAreas**

Areas or subAreas can be enabled/disabled by right clicking the relevant area/subArea and clicking on the enable/disable menu item. This action enables/disables all the alarms in that area/subArea. Individual alarms can be enabled/disabled using the **ALARM TABLE** which is described in the next section.

A disabled area/subArea is reflected with a grey colour as shown below. This follows the colour scheme used throughout the alarm handler.

<center><img src="img/alarmHandler/alarmSetup_AlarmList_Disabled.png" alt="alarmSetup_AlarmList_Disabled" width="90%"/></center>  
<center>*BUILDING DEMO area with disabled HVAC subArea*</center>
<br/><br/>

<br/>
**Global actions**

The **ALARM AREAS** section also has a global button (_`world icon`_ on the top left) that a user can click (left click) to select all the areas (complete alarm handler). Right clicking this icon enables a user to acknowledge or enable/disable all the areas. This is shown below.

<center><img src="img/alarmHandler/alarmSetup_AlarmList_Global.png" alt="alarmSetup_AlarmList_Global" width="35%"/></center>  
<center>*Global alarm handler actions*</center>
<br/><br/>

<br/>
**ADMINISTRATOR ACTIONS**

A set of admin actions can also be executed from the **ALARM AREAS** list as shown below. Only alarmAdmin role users can execute these actions.

<center><img src="img/alarmHandler/alarmSetup_AlarmList_Admin.png" alt="alarmSetup_AlarmList_Admin" width="35%"/></center>  
<center>*Alarm admin actions on ALARM AREAS list*</center>
<br/><br/>

<br/>
**Admin action - Add new pv**

To add a new pv right click the relevant area/subArea and under the `Alarm admin actions` menu click on `Add new pv`. This opens up the add pv dialog as shown below. The `ADD` button of the dialog is disabled until a valid live pv name is typed in. Multiple pvs can be added simultaneously by clicking the `+` icon next to the pv name.

<center><img src="img/alarmHandler/alarmSetup_addpv_dialog.png" alt="alarmSetup_addpv_dialog" width="80%"/></center>  
<center>*Add pv dialog*</center>
<br/><br/>

Pvs can be deleted through the **ALARM TABLE** as shown in the next section.

<br/>
**Admin action - Add new subArea**

To add a new subArea right click the relevant area and under the `Alarm admin actions` menu click on `Add new subArea`. This opens up the add subArea dialog as shown below. Roles can also be added to a given subArea. If roles are not defined the subArea is visible to all alarm users, if defined they're only visible to the roles specified.

<center><img src="img/alarmHandler/alarmSetup_addsubArea_dialog.png" alt="alarmSetup_addsubArea_dialog" width="60%"/></center>  
<center>*Add subArea dialog*</center>
<br/><br/>

<br/>
**Admin action - Edit/Delete subArea**

To edit/delete an existing subArea click the relevant menu item under the `Alarm admin actions` menu.