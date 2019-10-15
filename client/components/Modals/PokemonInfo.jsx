import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
  display: flex;
  position: absolute;
  z-index: 10;
  height: 150px;
  width: 280px;
  background: white;
  left: 34.5%;
  top: 12%;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const PokemonName = styled.div`
  display: flex;
  position: absolute;
  height: 20px;
  width: auto;
  left: 8%;
  top: 10%;
  font-size: 10px;
`;

const Rarity = styled.div`
  display: flex;
  position: absolute;
  height: 20px;
  width: auto;
  left: 62%;
  top: 80%;
  font-size: 10px;
`;

const PokemonSprite = styled.img`
  display: flex;
  position: absolute;
  left: 53%;
  top: 20%;
`;

const SellQuery = styled.div`
  display: flex;
  flex-flow: wrap;
  height: auto;
  width: 120px;
  position: absolute;
  left: 8%;
  top: 40%;
  font-size: 8px;
`;

const Sell = styled.button`
  height: 35px;
  width: 90px;
  border: 1px solid black;
  position: absolute;
  left: 10%;
  top: 65%;
  font-family: 'Press Start 2P', cursive;
`;

const XButton = styled.button`
  display: flex;
  height: auto;
  width: auto;
  position: absolute;
  left: 92%;
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
`;
const PokemonInfo = (props) => {
  let color = 'sprites';
  let name = props.selectedPokemon.name[0].toUpperCase() + props.selectedPokemon.name.slice(1);
  if (props.displayShiny) {
    color = 'shiny';
    name = 'Shiny ' + name;
  }
  return (
    <Info>
      <PokemonName>#{props.selectedPokemon.id}:{name}</PokemonName>
      <XButton onClick={props.hide} >X</XButton>
      <PokemonSprite src={`/${color}/${props.selectedPokemon.id}.png`} style={{"height": "100px", "width": "100px"}} />
      <Rarity>{props.selectedPokemon.rarity[0].toUpperCase() + props.selectedPokemon.rarity.slice(1)}</Rarity>
      <SellQuery>Sell {name} for {props.selectedPokemon.cost} coins?</SellQuery>
      <Sell onClick={() => {props.sell(props.selectedPokemon)}}>Sell</Sell>
    </Info>
  )
}

export default PokemonInfo;