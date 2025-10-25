# Stage 1: Build the Angular application
# Use Node 20 Alpine as the base image for building
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock, pnpm-lock.yaml)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
# Explicitly name the project 'frontend' (based on angular.json)
RUN npm run build Frontend -- --configuration production

# Stage 2: Serve the application with Nginx
# Use the official Nginx image (Alpine variant for smaller size)
FROM nginx:stable-alpine

# Copy the build output from the 'build' stage to Nginx's web root directory
COPY --from=build /app/dist/Frontend/browser /usr/share/nginx/html

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx default)
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]

