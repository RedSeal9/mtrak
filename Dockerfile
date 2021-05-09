FROM node:14
LABEL maintainer="RedSeal9 <git@redseal.red>"

WORKDIR /red/mtrak

COPY package*.json ./
RUN npm install
COPY . .


EXPOSE 8094
CMD [ "npm", "start" ]