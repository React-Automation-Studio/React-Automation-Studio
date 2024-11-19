# Migrate to V6.0.0


Whilst RAS V6.0.0 does include breaking changes. Only a minor migration is needed on the frontend for V6.0.0 from V5.2.1.

This is mainly brought about by MUI V6.0.0. The main component that effects us is the SideDrawer component, as the ListItems have been updated to use the ListItemButton component.
Any further changes from MUI can be fix from upgrade to V6.0.0 help: https://mui.com/material-ui/migration/upgrade-to-v6/


Warning: React 19.0.0 will deprecate the use of defaultProps,
please use the default value in the function signature
instead. See
<a href="https://react.dev/blog/2024/04/25/react-19-upgrade-guide">
here
</a>
for more information. The proptypes package will also be
removed in the release 7.0.0 of RAS.





## Updating the backend and frontend packages

1. The pvServer uses EPICS 7.0.8 and Python 3.12.7, if you have any customizations to the pvServer, you will need to update the pvServer to use the latest version of EPICS and Python.

## Updating the frontend package manger

1. We have moved from npm to pnpm primarily for the speed offered by using the local cache during the coker build process. If you use the docker compose build system it will not effect you. 


## MongoDB

    We have updated the MongoDB to use the latest version of MongoDB, V 8.0.3.
    We suggest you dump your previous version of the database and insert the documents into the latest version.

    You can use the previous named volume for the MongoDB replica sets i.e. 7.0.5.

    As of RAS V5.0.0 MongoDB volumes are now defined by the compose project name and MongoDB version
    This allows you to customize the MongoDB version, for example, if you want to stay on an older version of MongoDB
    It allows for multiple RAS instances to be run on the same machine.
    In this case, make sure to set the COMPOSE_PROJECT_NAME variable in the .env file
    or make sure project folder names are unique between instances

    You can also stay on the previous version of MongoDB by setting the MONGO_VERSION
    variable in the .env file to the previous version of MongoDB.
    You might also need to update the docker-compose files to use the previous version of MongoDB.

