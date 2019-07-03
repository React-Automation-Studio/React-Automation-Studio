FROM node:10.15.0

ADD ./package.json /app/package.json

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

RUN npm set registry http://registry.npmjs.org/
RUN npm install
ADD ./public /app/public

ADD version ./.env* /app/
ADD ./src /app/src
ADD ./styleguide.config.js /app/styleguide.config.js
RUN npm run styleguidebuild
RUN cp -R /app/styleguide/ /styleguide/

ADD ./styleguideServer/ /styleguideServer
WORKDIR /styleguideServer
ENV PATH /styleguideServer/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install



WORKDIR /




COPY version ./.env* /

WORKDIR /styleguideServer

#ENTRYPOINT ["node"]

CMD node styleguideServer.js
#CMD ["/epics/base/bin/linux-x86_64/caget","RFPA:IPA_TUNE_MOT:display_ENG"]
EXPOSE 6060
