FROM python:3.7.5

# Set timezone for timestamps
RUN ln -snf /usr/share/zoneinfo/${TZ-Africa/Johannesburg} /etc/localtime && echo ${TZ-Africa/Johannesburg} > /etc/timezone

# Install OS packages and other dependencies 
RUN apt-get update && \
    apt install -y tmux

# Install python dependencies
WORKDIR /usr/src/app

COPY alarmHandlerServer/src/python/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Set pyepics required environment variables
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so
ENV EPICS_BASE=/epics/base/

# Download and make epics base
WORKDIR /epics

RUN wget https://epics.anl.gov/download/base/base-3.15.7.tar.gz && \
    tar -xvzf base-3.15.7.tar.gz && \
    rm base-3.15.7.tar.gz && \
    mv base-3.15.7 base

WORKDIR /epics/base
RUN make

RUN ln -s /epics/base/bin/linux-x86_64/caRepeater /bin/caRepeater

# Move demoAlarmsIOC into place and make
COPY alarmHandlerServer/src/epics/demoAlarmsIOC /epics/demoAlarmsIOC

WORKDIR /epics/demoAlarmsIOC
RUN make

# Move alarmIOC into place and make
COPY alarmHandlerServer/src/epics/alarmIOC /epics/alarmIOC

WORKDIR /epics/alarmIOC
RUN make

WORKDIR /usr/src/app

# symbolic links to start iocs
RUN ln -s /epics/demoAlarmsIOC/iocBoot/iocdemoAlarmsIOC/start_tmux_st.cmd /usr/src/app/startDemoIOC.cmd
RUN ln -s /epics/alarmIOC/iocBoot/iocalarmIOC/start_tmux_st.cmd /usr/src/app/startAlarmIOC.cmd

COPY alarmHandlerServer/src/python/*.py ./

# custom EPICS_CA_ADDR_LIST to only allow dev stuff to communicate
ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001"
EXPOSE 5000 5064 5065 8001

CMD ["python","main.py"]