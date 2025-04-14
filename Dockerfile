FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4199

CMD ["npm", "run", "start"]
