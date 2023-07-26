# Stage 1: Build React application
FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

CMD ["npm", "start"]