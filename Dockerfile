# STAGE 1
FROM node:16-alpine AS build
ARG ENV_PARAM
RUN echo "${ENV_PARAM}"

WORKDIR /app
COPY package.json ./
RUN yarn  install
COPY . /app
RUN yarn build:${ENV_PARAM}
# STAGE 2
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]