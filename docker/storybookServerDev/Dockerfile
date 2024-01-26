FROM node:20.11.0
ADD ./ReactApp/package.json /ReactApp/package.json
WORKDIR /ReactApp
ENV PATH /ReactApp/node_modules/.bin:$PATH
RUN npm install --legacy-peer-dep
ADD ./.env /ReactApp/
WORKDIR /ReactApp
ADD ./ReactApp/img /ReactApp/img
CMD npm run storybook
EXPOSE 6006
