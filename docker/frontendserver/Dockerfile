FROM node:14.15.3





WORKDIR /frontendserverApp
ENV PATH /frontendserverApp/node_modules/.bin:$PATH
ADD ./ReactApp/package.json /frontendserverApp/package.json
RUN npm set registry http://registry.npmjs.org/
RUN npm install
ADD ./ReactApp/public /frontendserverApp/public
ADD ./ReactApp/src /frontendserverApp/src
ADD  ./.env /frontendserverApp/

RUN npm run build
RUN cp -R /frontendserverApp/build/ /build/
ADD ./frontendServer/ /frontendServer
WORKDIR /frontendServer
ENV PATH /frontendServer/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install

#RUN test

WORKDIR /





WORKDIR /frontendServer


CMD node frontendServer.js

EXPOSE $REACT_APP_FrontendServerPORT $REACT_APP_PyEpicsServerPORT
