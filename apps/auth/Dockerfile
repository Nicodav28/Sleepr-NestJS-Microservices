# Development stage
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

# Install both production and development dependencies
RUN pnpm install

COPY . .

# Build your application
RUN pnpm run build

# Production stage
FROM node:alpine AS production

# Set environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

# Install only production dependencies
RUN pnpm install --prod

# Copy built files from development stage
COPY --from=development /usr/src/app/dist ./dist

# Command to run the application
CMD ["node", "dist/apps/auth/main"]
