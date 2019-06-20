FROM node:10.15.0



ADD ./package.json /frontendserverAppDev/package.json

WORKDIR /frontendserverAppDev
ENV PATH /frontendserverAppDev/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install
#ADD ./public /frontendserverAppDev/public
#ADD ./src /frontendserverAppDev/src
ADD version ./.env* /frontendserverAppDev/

#RUN test

WORKDIR /






ADD version ./server.key* /
ADD version ./server.cer* /


WORKDIR /frontendserverAppDev


CMD npm start

EXPOSE 3001 3000
