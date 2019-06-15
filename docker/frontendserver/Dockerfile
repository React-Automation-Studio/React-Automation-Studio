FROM node:10.15.0



ADD ./frontendServer/ /frontendServer
WORKDIR /frontendServer

RUN npm install

#RUN test

WORKDIR /




COPY version ./.env* /
ADD version ./server.key* /
ADD version ./server.cer* /
ADD ./build /build

WORKDIR /frontendServer

#ENTRYPOINT ["node"]

CMD node frontendServer.js
#CMD ["/epics/base/bin/linux-x86_64/caget","RFPA:IPA_TUNE_MOT:display_ENG"]
EXPOSE 9000 5000
