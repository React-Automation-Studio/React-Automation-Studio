FROM node:14.17.5
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
ADD ./ReactApp/package.json /frontend/package.json

RUN npm install
ADD ./ReactApp/public /frontend/public
ADD ./ReactApp/src /frontend/src
ADD  ./.env /frontend/
RUN npm run build
VOLUME /build
CMD cp -R /frontend/build/* /build/

