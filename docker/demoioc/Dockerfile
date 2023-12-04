
FROM ubuntu:22.04
ENV EPICS_BASE=/epics/base/
WORKDIR /epics

RUN apt-get update && apt-get install -y wget autoconf libtool check patch build-essential libreadline-dev re2c libxml2-dev tmux

RUN wget https://epics-controls.org/download/base/base-7.0.7.tar.gz
RUN tar -xvf base-7.0.7.tar.gz
RUN ln -s /epics/base-7.0.7 /epics/base
WORKDIR /epics/base
RUN make
WORKDIR /epics

WORKDIR /epics/support

ADD ./epics/config /epics/config

RUN wget https://github.com/epics-modules/sscan/archive/refs/tags/R2-11-6.tar.gz
RUN tar -xvf R2-11-6.tar.gz

RUN  cp /epics/config/sscan-R2-11-6/configure/RELEASE /epics/support/sscan-R2-11-6/configure/RELEASE 
WORKDIR /epics/support/sscan-R2-11-6
RUN make


WORKDIR /epics/support
RUN wget https://github.com/epics-modules/calc/archive/refs/tags/R3-7-5.tar.gz
RUN tar -xvf R3-7-5.tar.gz
WORKDIR /epics/support/calc-R3-7-5
RUN  cp /epics/config/calc-R3-7-5/configure/RELEASE /epics/support/calc-R3-7-5/configure/RELEASE 
RUN make

ADD ./epics/testIOC /epics/testIOC
WORKDIR /epics/testIOC
RUN make clean
RUN make

ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001"
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so

ENV PATH="/epics/base/bin/linux-x86_64/:${PATH}"
RUN echo $PATH

WORKDIR /epics/testIOC/iocBoot/ioctestIOC/

CMD ../../bin/linux-x86_64/testIOC ./st.cmd
EXPOSE 5000 5064 5065 8001
