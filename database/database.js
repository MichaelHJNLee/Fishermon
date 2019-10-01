const mongoose = require('mongoose');
mongoose.connect('mongodb://ec2-13-52-177-221.us-west-1.compute.amazonaws.com:27017/fishermon', { useNewUrlParser: true });

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
// {name: 'michael', bucket: [], money: [], rods: ['Old Rod'], lakes: ["Water Well"]}
// [{id: NaN, name: 'Good Rod', type: ['rod'], cost: '300', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Super Rod', type: ['rod'], cost: '800', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Ultra Rod', type: ['rod'], cost: '1500', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Normal Nook', type: ['lake'], cost: '300', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Fire Fjord', type: ['lake'], cost: '500', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Steel Stream', type: ['lake'], cost: '1000', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Grass Gulch', type: ['lake'], cost: '500', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Electric Estuary', type: ['lake'], cost: '700', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Ghost Gorge', type: ['lake'], cost: '1000', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: "Dragon's Den", type: ['lake'], cost: '1500', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Flying Fjord', type: ['lake'], cost: '700', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Bug Bay', type: ['lake'], cost: '700', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Rock River', type: ['lake'], cost: '700', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Fairy Lagoon', type: ['lake'], cost: '1200', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Psychic Sea', type: ['lake'], cost: '1000', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Ground Ground', type: ['lake'], cost: '700', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Ice Inlet', type: ['lake'], cost: '1000', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Dark Delta', type: ['lake'], cost: '1000', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Fighting Strait', type: ['lake'], cost: '800', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}, {id: NaN, name: 'Poison Ocean', type: ['lake'], cost: '700', rarity: 'none', bucket: [], rods: [], lakes: [], player: false, money: 0, store: true}]

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
  Pokemon.findOneAndUpdate({"name": player, "player": true}, {id: 0, name: player, type: [], cost: 0, rarity: 0, bucket: [], rods: ['Old Rod'], lakes: ['Water Well'], player: true, money: 0, store: false}, {upsert: true}, (err, data) => {
    if (err) throw err;
    callback(data);
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

module.exports = {
  getPlayer,
  getAllPlayers,
  newPlayer,
  getPokemon,
  getStore,
  addToBucket,
  sellFromBucket,
  buyItem,
}