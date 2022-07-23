FROM node:16.16.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

ENV PORT=4000

EXPOSE $PORT

CMD ["npx", "nest", "start", "--watch"]
