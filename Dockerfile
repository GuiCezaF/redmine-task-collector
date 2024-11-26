FROM node:20.18-slim

WORKDIR /app

COPY . /app

RUN chmod +x ./scripts/wait-for-it.sh

RUN npm install

RUN npm run build

EXPOSE 3333

CMD ["./scripts/wait-for-it.sh", "db:5432", "--", "npm", "run", "start:prod"]
