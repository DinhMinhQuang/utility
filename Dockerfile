FROM node:20

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install --force --production

COPY . .

CMD ["npm", "start"]
