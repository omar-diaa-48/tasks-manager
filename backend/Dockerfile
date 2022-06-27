FROM node:14.18.0-alpine

EXPOSE 9000

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:container"]