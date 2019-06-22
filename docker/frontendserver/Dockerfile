FROM node:10.15.0





WORKDIR /frontendserverApp
ENV PATH /frontendserverApp/node_modules/.bin:$PATH
ADD ./package.json /frontendserverApp/package.json
RUN npm set registry http://registry.npmjs.org/
RUN npm install
ADD ./public /frontendserverApp/public
ADD ./src /frontendserverApp/src
ADD version ./.env* /frontendserverApp/
#ENV REACT_APP_PyEpicsServerBASEURL http://127.0.0.1
#ENV REACT_APP_FrontendServerPORT 9003
#ENV REACT_APP_PyEpicsServerPORT 5003
#ENV REACT_APP_PyEpicsServerNamespace=test
#ENV REACT_APP_EnableLogin=false
RUN npm run build
RUN cp -R /frontendserverApp/build/ /build/
ADD ./frontendServer/ /frontendServer
WORKDIR /frontendServer
ENV PATH /frontendServer/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install

#RUN test

WORKDIR /






ADD version ./server.key* /
ADD version ./server.cer* /


WORKDIR /frontendServer


CMD node frontendServer.js

EXPOSE $REACT_APP_FrontendServerPORT $REACT_APP_PyEpicsServerPORT
