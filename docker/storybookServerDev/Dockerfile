FROM node:20.11.0 as node_cache
ADD ./ReactApp/package.json /ReactApp/package.json
WORKDIR /ReactApp
ENV PATH /ReactApp/node_modules/.bin:$PATH
RUN npm install --legacy-peer-dep

FROM node_cache
ADD ./.env /ReactApp/
WORKDIR /ReactApp
ADD ./ReactApp/img /ReactApp/img
CMD npm run storybook
EXPOSE 6006
