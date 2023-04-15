FROM node:14-alpine
COPY package.json /app/
WORKDIR /app
RUN npm install
COPY index.js /app/
COPY src /app/src/
CMD ["node", "index.js"]