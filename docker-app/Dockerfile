# Dockerfile
# Use a Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
# This step is separated to leverage Docker's build cache
COPY package*.json ./

# Install dependencies, including pm2
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the TypeScript code
# This will compile .ts files into .js files in the 'dist' directory
RUN npm run build

# Expose the port the application will run on
EXPOSE 3000

# Command to run the application using pm2-runtime
# pm2-runtime is designed to run Node.js applications in Docker containers
# It handles graceful shutdowns and keeps the container alive
CMD ["npm", "start"]
