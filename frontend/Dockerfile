FROM node:14.18.0-alpine

EXPOSE 3000

WORKDIR /app

COPY ./package.json .

RUN yarn

COPY . .

CMD ["npm", "run", "start:container"]