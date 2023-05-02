# Use an official Node.js runtime as a parent image
FROM node:17-alpine

# Add docker-compose-wait tool
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.12.0/wait /wait
RUN chmod +x /wait

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Launch the wait tool and then the application
CMD /wait && ./setup.sh
