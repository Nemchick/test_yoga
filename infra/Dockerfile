# Dockerfile
# Stage 1 - the build process
FROM node:18 as builder
RUN mkdir /opt/app
WORKDIR /opt/app
COPY . ./
RUN yarn install --production=false; yarn build

## Stage 2 - the production environment
FROM nginx:alpine
#
COPY infra/nginx/default.conf.template /etc/nginx/templates/
RUN rm -rf /usr/share/nginx/html/*
# copy SPA
COPY --from=builder /opt/app/dist /opt/app
CMD ["nginx", "-g", "daemon off;"]