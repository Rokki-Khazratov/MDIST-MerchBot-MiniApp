#!/bin/bash

# MDIST Wear Frontend Deployment Script
# Usage: ./deploy-to-server.sh

SERVER_USER="root"
SERVER_HOST="195.158.9.83"
SERVER_PATH="/root/projects/tests/frontend"

echo "🚀 Deploying MDIST Wear Frontend to production server..."

# Step 1: Create directory on server
echo "📁 Creating directory on server..."
ssh ${SERVER_USER}@${SERVER_HOST} "mkdir -p ${SERVER_PATH}"

# Step 2: Copy files to server
echo "📦 Copying files to server..."
rsync -avz --exclude 'node_modules' \
           --exclude 'dist' \
           --exclude '.git' \
           --exclude '.vite' \
           --exclude '.DS_Store' \
           ./ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

# Step 3: Build and start on server
echo "🔨 Building and starting containers..."
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_PATH} && docker-compose down && docker-compose up -d --build"

echo "✅ Deployment complete!"
echo "🌐 Frontend is available at: http://195.158.9.83:3000"
echo ""
echo "Useful commands:"
echo "  View logs: ssh ${SERVER_USER}@${SERVER_HOST} 'cd ${SERVER_PATH} && docker-compose logs -f'"
echo "  Restart:   ssh ${SERVER_USER}@${SERVER_HOST} 'cd ${SERVER_PATH} && docker-compose restart'"
echo "  Stop:      ssh ${SERVER_USER}@${SERVER_HOST} 'cd ${SERVER_PATH} && docker-compose down'"

