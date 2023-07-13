FROM node:18.16.1
ADD ./ReactApp/package.json /frontendserverAppDev/package.json
WORKDIR /frontendserverAppDev
ENV PATH /frontendserverAppDev/node_modules/.bin:$PATH
RUN npm install --legacy-peer-dep
ADD ./.env /frontendserverAppDev/
WORKDIR /
WORKDIR /frontendserverAppDev
CMD npm start

EXPOSE 3001 3000
