FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

ENV PORT=4000

EXPOSE 4000

CMD [ "npm", "start" ]