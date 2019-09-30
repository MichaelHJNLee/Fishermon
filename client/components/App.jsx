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

const StyledBoard = styled.div`
  display: flex;
  height: 700px;
  width: 1200px;
  flex-flow: row wrap;
  align-self: center;
  box-sizing: border-box;
  margin: auto;
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
      login: false,
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
  }

  componentDidMount() {
    axios.get('/store')
      .then((data) => {
        this.setState({
          store: data.data
        })
        axios.get(`/player/${this.state.player}`)
          .then((data) => {
            this.setState({
              lakes: data.data[0].lakes,
              rods: data.data[0].rods,
              money: data.data[0].money,
              bucket: data.data[0].bucket
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
                let pokemon = avail[Math.floor(Math.random() * avail.length)];
                this.setState({
                  allPokemon: data.data,
                  available: avail,
                  nextPokemon: pokemon
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
    let currentBucket = this.state.bucket;
    currentBucket.push(poke.id);
    axios.put(`/player/catch/${this.state.player}`, currentBucket)
      .then((res) => {
      })
    this.setState({
      bucket: currentBucket,
      success: true,
    })
  }

  removeSuccess() {
    let avail = this.state.available;
    let pokemon = avail[Math.floor(Math.random() * avail.length)];
    this.setState({
      success: false,
      nextPokemon: pokemon
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
    let selected = this.state.allPokemon[pokemonId - 1];
    this.setState({
      pokemonDisplay: true,
      selectedPokemon: selected
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
    for (let i = 0; i < currentBucket.length; i++) {
      if (currentBucket[i] === poke.id) {
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
    let pokemon = avail[Math.floor(Math.random() * avail.length)];
    this.setState({
      available: avail,
      nextPokemon: pokemon,
      currentLake: lake
    })
  }
  
  render() {
    let tiles = [];
    for (let i = 1; i <= 336; i++) {
      tiles.push(i);
    }
    return(
      <div>
        {this.state.player === 'michael' && 
        <div>
        <InfoBar changeLake={this.handleLakeChange} rods={this.state.rods} lakes={this.state.lakes} fishingOn={this.fishingOn} player={this.state.player} money={this.state.money} displayBucket={this.displayBucket} displayStore={this.displayStore}/>
        {this.state.bucketDisplay && <Bucket bucket={this.state.bucket} all={this.state.allPokemon} displayPokemonInfo={this.displayPokemonInfo} />}
        {this.state.storeItemDisplay && <StoreItemInfo hide={this.hideStoreItemInfo} selected={this.state.selectedItem} buy={this.handleBuy} />}
        {this.state.storeDisplay && <Store store={this.state.store} display={this.displayStoreItemInfo} />}
        {this.state.pokemonDisplay && <PokemonInfo selectedPokemon={this.state.selectedPokemon} sell={this.handleSell} hide={this.hidePokemonInfo} />}
        <StyledBoard>
          {tiles.map((tile, index) => (<Tile id={tile} key={index} fishing={this.state.fishing} lake={this.state.currentLake} />))}
        </StyledBoard>
        {this.state.fishing && <Fishing avail={this.state.available} fishingOn={this.fishingOn} fishingOff={this.fishingOff} success={this.displaySuccess} nextPokemon={this.state.nextPokemon} />}
        {this.state.success && <Success nextPokemon={this.state.nextPokemon} success={this.displaySuccess} removeSuccess={this.removeSuccess} />}
        </div>}
      </div>
    )
  }
}

export default App;