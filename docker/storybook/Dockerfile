FROM node:18.18.2

ADD ./ReactApp/package.json /app/package.json

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --legacy-peer-dep
ADD ./ReactApp/public /app/public

ADD  ./.env /app/
ADD ./ReactApp/src /app/src
ADD ./ReactApp/vite.config.js /app/vite.config.js
ADD /ReactApp/.storybook /app/.storybook
COPY ./ReactApp/img /app/img
RUN npm run build-storybook
# ADD ./ReactApp/img /app/storybook-static/img
VOLUME /build
CMD cp -R /app/storybook-static/* /build
