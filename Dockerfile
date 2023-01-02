FROM node:gallium-slim

# env porduction pra nao instalar as devDepends
ENV NODE_ENV=production \
    PORT=1234 \
    DATABASE_LOCAL=mongodb://localhost:27017/

LABEL name="beerlog"
LABEL version="2.0"

WORKDIR /app

# install dependencies
COPY ./package.json /app
RUN npm install

# create dirs for beer.js files
RUN mkdir /app/controllers \
    && mkdir /app/models \
    && mkdir /app/routes \
    && mkdir /app/utils

# copy all files needed
COPY ./controllers /app/controllers/
COPY ./models /app/models/
COPY ./routes /app/routes/
COPY ./utils /app/utils/
COPY ./app.js /app
COPY ./server.js /app

# run all the bagaça
CMD ["npm", "start"]