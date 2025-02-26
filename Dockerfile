FROM node:18.16.1

RUN apt-get update
RUN apt-get install -y chromium

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node /usr/src/app/uploads

USER node

CMD ["npm", "start"]