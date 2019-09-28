import React from 'react';
import axios from 'axios';
import Tile from './Board/Tile.jsx';
import InfoBar from './InfoBar.jsx';
import styled from 'styled-components';
import Fishing from './Fishing.jsx';

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
      pokemon: [],
    };
    this.fishingOff = this.fishingOff.bind(this);
    this.fishingOn = this.fishingOn.bind(this);
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
            console.log(data.data[0].lakes)
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
                this.setState({
                  pokemon: data.data,
                  available: avail
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
  
  render() {
    let tiles = [];
    for (let i = 1; i <= 336; i++) {
      tiles.push(i);
    }
    return(
      <div>
        <InfoBar rods={this.state.rods} lakes={this.state.lakes} fishingOn={this.fishingOn} />
        <StyledBoard>
          {tiles.map((tile, index) => (<Tile id={tile} key={index} />))}
        </StyledBoard>
        {this.state.fishing && <Fishing avail={this.state.available} fishingOn={this.fishingOn} fishingOff={this.fishingOff}/>}
      </div>
    )
  }
}

export default App;