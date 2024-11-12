# frontend/Dockerfile

# Use the official Node.js image
FROM node:14

# Create and set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 for the React app
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
