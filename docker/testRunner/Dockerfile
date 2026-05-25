FROM node_cache
WORKDIR /ReactApp

RUN pnpm exec playwright install chromium --with-deps

ENTRYPOINT []
CMD ["pnpm", "test-storybook"]
