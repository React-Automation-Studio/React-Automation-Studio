FROM python:3.8.7

RUN apt-get update && apt-get install -y build-essential python3-dev python2.7-dev \
    libldap2-dev libsasl2-dev ldap-utils tox \
    lcov valgrind

COPY ./pvServer/pyproject.toml .

RUN pip install --upgrade pip && pip --no-cache-dir install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

WORKDIR /pvServer

ENV EPICS_BASE=/epics/base/

WORKDIR /epics

RUN wget https://epics.anl.gov/download/base/base-3.15.6.tar.gz
RUN tar -xvf base-3.15.6.tar.gz
RUN ln -s /epics/base-3.15.6 /epics/base
WORKDIR /epics/base
RUN make
WORKDIR /epics


ADD ./pvServer /pvServer
WORKDIR /pvServer


ENV pvServerURL=http://127.0.0.1
ENV pvServerPort=5000
ENV pvServerNameSpace=pvServer
ENV VITE_EnableLogin=false
ENV VITE_DisableStandardLogin=false
ENV VITE_EnableActiveDirectoryLogin=false
ENV VITE_EnableGoogleLogin=false
ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001 0.0.0.0:8004"
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so

ENV PATH="/epics/base/bin/linux-x86_64/:${PATH}"
#RUN echo $PATH
RUN echo $pvServerURL
RUN echo $pvServerPort
RUN echo $pvServerNameSpace

#RUN ls /epics/base/lib/linux-x86_64/



VOLUME /pvServer/userAuthentication/users



CMD python pvServer.py
EXPOSE  5000 5001 5064 5065 8001 27017
