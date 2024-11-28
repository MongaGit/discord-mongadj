# Image  
#FROM node:18.19.1-alpine
FROM node:20.17.0-slim  

# MongaDEV Distributions
LABEL maintainer="brunopoleza@outlook.com.br"
LABEL version="1.0"
LABEL description="Bot Discord Mongadj SoundCloud Music."

# Set the working directory  
WORKDIR /app  

# Install FFmpeg  
RUN apt-get update && apt-get install -y ffmpeg  

# Copy package.json and package-lock.json for npm install  
COPY package*.json ./  

# Install dependencies  
RUN npm install --production  

# Copy the rest of the application code  
COPY . .  

# Expose the port the app runs on  
EXPOSE 3000  

# Command to run the application  
CMD ["node", "bot.js"]  