
FROM ubuntu:18.04
ENV EPICS_BASE=/epics/base/

WORKDIR /epics

RUN apt-get update

RUN apt-get install -y wget autoconf libtool check patch build-essential libreadline-gplv2-dev re2c libxml2-dev tmux

RUN wget https://epics-controls.org/download/base/base-7.0.7.tar.gz
RUN tar -xvf base-7.0.7.tar.gz
RUN ln -s /epics/base-7.0.7 /epics/base
WORKDIR /epics/base
RUN make
WORKDIR /epics/

RUN wget https://launchpad.net/epics-gateway/trunk/2.0.6.0/+download/gateway2_0_6_0.tar.gz
RUN tar -xvf gateway2_0_6_0.tar.gz

ADD ./epics/config /epics/config
WORKDIR /epics/
RUN mv gateway2_0_6_0 gateway
RUN cp config/gateway2_0_6_0/configure/RELEASE gateway/configure/RELEASE

WORKDIR /epics/gateway


RUN make
#
# ADD ./src/automation-studio/epics/testIOC /epics/testIOC
# WORKDIR /epics/testIOC
# RUN make clean
# RUN make
#
#
#
# ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001"
# ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so
#
# ENV PATH="/epics/base/bin/linux-x86_64/:${PATH}"
# RUN echo $PATH
#
#
# WORKDIR /epics/testIOC/iocBoot/ioctestIOC/
ADD ./epics/gateway /epics/gateway/rules/
WORKDIR /epics/gateway
ENV EPICS_CA_AUTO_ADDR_LIST=YES
ENV EPICS_CA_ADDR_LIST=172.16.5.52:8001
CMD ./bin/linux-x86_64/gateway -access /epics/gateway/rules/GATEWAY.access -pvlist /epics/gateway/rules/GATEWAY.pvlist -command /epics/gateway/rules/GATEWAY.command -sip 172.16.5.52  -cport 5064 -sport 8005
#ENTRYPOINT ["/init.sh", "gateway", "-access", "/gateway/GATEWAY.access", "-command", "/gateway/GATEWAY.command", "-pvlist", "/gateway/GATEWAY.pvlist"]
EXPOSE 8005 

#CMD ./st.cmd

EXPOSE 5000 5064 5065 8001
