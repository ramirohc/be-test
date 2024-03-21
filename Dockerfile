FROM debian:latest

RUN apt-get update && \
    apt-get install -y curl gnupg && \
    apt-get clean
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]
