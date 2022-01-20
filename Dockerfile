FROM node:17-alpine AS BASE

# Load Env Vars
ARG TOKEN

WORKDIR /opt/baut/

COPY . .

RUN yarn install

CMD ["npm run", "start"]