FROM node:12.0.0 as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY ./ /app/
#COPY package*.json /app/
RUN npm install
CMD ["node", "src/index.js"]

