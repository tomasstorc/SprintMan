FROM node:14
WORKDIR /app

COPY backend/package*.json .
RUN npm ci
COPY backend/dist .
EXPOSE 8001
CMD ["node", "index.js"]