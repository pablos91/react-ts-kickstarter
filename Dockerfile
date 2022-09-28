FROM node:16-buster as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV NODE_ENV=production

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN yarn

COPY . /usr/src/app
RUN npm run build 

# production environment
FROM nginx
RUN apt-get update \
    && apt-get install -y curl

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
HEALTHCHECK CMD curl --fail http://localhost:80/ || exit 1
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
