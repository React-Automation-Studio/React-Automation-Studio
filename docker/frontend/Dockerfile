FROM node:18.18.2
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
ADD ./ReactApp/package.json /frontend/package.json

RUN npm install --legacy-peer-dep
ADD ./ReactApp/public /frontend/public
ADD ./ReactApp/src /frontend/src
ADD ./ReactApp/index.html /frontend/index.html
ADD ./ReactApp/vite.config.js /frontend/vite.config.js
ADD  ./.env /frontend/
RUN npm run build
VOLUME /build
CMD cp -R /frontend/dist/* /build/

