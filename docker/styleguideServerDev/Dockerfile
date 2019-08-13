FROM node:10.15.0



ADD ./package.json /frontendserverAppDev/package.json

WORKDIR /frontendserverAppDev
ENV PATH /frontendserverAppDev/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install

ADD version ./.env* /frontendserverAppDev/


WORKDIR /






WORKDIR /frontendserverAppDev
ADD ./img /frontendserverAppDev/img
ENV REACT_APP_StyleguideServerPORT=6060
ENV REACT_APP_StyleguideServerURL=http://127.0.0.1
CMD npm run styleguide
#CMD ls node_modules/

EXPOSE 6060
