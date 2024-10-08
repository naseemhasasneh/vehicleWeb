# Stage 1: Build the Angular app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY src/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/vehicle-web/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]