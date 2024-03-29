import React from 'react';
import styled from 'styled-components';

const StyledSuccess = styled.div`
  position: absolute;
  height: 600px;
  width: 500px;
  top: 12%;
  left: 33%;
  border: 1px solid green;
  background: white;
  z-index: 10;
`;

const Congratulations = styled.div`
  height: 100px;
  width: 500px;
  text-align: center;
  font-size: 20px;
  margin: 10px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const YouCaught = styled.div`
  height: 100px;
  width: 500px;
  text-align: center;
  font-size: 18px;
  margin: 0px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const Sprite = styled.div`
  height: 250px;
  width: 250px;
  display: block;
  margin: auto;
`;

const Rarity = styled.div`
  height: 100px;
  width: 500px;
  text-align: center;
  font-size: 15x;
  margin: 0px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const Cost = styled.div`
  height: 100px;
  width: 500px;
  text-align: center;
  font-size: 15x;
  margin: 0px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const Exit = styled.div`
  height: 80px;
  width: 80px;
  position: absolute;
  top: 0;
  left: 0;
`;

class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.props.removeSuccess);
    this.setState({
      name: this.props.nextPokemon.name[0].toUpperCase() + this.props.nextPokemon.name.slice(1)
    })
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.removeSuccess);
  }

  render() {
    let color = 'sprites';
    let text = ' ';
    if (this.props.shiny === 99) {
      color = 'shiny';
      text = ' shiny ';
    }
    return (
      <StyledSuccess>
        <Exit onClick={this.props.removeSuccess}>X</Exit>
        <Congratulations>Congratulations!</Congratulations>
        <YouCaught>You caught a{text}{this.props.nextPokemon.name[0].toUpperCase() + this.props.nextPokemon.name.slice(1)}!</YouCaught>
        <Sprite><img src={`/${color}/${this.props.nextPokemon.id}.png`} style={{"display":"block", "height": "250px", "width": "250px", "margin": "auto"}}/></Sprite>
        <Rarity>{this.props.nextPokemon.rarity[0].toUpperCase() + this.props.nextPokemon.rarity.slice(1)}</Rarity>
        <Cost>{this.props.nextPokemon.cost} Coins</Cost>
      </StyledSuccess>
    )
  }
}

export default Success;