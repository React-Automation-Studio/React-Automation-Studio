FROM node:12.15.0



ADD ./ReactApp/package.json /frontendserverAppDev/package.json

WORKDIR /frontendserverAppDev
ENV PATH /frontendserverAppDev/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install

ADD ./.env /frontendserverAppDev/


WORKDIR /






WORKDIR /frontendserverAppDev


CMD npm start

EXPOSE 3001 3000
