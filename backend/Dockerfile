FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Ensure all npm packages are installed
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]