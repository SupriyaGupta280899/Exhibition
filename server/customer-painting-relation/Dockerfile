FROM node:12
WORKDIR /App
COPY package.json /App
RUN npm install
COPY . /App
EXPOSE 4002
ENTRYPOINT ["node", "cpr.js"]