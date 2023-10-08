FROM node:18.16.1

RUN apt-get update
RUN apt-get install -y chromium

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

USER node

COPY . .

CMD ["npm", "start"]