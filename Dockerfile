FROM node:gallium-slim

ENV PORT=1234 \
    DATABASE_LOCAL=mongodb://localhost:27017/

LABEL name="beerlog"
LABEL version="2.0"

WORKDIR /app

# install dependencies, --omit=dev no devDepends
COPY ./package.json /app
RUN npm install --omit=dev

# copy all files needed
COPY . /app

# run all the bagaça
CMD ["npm", "start"]