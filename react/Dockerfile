FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


FROM node:16-alpine AS builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ENV GENERATE_SOURCEMAP=false

RUN yarn build


FROM nginx:1.19.8-alpine AS runner

WORKDIR /usr/share/nginx/html

ENV NODE_ENV production

COPY --from=builder /app/build ./
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/.docker/nginx/server.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
