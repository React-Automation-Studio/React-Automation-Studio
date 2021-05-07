




First cd to React Automation Studio installation directory

Set up the .env to enable login:
```bash
cd ..
ls .env
```
If the .env file exists in the root folder, then edit it and set :
```bash
REACT_APP_EnableLogin=true
```
If the .env file does not exist in the root folder, then:
```bash
cp example.env .env
```
 then edit .env and set:
```bash
REACT_APP_EnableLogin=true
```
Make sure that the other parameters in the file are correct. Or see 4.1:

The administration utility is used to create users and store the passwords in an encrypted format using Bcrypt.

The usernames and passwords are stored in json format in USERS/users.json file.

Only the administration utility should be used to edit this file.


To launch the admin utility:
```bash
docker-compose -f docker-compose-administator.yml run administrator
```

There are five scripts than can be run:

To add a user launch:
```bash
admin-add-user
```
To change a user password:
```bash
admin-change-user-password
```
To confirm a user password:
```bash
admin-check-user-password
```
To delete a user launch:
```bash
admin-del-user
```
To list all users launch:
```bash
admin-list-users
```
## 3.2 Enabling user access rights

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



## 3.3 Enabling https
The system is by default configured to serve the socket connections and client webserver over HTTP on localhost.

To enable secure login and installation as a PWA, a certificate and key needs to be installed that is bound to your hostname and the .env environment variables need to be edited to serve overs HTTPS and via the correct hostname.

Inside the React Automation Studio installation folder:

```bash
ls .env
```
If it exists edit the .env file, otherwise copy example.env to .env and set

```bash

pvServerURL=https://customURL
REACT_APP_EnableLogin=false
REACT_APP_FrontendServerPORT=9000
pvServerPort=5000
REACT_APP_PyEpicsServerStyleguidePORT=5001
REACT_APP_StyleguideServerPORT=6060
REACT_APP_EnableLoginStyleguide=false
```
to https and the correct hostname

The certificates need to be placed in the the React Automation Studio installation folder under the certificates folder.

The certificate needs to be called: server.cer And the key needs to be called: server.key The .gitignore will prevent them from being copied to the repository



The pvServer and node development environment, will need to be restarted, and the production environments will need to be rebuilt.

Both the pvServer and the node clientserver will automatically detect the change.

The built client will be then served  https://customURL:9000/, the styleguide at https://customURL:6060/ and the dev client at http://127.0.0.1:3000/ or http://hostip:3000/
