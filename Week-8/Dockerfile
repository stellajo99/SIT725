# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to optimize caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port (default is 3000)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
