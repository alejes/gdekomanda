const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const index = (req, res, next) => {
  let url = req.originalUrl;

  if (url.indexOf('.') === -1) {
    let indexHtml = path.join(__dirname, 'html/index.html');

    fs.readFile(indexHtml, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Something broken!');
      }
      res.send(data);
    });
  } else {
    next();
  }
};

app.use(index);
app.use(express.static('html'));

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
