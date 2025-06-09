#!/bin/bash

# Script to manually deploy to GitHub Pages
echo "Starting manual deployment process..."

# Set Git user information
git config --local user.name "HaxSantosh"
git config --local user.email "HaxSantosh@gmail.com"

# Create a temporary directory for the deployment
rm -rf .tmp-deploy
mkdir .tmp-deploy
cd .tmp-deploy

# Initialize a new Git repository
git init
git checkout -b gh-pages

# Copy the dist folder contents to this repository
cp -r ../dist/* .
cp -r ../dist/.* . 2>/dev/null || :

# Add, commit, and push the files
git add -A
echo "Files added to git"
git commit -m "Deploy to GitHub Pages"
echo "Changes committed"
git remote add origin https://github.com/HaxSantosh/MyPortfolio.git
echo "Remote origin added"
echo "Pushing to GitHub..."
# Use GH_TOKEN environment variable for authentication
git push -f https://HaxSantosh:${GH_TOKEN}@github.com/HaxSantosh/MyPortfolio.git gh-pages
echo "Push completed"

# Clean up
cd ..
rm -rf .tmp-deploy

echo "Deployment complete!"
