FROM node:16.6.0



ADD ./ReactApp/package.json /frontendserverAppDev/package.json

WORKDIR /frontendserverAppDev
ENV PATH /frontendserverAppDev/node_modules/.bin:$PATH

RUN npm install --legacy-peer-dep

ADD ./.env /frontendserverAppDev/


WORKDIR /






WORKDIR /frontendserverAppDev
ADD ./ReactApp/img /frontendserverAppDev/img
ENV REACT_APP_StyleguideServerPORT=6060
ENV REACT_APP_StyleguideServerURL=http://127.0.0.1
CMD npm run styleguide

EXPOSE 6060
