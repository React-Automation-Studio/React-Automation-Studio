FROM node:10.15.0



ADD ./frontendServer/ /frontendServer
WORKDIR /frontendServer
ENV PATH /frontendServer/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install

#RUN test

WORKDIR /




#COPY version ./.env* /
ENV REACT_APP_PyEpicsServerBASEURL=http://127.0.0.1
ENV REACT_APP_FrontendServerPORT=9000
ENV REACT_APP_PyEpicsServerPORT=5000
ENV REACT_APP_PyEpicsServerNamespace=test
ENV REACT_APP_EnableLogin=false
ADD version ./server.key* /
ADD version ./server.cer* /
ADD ./build /build

WORKDIR /frontendServer


CMD node frontendServer.js

EXPOSE $REACT_APP_FrontendServerPORT $REACT_APP_PyEpicsServerPORT
