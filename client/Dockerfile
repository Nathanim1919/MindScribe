# Define the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package*.json files from the local machine to the root of the container
COPY package*.json .

# RUN a command to install all dependencies found in the package.json file which are neccarry to run the application
RUN npm install

# COPY all files from the local to the root dir of the conatiner
COPY . .

# define the command to run the application
CMD ["npm", "start"]