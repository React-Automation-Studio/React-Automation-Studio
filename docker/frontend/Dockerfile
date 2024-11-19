FROM node_cache
ADD ./ReactApp/public /ReactApp/public
ADD ./ReactApp/src /ReactApp/src
ADD ./ReactApp/index.html /ReactApp/index.html
ADD ./ReactApp/vite.config.js /ReactApp/vite.config.js
ADD  ./.env /ReactApp/
RUN pnpm run build
VOLUME /build
CMD cp -R /ReactApp/dist/* /build/

