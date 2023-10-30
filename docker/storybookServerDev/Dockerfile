FROM node:18.18.2

ADD ./ReactApp/package.json /frontendserverAppDev/package.json
WORKDIR /frontendserverAppDev
ENV PATH /frontendserverAppDev/node_modules/.bin:$PATH
RUN npm install --legacy-peer-dep

ADD ./.env /frontendserverAppDev/


WORKDIR /






WORKDIR /frontendserverAppDev
ADD ./ReactApp/img /frontendserverAppDev/img
# ENV VITE_StyleguideServerPORT=6060
# ENV VITE_StyleguideServerURL=http://127.0.0.1
CMD npm run storybook

EXPOSE 6006
