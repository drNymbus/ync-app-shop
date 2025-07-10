const express = require('express');
const path = require('path');
const app = express();

const port = 3000;
const root = '/shop';

// Serve static files from the React build
app.use(root, express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get(root + '/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log('Accepting connections at localhost:' + port + root);
});
