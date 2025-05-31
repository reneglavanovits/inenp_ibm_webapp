# Stage 1: Build the UI5 app (optional, if using a build step)
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Set environment variables
ENV APP_DIR=/usr/share/nginx/html

# Copy UI5 app files (adjust if using a dist/build folder)
COPY --from=build /app/dist ${APP_DIR}

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
