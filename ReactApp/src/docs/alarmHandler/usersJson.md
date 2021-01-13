<br/>

```bash
    [
        {
            "name": "Demo User One",
            "username": "user1",
            "email": "demouser1@lab.edu",
            "mobile": "+27 00 000 0001",
            "global": true,
            "globalSetup": {
                "notify": true,
                "email": true,
                "sms": false,
                "whatsapp": false,
                "allDay": true,
                "fromTime": "",
                "toTime": "",
                "weekly": true,
                "days": {
                    "Monday": true,
                    "Tuesday": true,
                    "Wednesday": true,
                    "Thursday": true,
                    "Friday": true,
                    "Saturday": true,
                    "Sunday": true
                },
                "dateRange": false,
                "fromDate": "",
                "toDate": ""
            },
            "notifyPVs": [
                {
                    "regEx": "amplitude\\b",
                    "notifySetup": {
                        "notify": true,
                        "email": true,
                        "sms": false,
                        "whatsapp": false,
                        "allDay": true,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": true,
                        "days": {
                            "Monday": true,
                            "Tuesday": true,
                            "Wednesday": true,
                            "Thursday": true,
                            "Friday": true,
                            "Saturday": true,
                            "Sunday": true
                        },
                        "dateRange": false,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                {
                    "regEx": "vault",
                    "notifySetup": {
                        "notify": true,
                        "email": true,
                        "sms": false,
                        "whatsapp": false,
                        "allDay": true,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": true,
                        "days": {
                            "Monday": true,
                            "Tuesday": true,
                            "Wednesday": true,
                            "Thursday": true,
                            "Friday": true,
                            "Saturday": true,
                            "Sunday": true
                        },
                        "dateRange": false,
                        "fromDate": "",
                        "toDate": ""
                    }
                }   
            ]
        },
        {
            "name": "Demo User Two",
            "username": "user2",
            "email": "demouser2@lab.edu",
            "mobile": "+27 00 000 0002",
            "global": true,
            "globalSetup": {
                "notify": true,
                "email": true,
                "sms": false,
                "whatsapp": false,
                "allDay": true,
                "fromTime": "",
                "toTime": "",
                "weekly": true,
                "days": {
                    "Monday": true,
                    "Tuesday": true,
                    "Wednesday": true,
                    "Thursday": true,
                    "Friday": true,
                    "Saturday": true,
                    "Sunday": true
                },
                "dateRange": false,
                "fromDate": "",
                "toDate": ""
            },
            "notifyPVs": [
                {
                    "regEx": "radiation",
                    "notifySetup": {
                        "notify": true,
                        "email": true,
                        "sms": false,
                        "whatsapp": false,
                        "allDay": true,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": true,
                        "days": {
                            "Monday": true,
                            "Tuesday": true,
                            "Wednesday": true,
                            "Thursday": true,
                            "Friday": true,
                            "Saturday": true,
                            "Sunday": true
                        },
                        "dateRange": false,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                {
                    "regEx": "^testIOC.*STR",
                    "notifySetup": {
                        "notify": true,
                        "email": true,
                        "sms": false,
                        "whatsapp": false,
                        "allDay": true,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": true,
                        "days": {
                            "Monday": true,
                            "Tuesday": true,
                            "Wednesday": true,
                            "Thursday": true,
                            "Friday": true,
                            "Saturday": true,
                            "Sunday": true
                        },
                        "dateRange": false,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
        ...(more)
    ]
```

This file defines the users for the alarm handler user notification system.

The users.json is an array of users, where each user object is defined as:

```bash
    {
        "name": "Name of user",
        "username": "RAS username of user",
        "email": "User's email address",
        "mobile": "User's mobile number",
        "global": Directive to use global notify profile,
        "globalSetup": {
            Global notify profile
        },
        "notifyPVs": [
            Array of regular expressions and associated notify profiles to notify user on
        ]
    }
```

See the alarm handler user guide for more information on the notification regular expressions.

**NOTE:** It is possible for an alarmAdmin role user to add or remove users in a controlled manner from the front end (user interface). See the alarm handler user guide for more information.