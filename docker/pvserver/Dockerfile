FROM python:3.8.7

RUN apt-get update && apt-get install -y build-essential python3-dev python2.7-dev \
    libldap2-dev libsasl2-dev ldap-utils tox \
    lcov valgrind
ADD ./pvServer/requirements.txt /pvServer/requirements.txt
WORKDIR /pvServer

RUN pip install -r requirements.txt


ENV EPICS_BASE=/epics/base/

WORKDIR /epics

RUN wget https://epics.anl.gov/download/base/base-3.15.6.tar.gz
RUN tar -xvf base-3.15.6.tar.gz
RUN ln -s /epics/base-3.15.6 /epics/base
WORKDIR /epics/base
RUN make
WORKDIR /epics


ADD ./pvServer /pvServer
ADD ./utils/python/mongoDb /pvServer/utils
WORKDIR /pvServer


ENV REACT_APP_PyEpicsServerBASEURL=http://127.0.0.1
ENV REACT_APP_PyEpicsServerPORT=5000
ENV REACT_APP_PyEpicsServerNamespace=pvServer
ENV REACT_APP_EnableLogin=false
ENV REACT_APP_DisableStandardLogin=false
ENV REACT_APP_EnableActiveDirectoryLogin=false
ENV REACT_APP_EnableGoogleLogin=false
ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001 0.0.0.0:8004"
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so

ENV PATH="/epics/base/bin/linux-x86_64/:${PATH}"
#RUN echo $PATH
RUN echo $REACT_APP_PyEpicsServerBASEURL
RUN echo $REACT_APP_PyEpicsServerPORT
RUN echo $REACT_APP_PyEpicsServerNamespace

#RUN ls /epics/base/lib/linux-x86_64/



VOLUME /pvServer/userAuthentication/users



CMD python pvServer.py
EXPOSE  5000 5001 5064 5065 8001 27017
