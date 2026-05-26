# Use Node image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build project
RUN npm run build

# Expose app port
EXPOSE 3000

# Start application
CMD ["npm", "run", "start:prod"]