import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
  display: flex;
  position: absolute;
  z-index: 10;
  height: 150px;
  width: 280px;
  background: white;
  left: 59.9%;
  top: 12%;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const ItemName = styled.div`
  display: flex;
  position: absolute;
  height: 20px;
  width: auto;
  left: 35%;
  top: 12%;
  font-size: 10px;
`;

const ItemSprite = styled.img`
  display: flex;
  position: absolute;
  left: 57%;
  top: 30%;
`;

const BuyQuery = styled.div`
  display: flex;
  flex-flow: wrap;
  height: auto;
  width: 110px;
  position: absolute;
  left: 10%;
  top: 40%;
  font-size: 8px;
`;

const Buy = styled.button`
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
  left: 0;
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
`;

const StoreItemInfo = (props) => {
  let image;
  if (props.selected.type[0] === 'rod') {
    image = `types/${props.selected.name.split(' ')[0][0].toLowerCase() + props.selected.name.split(' ')[0].slice(1) + props.selected.name.split(' ')[1][0].toLowerCase() + props.selected.name.split(' ')[1].slice(1)}.png`;
  } else {
    image = `types/${props.selected.name.split(' ')[0][0].toLowerCase() + props.selected.name.split(' ')[0].slice(1)}.png`;
  }
  return (
    <Info>
      <XButton onClick={props.hide}>X</XButton>
      <ItemName>{props.selected.name}</ItemName>
      <ItemSprite src={image} style={{"height": "50px", "width": "100px"}}/>
      <BuyQuery>Unlock {props.selected.name} for {props.selected.cost} coins?</BuyQuery>
      <Buy onClick={() => {props.buy(props.selected)}}>Buy</Buy>
    </Info>
  )
}

export default StoreItemInfo;