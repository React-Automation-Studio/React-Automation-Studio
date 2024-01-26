FROM node:20.11.0 as node_cache
ADD ./ReactApp/package.json /ReactApp/package.json
WORKDIR /ReactApp
ENV PATH /ReactApp/node_modules/.bin:$PATH
RUN npm install --legacy-peer-dep

FROM node_cache
ADD ./ReactApp/public /ReactApp/public
ADD ./ReactApp/src /ReactApp/src
ADD ./ReactApp/index.html /ReactApp/index.html
ADD ./ReactApp/vite.config.js /ReactApp/vite.config.js
ADD  ./.env /ReactApp/
RUN npm run build
VOLUME /build
CMD cp -R /ReactApp/dist/* /build/

