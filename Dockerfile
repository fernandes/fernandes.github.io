FROM mhart/alpine-node:14 as build_image

# install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

# Copy all local files into the image.
COPY . .
RUN ls -lah .

RUN --mount=type=secret,id=vite_telegram_chat_id \
  export VITE_TELEGRAM_CHAT_ID=`cat /run/secrets/vite_telegram_chat_id`

RUN --mount=type=secret,id=vite_telegram_key \
  export VITE_TELEGRAM_KEY=`cat /run/secrets/vite_telegram_key`

RUN yarn build

RUN rm -rf node_modules

RUN yarn --production

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:slim-14

WORKDIR /app

COPY --from=build_image /app .

EXPOSE 3000
CMD ["node", "./build"]
