const express = require('express');
const cors = require('cors');
const compression = require('compression');
const pokemon = require('../database/database.js');

const app = express();
const port = 3000;
app.use(cors());
app.use(compression());
app.use(express.static('public'));

app.get('/pokemon/', (req, res) => {
  pokemon.getPokemon((data) => {
    res.send(data);
  })
})

app.get('/store', (req, res) => {
  pokemon.getStore((data) => {
    res.send(data);
  })
})

app.get('/player/:id', (req, res) => {
  const id = req.params.id;
  pokemon.getPlayer(id, (data) => {
    res.send(data);
  })
})

app.listen(port, () => { console.log(`Listening on port ${port}`); });