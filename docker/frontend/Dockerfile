FROM node:18.5.0
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
ADD ./ReactApp/package.json /frontend/package.json

RUN npm install --legacy-peer-dep
ADD ./ReactApp/public /frontend/public
ADD ./ReactApp/src /frontend/src
ADD  ./.env /frontend/
RUN npm run build
VOLUME /build
CMD cp -R /frontend/build/* /build/

