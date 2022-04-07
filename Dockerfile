FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
COPY ./ ./
###DEV COPY ./cicd/dev/robots.txt ./public/robots.txt
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start"]