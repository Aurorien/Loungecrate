FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc
EXPOSE 3000
CMD [ "node", "index.js" ]

# FROM node:18
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# RUN apt-get update && apt-get install -y netcat-openbsd
# COPY . .
# RUN chmod +x /app/start-backend.sh
# EXPOSE 3000
# CMD ["/app/start-backend.sh"]

# CMD [ "node", "index.js" ]
