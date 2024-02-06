In release V5.0.0 we have moved away from Create-React-App to Vite

This was forced upon us as Create-React-App has been deprecated and we needed to move to a new build system.

You can read more about this at https://github.com/reactjs/react.dev/pull/5487#issuecomment-1409720741

We are pretty much tied into React-router-dom and a single page application that manages the state globally. That is why we have chosen Vite as it is a very fast build system and it is very easy to use.

We have also updated all the backend and frontend packages to the latest versions. This means that you will need to update your code to use the new versions of the packages.

We have also introduced multistage builds for the backend and frontend. This dramatically speeds up the build process.

We suggest to you to clone the example projects and insert your code into the new projects.

There are a number of changes that you will need to make to your code to move from V4 to V5.

And we have included a list of the main changes below:

## Moving from Create-React-App to Vite

1. Migrate your .env file and rename all variables in your .env file from `REACT_APP_` to `VITE_` and remove the `REACT_APP_` prefix.
2. Vite requires all files with JSX to be named with the `.jsx` extension. You will need to rename the files with JSX your `.js` files to `.jsx` files.
3. In your JSX files, if you have imports with a .js extension, you will need to remove the extension.
4. We have kept all the ports the same as in V4. This means that you will not need to change the ports.
5. An imports that used './React-Automation-Studio/...' will need to be changed to 'React-Automation-Studio/...'.
## Updating the backend and frontend packages

1. The pvServer uses EPICS 7.0.7 and Python 3.12.1, if you have any customizations to the pvServer, you will need to update the pvServer to use the latest version of EPICS and Python.
2. The frontend uses the latest version of React and React-Router-Dom.
    We were stuck on React-Router-Dom 5.3.3 and we have now moved to React-Router-Dom 6.21.3. You will need to update your code to use the latest versions of these packages.
    2.1. We followed the migration guide at https://reactrouter.com/docs/en/v6/getting-started/migrating.
    This impacted us in the following ways. There was a clash in ReactApp/src/Routes.js name with the new React-Router-Dom 6.21.3. We had to rename the file to ReactApp/src/AppRoutes.jsx.
    We needed to update the code in the file to use the new version of React-Router-Dom. This also impacted the ProtectedRoute component:

    Previously in the Routes.js we had:

    ```jsx
    <BrowserRouter>
       <Switch>
          <ProtectedRoute
             path="/ArchiverDataViewerDemo"
             component={ArchiverDataViewerDemo}
          />
          ... more routes
       </Switch>
    </BrowserRouter>
    ```

    Now in the AppRoutes.jsx we have:

    ```jsx
    <BrowserRouter>
       <Routes>
          <Route
             path="/AlarmHandlerDemo"
             element={
                <ProtectedRoute>
                   <AlarmHandlerDemo />
                </ProtectedRoute>
             }
          />
          ... more routes
       </Routes>
    </BrowserRouter>
    ```
    2.2. We also had to update the code in the ReactApp/src/components/SystemComponents/Login.Login.jsx to use the new version of React-Router-Dom. If you used a custom version then please update it to use the new version of React-Router-Dom.

## Multistage builds
    We have introduced multistage builds for the docker compose files. This means that you will need to update your docker-compose files to use the new multistage builds.
## MongoDB
    We have updated the MongoDB to use the latest version of MongoDB. We suggest you dump your previous version of the database and insert the documents into the latest version.

    We have also added a named volume for the MongoDB replica sets.
    
    As of RAS V5.0.0 MongoDB volumes are now defined by the compose project name and MongoDB version
    This allows you to customize the MongoDB version, for example, if you want to stay on an older version of MongoDB
    It allows for multiple RAS instances to be run on the same machine.
    In this case, make sure to set the COMPOSE_PROJECT_NAME variable in the .env file or make sure project folder names are unique between instances

    You can also stay on the previous version of MongoDB by setting the MONGO_VERSION variable in the .env file to the previous version of MongoDB. You might also need to update the docker-compose files to use the previous version of MongoDB.

## Styleguide
    We have moved from react-styleguidist to Storybook. If you have any customizations to the styleguide, you will need to update the styleguide to use Storybook. The Storybook configs are now located in the ReactApp/.storybook folder.

