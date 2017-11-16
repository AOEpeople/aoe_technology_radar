FROM node:7.10.1 as source
WORKDIR /src/haufe-techradar
COPY . ./
RUN npm install
RUN npm run build:all

FROM nginx:1.13.5
WORKDIR /opt/haufe-techradar
COPY --from=source /src/haufe-techradar/dist .
COPY default.template /etc/nginx/conf.d/default.template
CMD /bin/bash -c "envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"