# aichatbestie production
# Dependencies
FROM ktruong008/aichatbestie-dependencies:1.0.0 as dependencies

# Build
FROM node:18.12.1-alpine3.15 as node-build

# https://stackoverflow.com/questions/62663167/dockerizing-react-in-production-mode-fatal-error-ineffective-mark-compacts-nea
# ENV NODE_OPTIONS=--max-old-space-size=8192

WORKDIR /usr/src/app
COPY . ./
COPY --from=dependencies /usr/src/app/ ./

RUN npm run build
RUN mv node_modules build
# https://github.com/sveltejs/kit/issues/2410
RUN mv package.json build
WORKDIR /usr/src/app/build/

# Stage 2
FROM node:18.12.1-alpine3.15

ARG APP_PORT=3000
WORKDIR /usr/src/app
COPY --from=node-build /usr/src/app/build/ ./

RUN echo "Files copied from first stage"
RUN ls && pwd

EXPOSE $APP_PORT

RUN echo "Docker image created successfully"
RUN ls && pwd

ENTRYPOINT ["node"]
CMD ["index.js"]
