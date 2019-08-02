FROM anh4n/meteor:1.8.1 as builder

COPY . /app

RUN meteor npm install \
    && meteor build --directory  /app

FROM node:8.15.1

LABEL MAINTAINER="Andre Hanel"
LABEL Description="Agile Card Generator"

ENV ROOT_URL http://localhost
ENV PORT 3000

COPY --from=builder /app/bundle /app

WORKDIR /app/programs/server

RUN npm install

EXPOSE 3000

CMD [ "node", "/app/main.js" ]
