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
You can deploy the website to GitHub Pages using the secure deploy script:

```bash
# Set your GitHub token as an environment variable
GH_TOKEN=your_token_here

# Run the secure deployment script
npm run deploy-secure
```

or directly use one of the provided scripts:

```bash
# Using the token-based approach
npm run deploy-token

# Using the standard gh-pages approach (requires proper git credentials)
npm run deploy
```

## Linting
To lint the project: `npm run lint`
