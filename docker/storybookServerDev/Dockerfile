FROM node_cache
ADD ./.env /ReactApp/
WORKDIR /ReactApp
ADD ./ReactApp/img /ReactApp/img
CMD pnpm run storybook
EXPOSE 6006
