# set the base image
# This is the application image from which
# all other subsequent applications run
# why alpine? Alpine Linux is a security-oriented, lightweight
# Linux distribution. how small? how about 5Mb?
# in comparison ubuntu 18.04 is about 1.8Gb
FROM node:alpine as build

# set working directory
# this is the working folder in the container
# from which the app will be running from
WORKDIR /app

# copy package.json and yarn.lock
# package.json to install the packages from
# and yarn.lock for a package called chokidar
# which is used for hot reloading
COPY . .

# install and cache dependencies
# n/b: these dependencies are installed inside docker
# it runs the command "yarn" which is an equivalent of "yarn add"
RUN npm install --force

# Build project
RUN npm run build:prod

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]