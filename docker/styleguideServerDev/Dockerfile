FROM node:14.15.3



ADD ./ReactApp/package.json /frontendserverAppDev/package.json

WORKDIR /frontendserverAppDev
ENV PATH /frontendserverAppDev/node_modules/.bin:$PATH

RUN npm install

ADD ./.env /frontendserverAppDev/


WORKDIR /






WORKDIR /frontendserverAppDev
ADD ./ReactApp/img /frontendserverAppDev/img
ENV REACT_APP_StyleguideServerPORT=6060
ENV REACT_APP_StyleguideServerURL=http://127.0.0.1
CMD npm run styleguide

EXPOSE 6060
