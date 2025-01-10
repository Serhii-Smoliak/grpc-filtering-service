FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --no-cache

COPY . .

RUN yarn global add @nestjs/cli

EXPOSE 5000

CMD ["yarn", "start:dev"]
