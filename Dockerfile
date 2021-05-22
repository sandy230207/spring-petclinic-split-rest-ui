# ARG DOCKER_HUB="docker.io"

# FROM $DOCKER_HUB/library/node:10.10-alpine as build
FROM node:10.10-alpine as build


COPY . /workspace/

ARG NPM_REGISTRY=" https://registry.npmjs.org"

RUN echo "registry = \"$NPM_REGISTRY\"" > /workspace/.npmrc
WORKDIR /workspace/
RUN npm install
RUN npm run build

# ARG NGINX_VERSION="1.17.6"
# FROM $DOCKER_HUB/library/nginx:$NGINX_VERSION AS runtime
FROM nginx:1.17.6 AS runtime

COPY  --from=build /workspace/dist/ /usr/share/nginx/html/

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx
RUN sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf


EXPOSE 8080

USER nginx

HEALTHCHECK     CMD     [ "service", "nginx", "status" ]


