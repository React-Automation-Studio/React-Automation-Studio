FROM python:3.7



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

WORKDIR /pvServer

ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001"
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so

ENV PATH="/epics/base/bin/linux-x86_64/:${PATH}"
#RUN echo $PATH

#RUN ls /epics/base/lib/linux-x86_64/

ADD version ./.env* /
ADD version ./server.key* /
ADD version ./server.cer* /
ADD ./build /build



ENTRYPOINT ["python"]

CMD ["-u","pvServer.py"]
#CMD ["/epics/base/bin/linux-x86_64/caget","RFPA:IPA_TUNE_MOT:display_ENG"]
EXPOSE 5000 5064 5065 8001
