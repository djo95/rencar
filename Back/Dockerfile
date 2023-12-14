FROM node:16-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
ENV PORT 5000
EXPOSE ${PORT}