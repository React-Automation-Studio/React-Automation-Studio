The access rights for each user are managed in the USERS/pvAccess.json file.

The pvAccess.json file an be created by placing the contents of the example.pvAccess.json in a new pvAccess.json file.

The rules defined in the pvAccess.json file are loaded each time pv Server is restarted.

For every process variable write, the access rights are first checked to confirm if the process variable can be written to. And for every user at the initial data connection to each process variable the read access rights are checked.

If no read access rights are granted the widget on the client will display "connecting" permanently. And if no write access is granted the widget is indicated as read only.

Regular expression rules are used to evaluate the read and write access rights.

The order in which the user access groups and rules are defined are important. The lowest priority is at the top  and highest priority which can overwrite the previously defined rules is at the bottom.

For example in the default user access group, the rules disables write access and enable read access for all usernames and process variables:

```json
"DEFAULT":
    {
      "usernames":["*"],
      "rules":
      [
        { "rule":"[0-9].*",                   "read":true,  "write":false },
        { "rule":"[a-z].*",                   "read":true,  "write":false },
        { "rule":"[A-Z].*",                   "read":true,  "write":false }


      ]
    }
```
To enable write access for everyone one could change the default to as follows.
```json
"DEFAULT":
    {
      "usernames":["*"],
      "rules":
      [
        { "rule":"[0-9].*",                   "read":true,  "write":true },
        { "rule":"[a-z].*",                   "read":true,  "write":true },
        { "rule":"[A-Z].*",                   "read":true,  "write":true }


      ]
    }
```

Although it is more ingenious to create separate user access groups and to define access for specific users. The example below first denies user1 and user2 access to all process variables and enables read access to all pvs that start with "pva://testIOC:Harp1", "pva://testIOC:FC2" and "pva://testIOC:amplitude". And only enables write access for "pva://testIOC:amplitude".

```json
"UAG1":
{
  "usernames":["user1","user2"],
  "rules":
  [
    { "rule":"[0-9].*",                   "read":false,  "write":false },
    { "rule":"[a-z].*",                   "read":false,  "write":false },
    { "rule":"[A-Z].*",                   "read":false,  "write":false },
    { "rule":"^pva://testIOC:Harp1",      "read":true, "write":false },
    { "rule":"^pva://testIOC:FC2",        "read":true,  "write":false },
    { "rule":"^pva://testIOC:amplitude",  "read":true,  "write":true }

  ]
}
```

In theory, all regular expression allowed by Python regex can be used although this has not been tested. More examples are available at: https://www.w3schools.com/python/python_regex.asp
