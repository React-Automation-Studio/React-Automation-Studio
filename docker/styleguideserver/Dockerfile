FROM node:12.13.1

ADD ./ReactApp/package.json /app/package.json

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

RUN npm set registry http://registry.npmjs.org/
RUN npm install
ADD ./ReactApp/public /app/public

ADD  ./.env /app/
ADD ./ReactApp/src /app/src
ADD ./ReactApp/styleguide.config.js /app/styleguide.config.js
ADD ./ReactApp/img /app/img
RUN npm run styleguidebuild
RUN cp -R /app/styleguide/ /styleguide/
ADD ./ReactApp/img /styleguide/img
ADD ./styleguideServer/ /styleguideServer
WORKDIR /styleguideServer
ENV PATH /styleguideServer/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install



WORKDIR /




COPY  ./.env /

WORKDIR /styleguideServer


CMD node styleguideServer.js

EXPOSE 6060
