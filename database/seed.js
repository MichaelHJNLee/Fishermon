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
  let counter = 152;
  const costs = [10, 20, 30, 40, 50];
  const rare = ['common', 'uncommon', 'rare', 'super rare', 'ultra rare'];
  const apiCall = () => {  
    if (counter <= 251) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${counter}`)
        .then((data) => {
        const id = counter;
        const name = data.data.name;
        let type = [];
        for (let j = 0; j < data.data.types.length; j++) {
          type.push(data.data.types[j].type.name);
        }
        const random = Math.floor(Math.random() * 5);
        const cost = costs[random];
        const rarity = rare[random];
        
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
// axios.get(`https://pokeapi.co/api/v2/pokemon/${89}`)
//   .then((data) => {
//     console.log(data.data.name, data.data.types)
//   })
// MongoClient.connect(url, (err, client) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Connected to MongoDB');
//     const db = client.db('fishermon');
//     const collection = db.collection('pokemon');
//     collection.insertMany([{id: 1, name: 'Bulbasaur', type: ['grass', 'poison']}, {id: 1, name: 'Bulbasaur', type: ['grass', 'poison']}], (err, result) => {
//       if (err) {
//         console.log('err', err);
//       }
//       console.log(result)
//     });
//   }
// });
