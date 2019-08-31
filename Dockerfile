FROM node:8.15.1-alpine

WORKDIR /client

COPY package.json /client

RUN npm install

COPY . /client

EXPOSE 3000

CMD ["npm", "start"]

