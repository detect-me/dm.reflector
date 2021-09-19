const express = require('express');

const PORT = '17073';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
