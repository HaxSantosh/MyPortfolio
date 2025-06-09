#!/bin/bash

# Secure script to deploy to GitHub Pages
echo "Starting secure deployment process..."

# Check if GH_TOKEN is set
if [ -z "$GH_TOKEN" ]; then
    echo "Error: GH_TOKEN environment variable is not set"
    echo "Please set it by running: export GH_TOKEN=your_personal_access_token"
    exit 1
fi

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
git commit -m "Deploy to GitHub Pages"

# Push using the token from environment variable
# This way the token is not stored in the script
git remote add origin https://github.com/HaxSantosh/MyPortfolio.git
git push -f https://HaxSantosh:${GH_TOKEN}@github.com/HaxSantosh/MyPortfolio.git gh-pages

# Clean up
cd ..
rm -rf .tmp-deploy

echo "Deployment complete!"
