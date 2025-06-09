#!/bin/bash

# Easy deployment script for your portfolio
echo "Portfolio Deployment Tool"
echo "========================="

# Token from command line or prompt
if [ -z "$1" ]; then
  echo "Please enter your GitHub token:"
  read -s TOKEN
else
  TOKEN=$1
fi

echo "Starting deployment process..."
echo "1. Building the project..."
npm run build

echo "2. Deploying to GitHub Pages..."
GH_TOKEN=$TOKEN npm run deploy-secure

echo "Deployment complete! Your site should be live at:"
echo "https://haxsantosh.github.io/MyPortfolio/"
