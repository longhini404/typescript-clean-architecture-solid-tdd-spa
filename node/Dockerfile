FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD [ "yarn", "start:prod" ]
