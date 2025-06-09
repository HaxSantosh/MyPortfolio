import ghpages from 'gh-pages';
console.log('Starting deployment...');

ghpages.publish('dist', { 
  branch: 'gh-pages', 
  dotfiles: true, 
  repo: 'https://github.com/HaxSantosh/MyPortfolio.git', 
  user: {
    name: 'HaxSantosh', 
    email: 'HaxSantosh@gmail.com'
  },
  message: 'Auto-generated deployment to GitHub Pages'
}, function(err) { 
  if (err) {
    console.error('Deployment error:', err);
  } else {
    console.log('Published successfully!');
  }
});
