import React from 'react';
import styled from 'styled-components';

const StyledTile = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  margin: 0;
  justify-content: center;
  background-image: url('floor/floor.png');
  background-size: contain;
  ${({ id, lake }) =>  ((3 <= parseInt(id) && parseInt(id) <= 22) || (27 <= parseInt(id) && parseInt(id) <= 46) || (51 <= parseInt(id) && parseInt(id) <= 70) || (75 <= parseInt(id) && parseInt(id) <= 94) || (99 <= parseInt(id) && parseInt(id) <= 118) || (124 <= parseInt(id) && parseInt(id) <= 141) || (149 <= parseInt(id) && parseInt(id) <= 164) || (174 <= parseInt(id) && parseInt(id) <= 180) || (182 <= parseInt(id) && parseInt(id) <= 187)) && `
    background-image: url('floor/${lake.split(' ')[0]}.png');
  `}
  ${({ id, lake }) =>  (parseInt(id) === 181) && `
    background-image: url('floor/${lake.split(' ')[0]}.png');
    position: relative;
  `}
`;

const Tile = (props) => {
    let player = '';
    let currentStyle = {};
    if (parseInt(props.id) === 205) {
      player = 'sprites/fishermon.png';
      currentStyle = {"height": "50px", "width": "50px"};
    }
    if (parseInt(props.id) === 181 && props.fishing) {
      player = 'sprites/rod.png';
      currentStyle = {"height": "30px", "width": "5px", "position": "absolute", "bottom": "0px"};
    }
  return(
    <StyledTile lake={props.lake} id={props.id}><img src={player} style={currentStyle}></img></StyledTile>
  )
};

export default Tile;