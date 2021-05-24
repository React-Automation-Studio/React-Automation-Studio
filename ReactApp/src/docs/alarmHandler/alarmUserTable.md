The alarm handler users table lists all the users that can be configured to be notified when various alarm events occur. This list is fetched from the appropriate alarm handler MongoDB database. A demo table is shown below.

<img src="img/alarmHandler/userNotification_userTable2.png" alt="userNotification_userTable" width="100%"/>
<center>*Alarm user table*</center>
<br/><br/>

<br/>
**Name**

Name of the user - as configured through the user profile.

<br/>
**Contact**

The contact details on which the user will be notified - as configured through the user profile.

NOTE: The UI will only display the contact details of the currently logged in user. Other users' contact details will be hidden to prevent unnecessary exposure of user info.

NOTE: A user with alarmAdmin role can view all users' contact details.

<br/>
**Notification Expressions**

The notification expressions column lists a series of javascript regular expressions in the form of "chips" - list as configured in alarm handler MongoDB database. Some examples of javascript regular expressions are shown in the table below:

<br/>
<center>
| Expression       | Description                                                |
|:----------------:|:----------------------------------------------------------:|
| [...]            | Match any character between the brackets                   |
| ^p               | Match any string with p at the beginning of it             |
| p$               | Match any string with p at the end of it                   |
| (foo\|bar\|baz)  | Match any of the alternatives specified                    |
</center>
<center>*Table 5: Example javascript regular expressions*</center>
<br/><br/>

***For more examples and information we highly recommend you check out [this JS Regexp tutorial](https://www.tutorialspoint.com/javascript/javascript_regexp_object.htm) as a start.**

The notification expressions can be updated from the UI as described below in the **Actions** section.

A user will be notified on alarm events on pvs that match any of the notification expressions of that particular user.

As an example see the screenshot below where the notification expression "STR1:" of "User2 Demo" is selected. The filtered pvs list shows the pvs that matches this notification expression. This means "User2 Demo" will be notified whenever alarm events occur on any of these pvs. The same applies for all of "User2 Demo's" notification expressions.

<img src="img/alarmHandler/userNotification_regex_click2.png" alt="userNotification_regex_click" width="100%"/>
<center>*Example notification expression chip click*</center>
<br/><br/>

<br/>
**Actions**

The actions column allows a user to edit the notification expressions of a user by clicking the edit button (*pencil icon* on the right).

NOTE: The UI will only display the edit icon next to the currently logged in user. You will be unable to edit other users' details.

NOTE: You will not be able to edit any user information if you use React Automation Studio without login. See the **Installation Guide** section of the style guide for more information of enabling login and authentication in React Automation Studio.

NOTE: A user with alarmAdmin role can edit all users' details.

Once the edit icon has been clicked, the user is presented with the edit user view as shown below (example shown for "User1 Demo").

<img src="img/alarmHandler/userNotification_edit_details.png" alt="userNotification_edit_details" width="100%"/>
<center>*Editing User One user details*</center>
<br/><br/>

In edit more, the following actions can be done:

**Delete notification expressions**: Notification expressions can be deleted by clicking on the cancel button (*x icon* on top right of chip) of the relevant expression chip.

**Add new notification expression**: New notification expressions can be added by typing in the desired expression into the `Add` column and clicking the add button (*+ icon*).

As the user types, the filtered pv list will update dynamically to show the pvs that match the new notification expression. Users will be alerted of invalid notification expressions by an "Invalid Regex" message and an invalid symbol (*not allowed* icon) as shown below.

<img src="img/alarmHandler/userNotification_invalid_regex2.png" alt="userNotification_invalid_regex" width="100%"/>
<center>*Invalid notification expression alert*</center>
<br/><br/>

**Apply changes**: Click on the apply button (*tick icon*) in the Actions column to apply any changes made - these changes will also be updated in the MongoDB alarm database.

**Cancel changes**: Click on the cancel button (*x icon*) in the Actions column to cancel any changes made - this will undo all changes made and **NOT** update the MongoDB alarm database.

<br/>
**Notification Schedule**

The notification schedule column shows, in words, the active notification schedule of each user. The calendar icon on the far right allows a user to edit their notification schedule.

NOTE: The UI will only display the calendar icon next to the currently logged in user. You will be unable to edit other users' details.

NOTE: You will not be able to edit any user information if you use React Automation Studio without login. See the **Installation Guide** section of the style guide for more information of enabling login and authentication in React Automation Studio.

NOTE: A user with alarmAdmin role can edit all users' details.

Once the calendar icon has been clicked, the user is presented with the notification schedule dialog as shown below (example shown for "User1 Demo").

<center>
<img src="img/alarmHandler/userNotification_notification_dialog.png" alt="userNotification_notification_dialog" width="50%"/>
</center>
<center>*Notification schedule dialog for Demo User One*</center>
<br/><br/>

The active notification schedule is displayed in words at the top of the dialog. This updates as the various options are changed.

The `Unique` vs `Global` toggle switch allows a user to set a global (same) notification schedule for all their notification expressions or a unique (individual) schedule for each notification expression.

If the user chooses a unique schedule for each notification expression, these expressions can be selected in the next row of chips.

The notify checkbox sets whether the user must be notified. This can be a global or per notification expression setting.

A user can then set which medium they would like to be notified on. At least one medium one be selected. **Currently the alarm handler can notify via email and Signal messenger. In future we hope to expand this to SMS and WhatsApp.**

The `All-day` toggle switch sets whether a user would like to be notified all day or between set time intervals. This can be a global or per notification expression setting.

The `Weekly` and `Date range` settings can to configured for a user to be notified weekly on particular days or between a range of dates. This can be a global or per notification expression setting.

**Apply changes**: Clicking the `APPLY` button accepts the changes and will also update the MongoDB alarm database.

**Cancel changes**: Clicking the `CANCEL` will undo all changes made and **NOT** update the MongoDB alarm database.

<br/>
**ADMINISTRATOR ACTIONS**

An alarmAdmin role user can add or remove alarm users using the `EDIT ALARM USERS` button above the alarm handler user table.

<br/>
**Admin action - Add or remove alarm users**

To add or remove alarm users click the `EDIT ALARM USERS` button above the alarm handler user table and the dialog below will appear.

<center>
<img src="img/alarmHandler/userNotification_editusers_dialog.png" alt="userNotification_editusers_dialog" width="100%"/>
</center>
<center>*Edit users dialog*</center>
<br/><br/>

This dialog allows an alarmAdmin to add/remove users from the list of all available RAS users.