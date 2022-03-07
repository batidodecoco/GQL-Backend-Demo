FROM node:16-alpine as base

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

FROM base as production

RUN npm run build

CMD ["npm", "start"]