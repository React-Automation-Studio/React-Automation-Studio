The alarm handler maps the EPICS database record alarm severity (SEVR) to an alarm status as follows:

<center><img src="img/alarmHandler/EPICSSevr_map.png" alt="EPICSSevr_map" width="35%"/></center>  
<center>*Fig 1: Mapping of EPICS record SEVR to alarm handler alarm status*</center>
<br/><br/>

In addition to this, the alarm handler also has three acknowledge statuses to indicate when an alarm has been acknowledged. An alarm can thus be in one of seven states as depicted in the table below. Each state is also colour coded as shown below (the theme can result in small colour variations).

<center><img src="img/alarmHandler/Alarm_colours.png" alt="Alarm_colours" width="35%"/></center>  
<center>*Fig 2: Alarm states and colours*</center>
<br/><br/>

Conventions header

<br/>
**C1. Propagation of alarms up to subAreas and areas:** ddfdf

**C1.1 Precedence of active alarms in subAreas and areas:**

**C1.2 Disabled alarms in subAreas and areas:**

<br/>
**C2. Acknowledgement of alarms:**

<br/>
**C3. Disabled alarms:**

<br/>
**C3. Latched alarms:**

Logging header



 

The remainder of the user guide addresses the alarm handler user interface. This is comprised of two views - an alarm setup view and a user notification view.