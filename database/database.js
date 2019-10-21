const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fishermon', { useNewUrlParser: true, useFindAndModify: false});

const pokemonSchema = mongoose.Schema({
  id: Number,
  name: String,
  type: [String],
  cost: Number,
  rarity: String,
  bucket: [Number],
  rods: [String],
  lakes: [String],
  player: Boolean,
  money: Number,
  store: Boolean
}, { collection: 'pokemon'});


const Pokemon = mongoose.model('fishermon', pokemonSchema);

const getPokemon = (callback) => {
  Pokemon.find({pokemon: true}, (err, data) => {
    if (err) throw err;
    callback(data);
  })
};

const getStore = (callback) => {
  Pokemon.find({store: true}, (err, data) => {
    if (err) throw err;
    callback(data);
  })
}

const getPlayer = (player, callback) => {
  Pokemon.find({name: player}, (err, data) => {
    if (err) throw err;
    callback(data);
  })
}
const getAllPlayers = (callback) => {
  Pokemon.find({"player": true}, (err, data) => {
    if (err) throw err;
    callback(data);
  })
}

const newPlayer = (player, callback) => {
  Pokemon.find({"name": player}, (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      callback('exists');
    } else {
      Pokemon.findOneAndUpdate({"name": player, "player": true}, {id: 0, name: player, type: [], cost: 0, rarity: 0, bucket: [], rods: ['Old Rod'], lakes: ['Water Well'], player: true, money: 1000, store: false}, {upsert: true}, (err, data) => {
        if (err) throw err;
        callback(data);
      })
    }
  })
}

const addToBucket = (player, bucket, callback) => {
  Pokemon.findOneAndUpdate({"name": player, "player": true}, {bucket:bucket}, {new:true}, (err, data) => {
    if (err) throw err;
    callback(data);
  })
}

const sellFromBucket = (player, bucket, money, callback) => {
  Pokemon.findOneAndUpdate({"name": player, "player": true}, {"bucket": bucket, "money": money}, {new: true}, (err, data) => {
    if (err) throw err;
    callback(data);
  })
}

const buyItem = (player, rodLake, array, money, callback) => {
  if (rodLake === 'rods') {
    Pokemon.findOneAndUpdate({"name": player, "player": true}, {"rods": array, "money": money}, {new: true}, (err, data) => {
      if (err) throw err;
      callback(data);
    })
  } else {
    Pokemon.findOneAndUpdate({"name": player, "player": true}, {"lakes": array, "money": money}, {new: true}, (err, data) => {
      if (err) throw err;
      callback(data);
    })
  }
}

const buyGen = (player, gens, money, callback) => {
  Pokemon.findOneAndUpdate({"name": player, "player": true}, {"rarity": gens, "money": money}, {new: true}, (err, data) => {
    if (err) throw err;
    callback(data);
  })
}

module.exports = {
  getPlayer,
  getAllPlayers,
  newPlayer,
  getPokemon,
  getStore,
  addToBucket,
  sellFromBucket,
  buyItem,
  buyGen,
}