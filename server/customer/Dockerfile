FROM node:12
WORKDIR /App
COPY package.json /App
RUN npm install
COPY . /App
EXPOSE 4001
ENTRYPOINT ["node", "customer.js"]