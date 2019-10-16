const { MongoClient } = require('mongodb');
const axios = require('axios');
const url = 'mongodb://localhost:27017/fishermon';
// id: Number,
// name: String,
// type: [String],
// cost: Number,
// rarity: String,
// bucket: [{type: [String], id: Number, name: String, cost: Number, rarity: String, pokemon: Boolean}],
// rods: [String],
// lakes: [String],
// player: Boolean,
// money: Number,
// store: Boolean
// pokemon: Boolean
const getPokemon = (callback) => {
  let firstGen = [];
  let counter = 787;
  const apiCall = () => {  
    if (counter <= 807) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${counter}`)
        .then((data) => {
        const id = counter;
        const name = data.data.name;
        let type = [];
        for (let j = 0; j < data.data.types.length; j++) {
          type.push(data.data.types[j].type.name);
        }
        let cost;
        let rarity;
        if (data.data.base_experience <= 80) {
          cost = 10
          rarity = 'common';
        } else if (data.data.base_experience > 80 & data.data.base_experience <= 140) {
          cost = 20;
          rarity = 'uncommon';
        } else if (data.data.base_experience > 140 & data.data.base_experience <= 200) {
          cost = 30;
          rarity = 'rare';
        } else if (data.data.base_experience > 200 & data.data.base_experience <= 250) {
          cost = 40;
          rarity = 'super rare';
        } else {
          cost = 50;
          rarity = 'ultra rare';
        }
        
        firstGen.push({
          id: id, name: name, type: type, cost: cost, rarity: rarity, bucket: [], rods: [], lakes: [], player: false, money: 0, store: false, pokemon: true
        });
        counter++;
        console.log(counter)
        apiCall();
      });
    } else {
      console.log('Got pokemon')
      callback(firstGen);
    }
  }
  apiCall();
}

const insertPokemon = (arr, db, callback) => {
  const collection = db.collection('pokemon');
  collection.insertMany(arr, (err, result) => {
    if (err) {
      console.log('err', err);
    }
    callback(result);
  });
};

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');
    const db = client.db('fishermon');
    getPokemon((arr) => {insertPokemon(arr, db, (result) => {
      console.log(result)
      console.log('Finished seeding')
      client.close();
    })})
  }
});
