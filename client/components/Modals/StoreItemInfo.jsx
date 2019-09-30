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
  left: 60%;
  top: 12%;
`;

const ItemName = styled.div`
  display: flex;
  position: absolute;
  height: 20px;
  width: auto;
  left: 37%;
  top: 12%;
`;

const Rarity = styled.div`
  display: flex;
  position: absolute;
  height: 20px;
  width: auto;
  left: 62%;
  top: 10%;
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
  top: 30%;
`;

const Buy = styled.button`
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
  left: 0;
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
      <BuyQuery>Buy {props.selected.name} for {props.selected.cost} coins?</BuyQuery>
      <Buy onClick={() => {props.buy(props.selected)}}>Buy</Buy>
    </Info>
  )
}

export default StoreItemInfo;