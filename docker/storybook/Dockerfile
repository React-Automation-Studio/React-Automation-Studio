FROM node_cache
ADD ./ReactApp/public /ReactApp/public
ADD  ./.env /ReactApp/
ADD ./ReactApp/src /ReactApp/src
ADD ./ReactApp/vite.config.js /ReactApp/vite.config.js
ADD /ReactApp/.storybook /ReactApp/.storybook
COPY ./ReactApp/img /ReactApp/img
RUN pnpm run build-storybook
ADD ./ReactApp/img /ReactApp/storybook-static/img
VOLUME /build
CMD cp -R /ReactApp/storybook-static/* /build
