import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
  display: flex;
  position: absolute;
  z-index: 10;
  height: 150px;
  width: 280px;
  background: white;
  border: 1px solid pink;
  left: 34.5%;
  top: 12%;
`;

const PokemonName = styled.div`
  display: flex;
  position: absolute;
  height: 20px;
  width: auto;
  left: 10%;
  top: 10%;
`;

const Rarity = styled.div`
  display: flex;
  position: absolute;
  height: 20px;
  width: auto;
  left: 62%;
  top: 10%;
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
  width: 110px;
  position: absolute;
  left: 10%;
  top: 37%;
`;

const Sell = styled.button`
  height: 35px;
  width: 90px;
  border: 1px solid purple;
  position: absolute;
  left: 10%;
  top: 65%;
`;

const XButton = styled.button`
  display: flex;
  height: auto;
  width: auto;
  position: absolute;
  left: 92%;
`;
const PokemonInfo = (props) => {
  return (
    <Info>
      <PokemonName>#{props.selectedPokemon.id}: {props.selectedPokemon.name[0].toUpperCase() + props.selectedPokemon.name.slice(1)}</PokemonName>
      <XButton onClick={props.hide} >X</XButton>
      <Rarity>{props.selectedPokemon.rarity[0].toUpperCase() + props.selectedPokemon.rarity.slice(1)}</Rarity>
      <PokemonSprite src={`/sprites/${props.selectedPokemon.id}.png`} style={{"height": "100px", "width": "100px"}} />
      <SellQuery>Sell {props.selectedPokemon.name[0].toUpperCase() + props.selectedPokemon.name.slice(1)} for {props.selectedPokemon.cost} coins?</SellQuery>
      <Sell onClick={() => {props.sell(props.selectedPokemon)}}>Sell</Sell>
    </Info>
  )
}

export default PokemonInfo;