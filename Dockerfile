FROM node:20-alpine as build

ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/local/app && cp -a /tmp/node_modules /usr/local/app/
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /usr/local/app/dist/mshopclient/browser /usr/share/nginx/html
COPY ./d.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80 443 6006 4200
CMD ["nginx", "-g", "daemon off;"]