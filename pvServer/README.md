# PV Server

Prior to RAS V3.2.0 ,the pvServer dependencies was managed using a requirements.txt file.

Since RAS V3.2.0 Poetry will be use to manage the dependencies.

The strategy followed is to specify the precise version of each package in the pyproject.toml. 

Primary usage of this software is in the docker container and orchestrated via docker compose.

Since the docker file pulls a precises version of Python we get reproducible results by not committing a lock file.

Note: this strategy may change in future.

It is envisaged to produce the Python package of the pvServer. 

To help aid development of a package a recipe to use the pvServer outside of the docker environment is detailed below:


# Tools

- [Poetry](https://python-poetry.org/) ^1.1.10
 
## Poetry

`Poetry` is a tool to manage package dependencies. `Poetry` either uses your configured virtualenvs or creates its own to always be isolated from your system. The virtual env it creates, is useful to locally run the backend of RAS. 

**The minimum Python supported version is python3.7**. If you don't have a Python version greater or equal than 3.7 installed on your pc, install it and set the correct environment for poetry:

    apt install python3.7-minimal
    poetry env use python3.7

From the top folder move to the _pvServer_ folder, prepare your environment installing dependencies and start the virtual environment:

    cd pvServer
    poetry install
    poetry shell

Now you are ready to run the **pvServer** from your virtual environment.

    python pvServer.py

Alternatively you can use `poetry` to just install and manage dependencies and use another virtual environment (such as `conda`). Inside of your virtual env you can run the following commands:

    poetry config virtualenvs.create false
    poetry install

For a more detailed usage of this tool look at the [poetry official documentation](https://python-poetry.org/).