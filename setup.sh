#!/bin/sh

# Install dependencies
npm install

# Init the database with Prisma
npx prisma db push

# Seed the database with Prisma
npx prisma db seed

# Build the app
npm run build

# Run the app
npm start
