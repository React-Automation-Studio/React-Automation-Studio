FROM node:10.15.0



ADD ./styleguideServer/ /styleguideServer
WORKDIR /styleguideServer

RUN npm install

#RUN test

WORKDIR /




COPY version ./.env* /
ADD version ./server.key* /
ADD version ./server.cer* /
ADD ./styleguide /styleguide

WORKDIR /styleguideServer

#ENTRYPOINT ["node"]

CMD node styleguideServer.js
#CMD ["/epics/base/bin/linux-x86_64/caget","RFPA:IPA_TUNE_MOT:display_ENG"]
EXPOSE 6060
