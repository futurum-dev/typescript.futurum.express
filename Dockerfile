FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder /app/build ./build
COPY --from=builder /app/tsconfig.json ./tsconfig.json
EXPOSE 8080
CMD ["node", "./build/src/server.js"]
