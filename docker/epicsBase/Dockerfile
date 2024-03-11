
FROM python:3.12.2 as epicsbase
ENV EPICS_BASE=/epics/base/
WORKDIR /epics

RUN apt-get update && apt-get install -y wget autoconf libtool check patch build-essential libreadline-dev re2c libxml2-dev tmux software-properties-common 

RUN wget https://epics-controls.org/download/base/base-7.0.8.tar.gz
RUN tar -xvf base-7.0.8.tar.gz
RUN ln -s /epics/base-7.0.8 /epics/base
WORKDIR /epics/base
RUN make -j 4
WORKDIR /epics
