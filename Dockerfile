FROM node:latest as builder
WORKDIR /app
COPY ./package.json ./
COPY ./ ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]


###PRO RUN CI=false npm run build:production
###PRO FROM nginx:stable-alpine
###PRO COPY ./cicd/nginx.conf /etc/nginx/conf.d/default.conf
###PRO COPY --from=builder /app/build /usr/share/nginx/html
###PRO EXPOSE 80
###PRO USER root
###PRO CMD ["nginx", "-g", "daemon off;"]