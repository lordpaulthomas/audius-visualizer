# backend/Dockerfile

# Use a Node.js base image
FROM node:14

# Create and set the working directory
WORKDIR /backend

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["node", "server.mjs"]
