const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'), 'index.html')
  res.end()
})

app.listen(port, () => {
   console.log('Server is up!');
});


