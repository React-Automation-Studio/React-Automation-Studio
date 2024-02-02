FROM epicsbase

# Install OS packages and other dependencies 
RUN apt-get update && \
    apt install -y tmux wkhtmltopdf

# Install python dependencies
WORKDIR /usr/src/app

COPY alarmHandlerServer/src/python/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Set pyepics required environment variables
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so
ENV EPICS_BASE=/epics/base/

# # Download and make epics base
# WORKDIR /epics

# RUN wget https://epics-controls.org/download/base/base-7.0.7.tar.gz
# RUN tar -xvf base-7.0.7.tar.gz
# RUN ln -s /epics/base-7.0.7 /epics/base

# WORKDIR /epics/base
# RUN make

RUN ln -s /epics/base/bin/linux-x86_64/caRepeater /bin/caRepeater

# Move alarmIOC into place and make
COPY alarmHandlerServer/src/epics/alarmIOC /epics/alarmIOC

WORKDIR /epics/alarmIOC
RUN make

WORKDIR /usr/src/app

# symbolic links to start iocs
RUN ln -s /epics/alarmIOC/iocBoot/iocalarmIOC/start_tmux_st.cmd /usr/src/app/startAlarmIOC.cmd

COPY alarmHandlerServer/src/python/ ./

# custom EPICS_CA_ADDR_LIST to only allow dev stuff to communicate
ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001 0.0.0.0:8004 0.0.0.0:8005"

CMD ["python","main.py"]