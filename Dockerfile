FROM node as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run dev


FROM nginx:alpine
# Copy the build files from the builder stage to the nginx server
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
