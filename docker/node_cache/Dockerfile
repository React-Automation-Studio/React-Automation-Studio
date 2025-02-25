FROM node:22.14.0 as node_cache
ADD ./ReactApp/package.json /ReactApp/package.json
WORKDIR /ReactApp
ENV PATH /ReactApp/node_modules/.bin:$PATH
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
