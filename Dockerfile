FROM node:14
WORKDIR /app

COPY backend/package*.json .
RUN npm ci
ARG fbappid
ARG dburl
ARG fbappsecret
ARG jwtsecret
ENV FB_APP_ID=${fbappid}}
ENV FB_APP_SECRET=${fbappsecret}
ENV DB_URL=${dburl}
ENV JWT_SECRET=jwtsecret
ENV PORT 8001
COPY backend/dist .
EXPOSE 8001
CMD ["node", "index.js"]