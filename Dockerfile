FROM node:12.19

WORKDIR /usr/app/src
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
