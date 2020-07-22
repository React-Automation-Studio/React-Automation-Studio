<br/>

```bash
[
    {
        "name": "User One",
        "username": "user1",
        "email": "user1@example.com",
        "notifyPVs": [
            "amplitude\\b",
            "vault",
            "cyclotron.*RF",
            "cyclotron.*RF\\d",
            "air.*press",
            "SLIT.*2"
        ]
    },
    {
        "name": "User Two",
        "username": "user2",
        "email": "user2@example.com",
        "notifyPVs": [
            "radiation",
            "^testIOC.*STR",
            "SLIT.*Gap",
            "vault"
        ]
    },
    ...(more)
]
```

This file defines the users for the alarm handler user notification system.

The users.json is an array of users, where each user object is defined as:

```bash
    {
        "name": "Name of user",
        "username": "React Automation Studio username",
        "email": "Notify email address",
        "notifyPVs": [
            Array of regex expressions of pvs to notify user on
        ]
    }
```

See the alarm handler user guide for more information on the notification regex expressions.

**NOTE:** It is currently not possible to add or remove users in a controlled manner from the front end (user interface). It is envisaged that this will be done before the beta release.