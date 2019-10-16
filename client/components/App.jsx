import React from 'react';
import axios from 'axios';
import Tile from './Board/Tile.jsx';
import InfoBar from './InfoBar.jsx';
import styled from 'styled-components';
import Fishing from './Modals/Fishing.jsx';
import Success from './Modals/Success.jsx';
import Bucket from './Modals/Bucket.jsx';
import PokemonInfo from './Modals/PokemonInfo.jsx';
import Store from './Modals/Store.jsx';
import StoreItemInfo from './Modals/StoreItemInfo.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Help from './Modals/Help.jsx';

const StyledBoard = styled.div`
  display: flex;
  height: 700px;
  width: 1200px;
  flex-flow: row wrap;
  align-self: center;
  box-sizing: border-box;
  margin: auto;
  font-family: 'Press Start 2P', cursive;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'michael',
      currentLake: 'Water Well',
      money: 0,
      bucket: [],
      rod: 'Old Rod',
      fishing: false,
      available: [],
      store: [],
      lakes: [],
      rods: [],
      allPokemon: [],
      success: false,
      nextPokemon: null,
      bucketDisplay: false,
      pokemonDisplay: false,
      selectedPokemon: null,
      storeDisplay: false,
      selectedItem: null,
      storeItemDisplay: false,
      signup: false,
      login: false,
      help: false,
      users: [],
      usersDisplayed: [],
      common: 60,
      uncommon: 95,
      rare: 100,
      superRare: 100,
      shiny: 0,
      displayShiny: false,
    };
    this.fishingOff = this.fishingOff.bind(this);
    this.fishingOn = this.fishingOn.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
    this.removeSuccess = this.removeSuccess.bind(this);
    this.displayBucket = this.displayBucket.bind(this);
    this.displayPokemonInfo = this.displayPokemonInfo.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.hidePokemonInfo = this.hidePokemonInfo.bind(this);
    this.displayStore = this.displayStore.bind(this);
    this.displayStoreItemInfo = this.displayStoreItemInfo.bind(this);
    this.hideStoreItemInfo = this.hideStoreItemInfo.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleLakeChange = this.handleLakeChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.displaySignUp = this.displaySignUp.bind(this);
    this.handleNewPlayer = this.handleNewPlayer.bind(this);
    this.handleRodChange = this.handleRodChange.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.searchUser = this.searchUser.bind(this);
  }

  componentDidMount() {
    axios.get('/store')
      .then((data) => {
        this.setState({
          store: data.data
        })
        axios.get('/players')
          .then((data) => {
            this.setState({
              users: data.data,
              usersDisplayed: data.data
            })
            axios.get(`/pokemon`)
              .then((data) => {
                let avail = [];
                let type = this.state.currentLake.split(' ')[0][0].toLowerCase() + this.state.currentLake.split(' ')[0].slice(1);

                for (let i = 0; i < data.data.length; i++) {
                  if (data.data[i].type.includes(type)) {
                    avail.push(data.data[i]);
                  }
                }
                let random = Math.floor(Math.random() * 100) + 1;
                let rarity;
                if (random >= 1 && random <= this.state.common) {
                  rarity = 'common';
                } else if (random > this.state.common && random <= this.state.uncommon) {
                  rarity = 'uncommon';
                } else if (random > this.state.uncommon && random <= this.state.rare) {
                  rarity = 'rare';
                } else if (random > this.state.rare && random <= this.state.superRare) {
                  rarity = 'super rare';
                } else {
                  rarity = 'ultra rare';
                }
                let rare = [];
                for (let j = 0; j < avail.length; j++) {
                  if (avail[j].rarity === rarity) {
                    rare.push(avail[j]);
                  }
                }
                if (rare.length < 1) {
                  rare.push(avail[Math.floor(Math.random() * avail.length)]);
                }
                let pokemon = rare[Math.floor(Math.random() * rare.length)];
                let shiny = Math.floor(Math.random() * 500) + 1;
                this.setState({
                  allPokemon: data.data,
                  available: avail,
                  nextPokemon: pokemon,
                  shiny: shiny,
                })
              })
          })
      })
  }

  fishingOn() {
    this.setState({
      fishing: true
    })
  }

  fishingOff() {
    this.setState({
      fishing: false
    })
  }

  displaySuccess(poke) {
    let id = poke.id;
    let currentBucket = this.state.bucket;
    if (this.state.shiny === 99) {
      id = id * 1000;
    }
    currentBucket.push(id);
    axios.put(`/player/catch/${this.state.player}`, currentBucket)
      .then((res) => {
        this.setState({
          bucket: currentBucket,
          success: true,
        })
      })
  }

  removeSuccess() {
    let avail = this.state.available;
    let random = Math.floor(Math.random() * 100) + 1;
    let rarity;
    if (random >= 1 && random <= this.state.common) {
      rarity = 'common';
    } else if (random > this.state.common && random <= this.state.uncommon) {
      rarity = 'uncommon';
    } else if (random > this.state.uncommon && random <= this.state.rare) {
      rarity = 'rare';
    } else if (random > this.state.rare && random <= this.state.superRare) {
      rarity = 'super rare';
    } else {
      rarity = 'ultra rare';
    }
    let rare = [];
    for (let j = 0; j < avail.length; j++) {
      if (avail[j].rarity === rarity) {
        rare.push(avail[j]);
      }
    }
    if (rare.length < 1) {
      rare.push(avail[Math.floor(Math.random() * avail.length)]);
    }
    let pokemon = rare[Math.floor(Math.random() * rare.length)];
    let shiny = Math.floor(Math.random() * 500) + 1;
    this.setState({
      success: false,
      nextPokemon: pokemon,
      shiny: shiny,
    })
  }

  displayBucket() {
    if (this.state.bucketDisplay) {
      this.setState({
        bucketDisplay: false,
        pokemonDisplay: false
      })
    } else {
      this.setState({
        bucketDisplay: true
      })
    }
  }

  displayPokemonInfo(e) {
    let pokemonId = parseInt(e.target.src.split('/')[4].slice(0, e.target.src.split('/')[4].length - 4));
    let shiny = false;
    if (e.target.id === '1') {
      shiny = true;
    }
    let selected = this.state.allPokemon[pokemonId - 1];
    this.setState({
      pokemonDisplay: true,
      selectedPokemon: selected,
      displayShiny: shiny
    })
  }

  hidePokemonInfo() {
    this.setState({
      pokemonDisplay: false,
    })
  }

  handleSell(poke) {
    let currentBucket = this.state.bucket;
    let spliceIndex;
    let id = poke.id;
    if (this.state.displayShiny === true) {
      id = id * 1000;
    }
    for (let i = 0; i < currentBucket.length; i++) {
      if (currentBucket[i] === id) {
        spliceIndex = i;
        break;
      }
    };
    currentBucket.splice(spliceIndex, 1);
    axios.put(`/player/sell/${this.state.player}`, {'bucket': currentBucket, 'cost': this.state.money + poke.cost})
      .then((res) => {
        this.setState({
          bucket: res.data.bucket,
          money: res.data.money,
          pokemonDisplay: false,
        })
      })
  }

  displayStore() {
    if (this.state.storeDisplay) {
      this.setState({
        storeDisplay: false,
        storeItemDisplay: false
      })
    } else {
      this.setState({
        storeDisplay: true
      })
    }
  }

  displayStoreItemInfo(e) {
    this.setState({
      storeItemDisplay: true,
      selectedItem: e
    })
  }

  hideStoreItemInfo() {
    this.setState({
      storeItemDisplay: false
    })
  }

  handleBuy(item) {
    if (this.state.rods.includes(item.name) || this.state.lakes.includes(item.name)) {
      alert("You already have this item!");
      return;
    }
    if (item.cost > this.state.money) {
      alert("You don't have enough coins to buy this item!");
      return;
    }
    if (item.type[0] === 'rod') {
      let rods = this.state.rods;
      rods.push(item.name);
      axios.put(`/player/buy/rods/${this.state.player}`, {'array': rods, 'cost': this.state.money - item.cost})
        .then((res) => {
          this.setState({
            rods: res.data.rods,
            money: res.data.money,
            storeItemDisplay: false
          })
        })
    } else {
      let lakes = this.state.lakes;
      lakes.push(item.name);
      axios.put(`/player/buy/lakes/${this.state.player}`, {'array': lakes, 'cost': this.state.money - item.cost})
        .then((res) => {
          this.setState({
            lakes: res.data.lakes,
            money: res.data.money,
            storeItemDisplay: false
          })
        })
    }
  }

  handleLakeChange(lake) {
    let avail = [];
    let type = lake.split(' ')[0][0].toLowerCase() + lake.split(' ')[0].slice(1);
    for (let i = 0; i < this.state.allPokemon.length; i++) {
      if (this.state.allPokemon[i].type.includes(type)) {
        avail.push(this.state.allPokemon[i]);
      }
    }
    let random = Math.floor(Math.random() * 100) + 1;
    let rarity;
    if (random >= 1 && random <= this.state.common) {
      rarity = 'common';
    } else if (random > this.state.common && random <= this.state.uncommon) {
      rarity = 'uncommon';
    } else if (random > this.state.uncommon && random <= this.state.rare) {
      rarity = 'rare';
    } else if (random > this.state.rare && random <= this.state.superRare) {
      rarity = 'super rare';
    } else {
      rarity = 'ultra rare';
    }
    let rare = [];
    for (let j = 0; j < avail.length; j++) {
      if (avail[j].rarity === rarity) {
        rare.push(avail[j]);
      }
    }
    if (rare.length < 1) {
      rare.push(avail[Math.floor(Math.random() * avail.length)]);
    }
    let pokemon = rare[Math.floor(Math.random() * rare.length)];
    let shiny = Math.floor(Math.random() * 500) + 1;
    this.setState({
      available: avail,
      nextPokemon: pokemon,
      shiny: shiny,
      currentLake: lake
    })
  }
  
  handleLogin(user) {
    axios.get(`/player/${user}`)
      .then((data) => {
        console.log(data.data[0].rarity, typeof data.data[0].rarity)
        this.setState({
          player: data.data[0].name,
          lakes: data.data[0].lakes,
          rods: data.data[0].rods,
          money: data.data[0].money,
          bucket: data.data[0].bucket,
          currentLake: 'Water Well',
          rod: 'Old Rod',
          login: true,
          signup: false,
        })
        this.handleLakeChange('Water Well');
      }
    );
  };

  handleLogout() {
    this.setState({
      login: false,
      bucketDisplay: false,
      storeDisplay: false,
      pokemonDisplay: false,
      success: false,
      storeItemDisplay: false,
    })
  }

  displaySignUp() {
    this.setState({
      signup: true,
    })
  }

  handleNewPlayer(name) {
    if (name === '') {
      alert("Please enter a new fisher name!");
      return;
    }
    axios.get(`/player/new/${name}`)
      .then((data) => {
        if (data.data === 'exists') {
          alert("This fisher already exists");
          return;
        }
        axios.get('/players')
          .then((data) => {
            this.setState({
              users: data.data,
              usersDisplayed: data.data,
              signup: false
            })
          })
      })
  }

  handleRodChange(rod) {
    if (rod === 'Old Rod') {
      this.setState({
        rod: 'Old Rod',
        common: 60,
        uncommon: 95,
        rare: 100,
        superRare: 100,
      })
    } else if (rod === 'Good Rod') {
      this.setState({
        rod: 'Good Rod',
        common: 50,
        uncommon: 80,
        rare: 95,
        superRare: 100
      })
    } else if (rod === 'Super Rod') {
      this.setState({
        rod: 'Super Rod',
        common: 30,
        uncommon: 55,
        rare: 90,
        superRare: 97
      })
    } else if (rod === 'Ultra Rod') {
      this.setState({
        rod: 'Ultra Rod',
        common: 15,
        uncommon: 40,
        rare: 80,
        superRare: 95
      })
    }
  }

  toggleHelp() {
    this.setState({
      help: !this.state.help
    })
  }

  searchUser(e) {
    let searched = [];
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].name.includes(e)) {
        searched.push(this.state.users[i]);
      }
    }
    this.setState({
      usersDisplayed: searched
    })
  }

  render() {
    let tiles = [];
    for (let i = 1; i <= 336; i++) {
      tiles.push(i);
    }
    return(
      <div>
        {!this.state.login && <Login users={this.state.usersDisplayed} login={this.handleLogin} signup={this.displaySignUp} search={this.searchUser}/>}
        {this.state.signup && <SignUp submit={this.handleNewPlayer} />}
        {this.state.login && 
        <div>
        <InfoBar changeRod={this.handleRodChange} changeLake={this.handleLakeChange} rods={this.state.rods} lakes={this.state.lakes} fishingOn={this.fishingOn} player={this.state.player} money={this.state.money} displayBucket={this.displayBucket} displayStore={this.displayStore} logout={this.handleLogout} help={this.toggleHelp} />
        {this.state.bucketDisplay && <Bucket shiny={this.state.shiny} bucket={this.state.bucket} all={this.state.allPokemon} displayPokemonInfo={this.displayPokemonInfo}/>}
        {this.state.help && <Help help={this.toggleHelp}/>}
        {this.state.storeItemDisplay && <StoreItemInfo hide={this.hideStoreItemInfo} selected={this.state.selectedItem} buy={this.handleBuy} />}
        {this.state.storeDisplay && <Store store={this.state.store} display={this.displayStoreItemInfo} />}
        {this.state.pokemonDisplay && <PokemonInfo displayShiny={this.state.displayShiny} selectedPokemon={this.state.selectedPokemon} sell={this.handleSell} hide={this.hidePokemonInfo} />}
        <StyledBoard>
          {tiles.map((tile, index) => (<Tile id={tile} key={index} fishing={this.state.fishing} lake={this.state.currentLake} />))}
        </StyledBoard>
        {this.state.fishing && <Fishing avail={this.state.available} fishingOn={this.fishingOn} fishingOff={this.fishingOff} success={this.displaySuccess} nextPokemon={this.state.nextPokemon} />}
        {this.state.success && <Success shiny={this.state.shiny} nextPokemon={this.state.nextPokemon} success={this.displaySuccess} removeSuccess={this.removeSuccess} />}
        </div>}
      </div>
    )
  }
}

export default App;