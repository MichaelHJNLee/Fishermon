const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const pokemon = require('../database/database.js');

const app = express();
const port = 3000;
app.use(cors());
app.use(compression());
app.use(bodyParser());
app.use(express.static('public'));

app.get('/pokemon', (req, res) => {
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

app.get('/players', (req, res) => {
  pokemon.getAllPlayers((data) => {
    res.send(data);
  })
})

app.get('/player/new/:id', (req, res) => {
  const id = req.params.id;
  pokemon.newPlayer(id, (data) => {
    res.send(data)
  })
})

app.put('/player/catch/:id', (req, res) => {
  const id = req.params.id;
  pokemon.addToBucket(id, req.body, (data) => {
    res.send(data);
  })
})

app.put('/player/sell/:id', (req, res) => {
  const id = req.params.id;
  pokemon.sellFromBucket(id, req.body.bucket, req.body.cost, (data) => {
    res.send(data)
  });
})

app.put('/player/buy/:rodLake/:id', (req, res) => {
  const id = req.params.id;
  const rodLake = req.params.rodLake;
  pokemon.buyItem(id, rodLake, req.body.array, req.body.cost, (data) => {
    res.send(data);
  })
})




app.listen(port, () => { console.log(`Listening on port ${port}`); });