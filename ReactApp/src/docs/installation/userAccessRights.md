The access rights for each user are managed in the web administrator. If logged in as admin, the administrator link is via the more options in the right corner.

The default access rights are seeded only once by the adminDbInit mirco service.

Regular expression rules are used to evaluate the read and write access rights.

The order in which the user access groups and rules are defined are important. The first rule applied is the DEFAULT, all user will get this. The final access group rules to be applied are the ADMIN rules to the applicable user groups.

For example in the default user access group, the rules disables write access and enable read access for all usernames and process variables:

The table display in the user interface allows one ot edit the evivalent object in the database.
```json
"DEFAULT":
    {
      "usernames":["*"],
      "roles":[],
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
      "roles":[],
      "rules":
      [
        { "rule":"[0-9].*",                   "read":true,  "write":true },
        { "rule":"[a-z].*",                   "read":true,  "write":true },
        { "rule":"[A-Z].*",                   "read":true,  "write":true }


      ]
    }
```

Although it is more ingenious to create separate user access groups and to define access for specific users. The example below first denies user1 and user2 access to all process variables and enables read access to all pvs that start with "testIOC:Harp1", "testIOC:FC2" and "testIOC:amplitude". And only enables write access for "testIOC:amplitude".

```json
"UAG1":
{
  "usernames":["user1","user2"],
  "roles":[],
  "rules":
  [
    { "rule":"[0-9].*",                   "read":false,  "write":false },
    { "rule":"[a-z].*",                   "read":false,  "write":false },
    { "rule":"[A-Z].*",                   "read":false,  "write":false },
    { "rule":"^testIOC:Harp1",      "read":true, "write":false },
    { "rule":"^testIOC:FC2",        "read":true,  "write":false },
    { "rule":"^testIOC:amplitude",  "read":true,  "write":true }

  ]
}
```

In theory, all regular expression allowed by Python regex can be used although this has not been tested. More examples are available at: https://www.w3schools.com/python/python_regex.asp

** New** to release 3.0.0 are the protected routes which uses the role and roles array prop to protect the route. This now enables portions of your app to isolated from other users.


```json
"UAG1":
{
  "usernames":["user1"],
  "roles":["engineer"],
  "rules":
  [
    { "rule":"[0-9].*",                   "read":true,  "write":true },
    { "rule":"[a-z].*",                   "read":true,  "write":true },
    { "rule":"[A-Z].*",                   "read":true,  "write":true },


  ]
},
"UAG2":
{
  "usernames":["operator1"],
  "roles":["operator"],
  "rules":
  [
    { "rule":"[0-9].*",                   "read":true,  "write":false },
    { "rule":"[a-z].*",                   "read":true,  "write":false },
    { "rule":"[A-Z].*",                   "read":true,  "write":false },
    { "rule":"^testIOC:Harp1",      "read":true, "write":true },
    { "rule":"^testIOC:FC2",        "read":true,  "write":true },

  ]
}
```