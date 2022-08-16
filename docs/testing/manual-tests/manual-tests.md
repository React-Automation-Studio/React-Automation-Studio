*Note this document is a work in progress*

This document describes a minimal set of manual end-end tests that should be performed and verified to work before creating a new release.

The .env file in the project root folder is used to enable features. To simplify the repetition  of the manual testing process it is encouraged to clone the repository into multiple folders to create an individual .env that turns on separate features.

Prerequisites: 

Bring up the demo archiver: https://github.com/React-Automation-Studio/React-Automation-Studio-Demo-Archiver

# Scenario 1:
Test the default build for an empty 
.env file.

##  Production build
Bring up the compose environment:
```
docker compose  up
```
  Checklist

- [ ] check version numbers are correct
- [ ] verify all the widgets work
- [ ] verify all the demos work
- [ ] verify that repeatedly refreshing the screen that widgets connect to their pvs
- [ ] verify that repeatedly switching between tabs and menus on screen that widgets connect to their pvs
- [ ] verify archiver demo works
- [ ] verify alarm handler demo works - note you need authentication enabled to verify all the features
- [ ] verify styleguide works and that all the demo widgets work correctly in the styleguide

##  Dev build
Bring up the compose environment:
```
docker compose -f docker-compose-dev.yml up
```
  Checklist

- [ ] verify all the widgets work
- [ ] verify all the demos work
- [ ] verify that repeatedly refreshing the screen that widgets connect to their pvs
- [ ] verify that repeatedly switching between tabs and menus on screen that widgets connect to their pvs
- [ ] verify archiver demo works
- [ ] verify alarm handler demo works - note you need authentication enabled to verify all the features
- [ ] verify that no errors are reported to the web apps console whilst perform the above checks
- [ ] verify styleguide works and that all the demo widgets work correctly in the styleguide
- [ ] verify that no errors are reported to the web apps console whilst performing the above checks in the styleguide

##  Styleguide dev build
Bring up the compose environment:
```
docker compose -f docker-compose-dev.yml up
```
  Checklist

- [ ] verify all the widgets work
- [ ] verify all the demos work
- [ ] verify that repeatedly refreshing the screen that widgets connect to their pvs
- [ ] verify that repeatedly switching between tabs and menus on screen that widgets connect to their pvs
- [ ] verify archiver demo works
- [ ] verify alarm handler demo works - note you need authentication enabled to verify all the features
- [ ] verify that no errors are reported to the web apps console whilst perform the above checks
- [ ] verify styleguide works and that all the demo widgets work correctly in the styleguide
- [ ] verify that no errors are reported to the web apps console whilst performing the above checks in the styleguide

# Scenario 2:


Test the build with authentication and https enabled:

Example .env:

```
SERVER_PORT=5000
SECURE=true
HTTP_REDIRECT_TO_HTTPS=true
REACT_APP_EnableLogin=true

```



- [ ] Repeat the tests in scenario 1.

## Addtional tests:
- [ ] log in and out repetitively with the admin user
- [ ] add a test user, make sure the user only has readonly access by default.
- [ ] log in and out repetitively with the test user 
- [ ] change the pv write access for one of pvs, refresh and test if the user has write access

# Scenario 3

Change the .env so that the website is served over port 443


```
SERVER_PORT=443
SECURE=true
HTTP_REDIRECT_TO_HTTPS=true
REACT_APP_EnableLogin=true

```

-[ ] verify that a user can login and out, and the website is server over over https without requiring a port


# Scenario 4
Alarm handler tests.

-[ ] verify alarmhandler is working

* This will be expanded in future*

# Scenario 5
Test alternative authentication mechanisms
* This will be expanded in future*
-[ ] verify Google authentication is working
-[ ] verify LDAP authentication is working

