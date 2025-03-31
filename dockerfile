FROM node:18-alpine AS BuilderStage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS RuntimeStage

WORKDIR /app

COPY --from=BuilderStage /app/package*.json .
COPY --from=BuilderStage /app/dist .

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "index.js"]
