The systems uses Docker to create isolated production and development environments. There are three docker-compose configuration files.

```bash
docker-compose  up
```
or
```bash
docker-compose -f docker-compose.yaml up
```
Will launch the compiled production version without the demoIOC's and styleguide


```bash
docker-compose -f docker-compose-dev.yml up
```
Will launch the development version with the demoIOC's and styleguide.
And:

```bash
docker-compose -f docker-compose-administator.yml run administrator
```
will launch the username, login and password administration functions environment.

Initially to check that everything is working only bring up the production version by running

```bash
docker-compose  up
```

This installation process of all the docker images may take a while (20-30min) the first time. There after it is fast as all the repeated build and up commands uses cached installations. The longest process is the installation of the node modules. Do not be deterred by the red warnings.

This default installation will serve the  app at http://127.0.0.1:9000 and the style guide at http://127.0.0.1:6060.


To launch the development environment make sure the production version is stopped,and the run :
```bash
docker-compose -f docker-compose-dev.yml up
```
This will launch the pvServer, demo IOC ,style guide and the React Development environment. As with the production version the first run may take awhile. There after it is fast as all the repeated build and up commands uses cached installations.

The react development environment app will be served on http://127.0.0.1:3000 and the styleguide at http://127.0.0.1:6060.

The source can then be edited using your favorite editor like Atom, when the file is saved the project automatically recompiles and the web page is refreshed. It is recommended to only work in the
/src/components/staging/ folders.

Bug fixes and contributions can be submitted via pull requests.
