# Santosh Kumar Yadav - Developer Portfolio

This is a frontend-only developer portfolio for Santosh Kumar Yadav, built with React (using Vite), Redux Toolkit, Tailwind CSS, and Framer Motion. The site is deployed to GitHub Pages at [haxsantosh.github.io/MyPortfolio](https://haxsantosh.github.io/MyPortfolio/).

## Tech Stack
- **Framework/Library:** React (with Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Icons:** React Icons

## Features
- Fully designed and decorated UI
- Dark Mode / Light Mode support
- Interactive content with mocked data
- Responsive across all device sizes
- Animations using Framer Motion
- Sticky navbar, smooth scroll, and scroll-to-top (to be implemented)

## Development

To run the project locally:
1. Clone the repository.
2. Install dependencies: `npm install` (or `yarn install` / `pnpm install`)
3. Start the development server: `npm run dev`

## Building and Deployment

### Building the Project
```bash
npm run build
```

### Deploying to GitHub Pages
You can deploy the website to GitHub Pages using the easy deployment script:

```bash
# Run the simple deployment script (it will prompt for your token)
bash deploy-portfolio.sh

# Or provide your token directly
bash deploy-portfolio.sh YOUR_TOKEN_HERE
```

Alternatively, you can use any of these methods:

```bash
# Method 1: Using the secure-deploy script
GH_TOKEN=your_token_here npm run deploy-secure

# Method 2: Using the token-based approach
GH_TOKEN=your_token_here npm run deploy-token

# Method 3: Using the standard gh-pages approach (requires git credentials)
npm run deploy
```

Note: Never commit your token to your repository. Always provide it via command line or environment variables.

## Linting
To lint the project: `npm run lint`
