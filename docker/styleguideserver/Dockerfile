FROM node:10.15.0



ADD ./styleguideServer/ /styleguideServer
WORKDIR /styleguideServer
ENV PATH /styleguideServer/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install
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
