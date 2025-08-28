FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY . ./

RUN npm i

RUN npm run build

FROM node:22-alpine
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

CMD ["node", "/app/server/index.mjs"]
