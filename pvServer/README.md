# PV Server

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