FROM node:22-alpine3.19 AS base

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files to the working directory
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN yarn db:generate

EXPOSE 8000

CMD ["yarn", "dev"]
