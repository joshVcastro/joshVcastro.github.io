
### JavaScript for Light/Dark Mode (`script.js`):

```javascript
function toggleTheme() {
  const currentTheme = document.body.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = newTheme;
}

// Initial theme check
document.body.dataset.theme = 'light'; // Set this to 'dark' if you want dark mode to be the default
