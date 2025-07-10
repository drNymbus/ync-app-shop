FROM node:22.2

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public

COPY serve.js ./serve.js

COPY start.sh ./start.sh
RUN chmod +x start.sh

ENTRYPOINT ["./start.sh"]
