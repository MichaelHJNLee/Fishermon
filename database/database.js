const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fishermon', { useNewUrlParser: true });

const pokemonSchema = mongoose.Schema({
  id: Number,
  name: String,
  type: [String],
  cost: Number,
  rarity: String,
}, { collection: 'pokemon'});

// [{name: 'Good Rod', type: 'rod', cost: '300', store: true}, {name: 'Super Rod', type: 'rod', cost: '800', store: true}, {name: 'Normal Nook', type: 'lake', cost: '300', store: true}, {name: 'Fire Fjord', type: 'lake', cost: '500', store: true}, {name: 'Steel Stream', type: 'lake', cost: '1000', store: true}, {name: 'Grass Gulch', type: 'lake', cost: '500', store: true}, {name: 'Electric Estuary', type: 'lake', cost: '700', store: true}, {name: 'Ghost Gorge', type: 'lake', cost: '1000', store: true}, {name: "Dragon's Den", type: 'lake', cost: '1500', store: true}, {name: 'Flying Fjord', type: 'lake', cost: '700', store: true}, {name: 'Bug Bay', type: 'lake', cost: '700', store: true}, {name: 'Rock River', type: 'lake', cost: '700', store: true}, {name: 'Fairy Lagoon', type: 'lake', cost: '1200', store: true}, {name: 'Psychic Sea', type: 'lake', cost: '1000', store: true}, {name: 'Ground Ground', type: 'lake', cost: '700', store: true}, {name: 'Ice Inlet', type: 'lake', cost: '1000', store: true}, {name: 'Dark Delta', type: 'lake', cost: '1000', store: true}, {name: 'Fighting Strait', type: 'lake', cost: '800', store: true}, {name: 'Poison Ocean', type: 'lake', cost: '700', store: true}]
// {name: 'michael', bucket: [], money: [], rods: ['Old Rod'], lakes: ["Water Well"]}

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

module.exports = {
  getPlayer,
  getPokemon,
  getStore,
}