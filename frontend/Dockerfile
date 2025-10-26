# Stage 1: Build the React application
# Use Node 20 Alpine as the base image for building
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
# CRA builds output to the 'build' directory by default
RUN npm run build

# Stage 2: Serve the application with Nginx
# Use the official Nginx image (Alpine variant for smaller size)
FROM nginx:stable-alpine

# Copy the build output from the 'build' stage to Nginx's web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration file for SPA routing (optional but recommended)
# You can reuse or adapt the nginx.conf from the Angular setup if needed
# If you don't need custom routing rules yet, you can comment this out
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx default)
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
