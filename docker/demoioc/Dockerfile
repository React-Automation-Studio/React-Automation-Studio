
FROM ubuntu:18.04
ENV EPICS_BASE=/epics/base/

WORKDIR /epics

RUN apt-get update

RUN apt-get install -y wget autoconf libtool check patch build-essential libreadline-gplv2-dev re2c libxml2-dev tmux

RUN wget https://epics.anl.gov/download/base/base-3.15.6.tar.gz
RUN tar -xvf base-3.15.6.tar.gz
RUN ln -s /epics/base-3.15.6 /epics/base
WORKDIR /epics/base
RUN make
WORKDIR /epics

RUN wget https://epics.anl.gov/bcda/synApps/tar/synApps_6_0.tar.gz
RUN tar -xvf synApps_6_0.tar.gz
RUN ln -s /epics/synApps/support /epics/support



ADD ./epics/config /epics/config

WORKDIR /epics/

RUN cp config/synApps_6_0/configure/RELEASE support/configure/RELEASE
RUN cp config/synApps_6_0/busy-R1-7/configure/RELEASE support/busy-R1-7/configure/RELEASE
RUN cp config/synApps_6_0/ipac-2-15/configure/RELEASE support/ipac-2-15/configure/RELEASE
WORKDIR /epics/support

RUN make release
RUN make

ADD ./epics/testIOC /epics/testIOC
WORKDIR /epics/testIOC
RUN make clean
RUN make



ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001"
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so

ENV PATH="/epics/base/bin/linux-x86_64/:${PATH}"
RUN echo $PATH

#RUN ls /epics/base/lib/linux-x86_64/


WORKDIR /epics/testIOC/iocBoot/ioctestIOC/

CMD ./st.cmd
#CMD ["/epics/base/bin/linux-x86_64/caget","RFPA:IPA_TUNE_MOT:display_ENG"]
EXPOSE 5000 5064 5065 8001
