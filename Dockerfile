FROM node:alpine
WORKDIR /baut
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build 
CMD [ "yarn", "start" ]