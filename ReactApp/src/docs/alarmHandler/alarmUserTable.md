The alarm handler users table lists all the users that can be configured to be notified when various alarm events occur. This list is fetched from the appropriate alarm handler MongoDB database. A demo table is shown below.

<img src="img/alarmHandler/userNotification_userTable.png" alt="userNotification_userTable" width="100%"/>
<center>*Alarm user table*</center>
<br/><br/>

<br/>
**Name**

Name of the user - as configured in alarm handler MongoDB database.

<br/>
**Email**

Contact email address on which the user will be notified - as configured in alarm handler MongoDB database.

The email address can be updated from the UI as described below in the **Actions** section.

NOTE: The UI will only display the email info of the currently logged in user. Other users' emails will be hidden to prevent unnecessary exposure of user info. As an example, "User One" is logged in in the sample table above.

<br/>
**Notification Expressions**

The notification expressions column lists a series of javascript regular expressions in the form of "chips" - list as configured in alarm handler MongoDB database.

***If you are unfamiliar with regular expressions we highly recommend you check out [this JS Regexp tutorial](https://www.tutorialspoint.com/javascript/javascript_regexp_object.htm) as a start.**

The notification expressions can be updated from the UI as described below in the **Actions** section.

A user will be notified on alarm events on pvs that match any of the notification expressions of that particular user.

As an example see the screenshot below where the notification expression "SLIT.*2" of "User One" is selected. The filtered pvs list shows the pvs that matches this notification expression. This means "User One" will be notified whenever alarm events occur on any of these pvs. The same applies for all of "User One's" notification expressions.

<img src="img/alarmHandler/userNotification_regex_click.png" alt="userNotification_regex_click" width="100%"/>
<center>*Example notification expression chip click*</center>
<br/><br/>

<br/>
**Actions**

The actions column allows a user to edit the email and notification expressions of a user by clicking the edit button (*pencil icon* on the far right).

NOTE: The UI will only display the edit icon next to the currently logged in user. You will be unable to edit other users' details. As an example, "User One" is logged in in the sample figure above.

NOTE: You will be unable to edit any user information if you use React Automation Studio without login. See the **Installation Guide** section of the style guide for more information of enabling login and authentication in React Automation Studio.

Once the edit icon has been clicked, the user is presented with the edit user view as shown below (example shown for "User One").

<img src="img/alarmHandler/userNotification_edit_email.png" alt="userNotification_edit_email" width="100%"/>
<center>*Editing User One user details*</center>
<br/><br/>

In edit more, the following actions can be done:

**Edit email**: The email field can be edited like a regular form input.

**Delete notification expressions**: Notification expressions can be deleted by clicking on the cancel button (*x icon* on top right of chip) of the relevant expression chip.

**Add new notification expression**: New notificaton expressions can be added by typing in the desired expression into the Add column and clicking the add button (*+ icon*).

As the user types, the filtered pv list will update dynamically to show the pvs that match the new notification expression. Users will be alerted of invalid notification expressions by an "Invalid Regex" message and an invalid symbol (*not allowed* icon) as shown below.

<img src="img/alarmHandler/userNotification_invalid_regex.png" alt="userNotification_invalid_regex" width="100%"/>
<center>*Invalid notification expression alert*</center>
<br/><br/>

**Apply changes**: Click on the apply button (*tick icon*) in the Actions column to apply any changes made - these changes will also be updated in the MongoDB alarm database.

**Cancel changes**: Click on the cancel button (*x icon*) in the Actions column to cancel any changes made - this will undo all changes made and **NOT** update the MongoDB alarm database.













