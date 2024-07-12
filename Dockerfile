FROM node:18

WORKDIR /desafio-mb-front
COPY desafio-mb-front/ ./
RUN yarn install
RUN yarn build

WORKDIR /desafio-mb-back
COPY desafio-mb-back/ ./
RUN npm install

WORKDIR /
COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 3000
EXPOSE 8000

CMD ["./start.sh"]