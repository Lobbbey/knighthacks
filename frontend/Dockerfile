# Stage 1: Base image with Node.js
FROM node:20-alpine AS base
WORKDIR /app

# Stage 2: Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm install

# Stage 3: Build the application
# Use builder image to create the build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Stage 4: Production image
# Use a minimal production-ready image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the standalone build output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Next.js runs on port 3000 by default
EXPOSE 3000

# The standalone output creates this server.js file for us
CMD ["node", "server.js"]
