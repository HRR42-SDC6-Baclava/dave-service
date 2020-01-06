const newrelic = require('newrelic');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const cors = require('cors');
const db = require(`../database/${process.env.DB}/controller.js`);

app.use(express.static('public'));
app.use(express.json());
app.use(cors());


app.get('/api/restaurants/:id', (req, res) => {
  var id = parseInt(req.params.id);
  // console.log("Restaurant ID: ", id);
  db.get(id, (err, results) => {
    if (err) {
      res.status(500);
      res.send();
      return
    }
    res.send(results);
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})
