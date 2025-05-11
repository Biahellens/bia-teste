FROM node:20.10

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "dev"]
