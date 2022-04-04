FROM node:10-alpine as builder
RUN #ping registry.npmjs.org -c 3
WORKDIR /app
COPY ./package.json ./
#COPY package-lock.json ./
COPY ./ ./
RUN npm install
# RUN npm audit fix
# - CI=false npm run build  # build the React app, set CI=false because CI=true treats all warnings as errors
#_env_development because .env.development ignoreed  comment will be replaced in gitlab-ci.yaml
###DEV COPY ./cicd/dev/robots.txt ./robots.txt
###DEV EXPOSE 80
###DEV CMD ["npm", "run", "start:dev"]


###PRO RUN CI=false npm run build:production
###PRO FROM nginx:stable-alpine
###PRO COPY ./cicd/nginx.conf /etc/nginx/conf.d/default.conf
###PRO COPY --from=builder /app/build /usr/share/nginx/html
###PRO EXPOSE 80
###PRO USER root
###PRO CMD ["nginx", "-g", "daemon off;"]