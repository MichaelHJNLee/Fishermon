import React from 'react';
import axios from 'axios';
import Tile from './Board/Tile.jsx';
import InfoBar from './InfoBar.jsx';
import styled from 'styled-components';
import Fishing from './Modals/Fishing.jsx';
import Success from './Modals/Success.jsx';
import Bucket from './Modals/Bucket.jsx';

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
      rod: 'old',
      fishing: false,
      available: [],
      store: [],
      lakes: [],
      rods: [],
      allPokemon: [],
      success: false,
      nextPokemon: null,
      bucketDisplay: false,
    };
    this.fishingOff = this.fishingOff.bind(this);
    this.fishingOn = this.fishingOn.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
    this.removeSuccess = this.removeSuccess.bind(this);
    this.displayBucket = this.displayBucket.bind(this);
  }

  componentDidMount() {
    axios.get('/store')
      .then((data) => {
        console.log(data.data)
        this.setState({
          store: data.data
        })
        axios.get(`/player/${this.state.player}`)
          .then((data) => {
            console.log(data.data[0])
            this.setState({
              lakes: data.data[0].lakes,
              rods: data.data[0].rods,
              money: data.data[0].money,
              bucket: data.data[0].bucket
            })
            axios.get(`/pokemon`)
              .then((data) => {
                let avail = [];
                for (let i = 0; i < data.data.length; i++) {
                  if (data.data[i].type.includes('water')) {
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
    currentBucket.push(poke);
    console.log('currentbucket', currentBucket)
    axios.put(`/player/${this.state.player}`, currentBucket)
      .then((res) => {
        console.log(res);
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
    this.setState({
      bucketDisplay: !this.state.bucketDisplay
    })
  }
  
  render() {
    let tiles = [];
    for (let i = 1; i <= 336; i++) {
      tiles.push(i);
    }
    return(
      <div>
        <InfoBar rods={this.state.rods} lakes={this.state.lakes} fishingOn={this.fishingOn} player={this.state.player} money={this.state.money} bucketDisplay={this.displayBucket} />
        {this.state.bucketDisplay && <Bucket bucket={this.state.bucket} />}
        <StyledBoard>
          {tiles.map((tile, index) => (<Tile id={tile} key={index} />))}
        </StyledBoard>
        {this.state.fishing && <Fishing avail={this.state.available} fishingOn={this.fishingOn} fishingOff={this.fishingOff} success={this.displaySuccess} nextPokemon={this.state.nextPokemon} />}
        {this.state.success && <Success nextPokemon={this.state.nextPokemon} success={this.displaySuccess} removeSuccess={this.removeSuccess} />}
      </div>
    )
  }
}

export default App;