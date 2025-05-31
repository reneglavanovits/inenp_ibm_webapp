# Stage 1: Build the UI5 app (optional, if using a build step)
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Set environment variables
ENV APP_DIR=/usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ${APP_DIR}/*

# Copy UI5 app files (adjust if using a dist/build folder)
COPY ./webapp ${APP_DIR}

# Optional: Custom Nginx config (uncomment if you have one)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
