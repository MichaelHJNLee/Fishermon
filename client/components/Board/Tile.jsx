import React from 'react';
import styled from 'styled-components';

const StyledTile = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  background: #e4e6c5;
  margin: 0;
  ${({ id }) =>  ((3 <= parseInt(id) && parseInt(id) <= 22) || (27 <= parseInt(id) && parseInt(id) <= 46) || (51 <= parseInt(id) && parseInt(id) <= 70) || (75 <= parseInt(id) && parseInt(id) <= 94) || (99 <= parseInt(id) && parseInt(id) <= 118) || (124 <= parseInt(id) && parseInt(id) <= 141) || (149 <= parseInt(id) && parseInt(id) <= 164) || (174 <= parseInt(id) && parseInt(id) <= 187)) && `
    background: blue;
  `}
`;

const Tile = (props) => {
    let player = '';
    let currentStyle = {};
    if (parseInt(props.id) === 205) {
      player = 'sprites/fishermon.png';
      currentStyle = {"height": "50px", "width": "50px"};
    }
    return(
      <StyledTile id={props.id}><img src={player} style={currentStyle}></img></StyledTile>
    )
};

export default Tile;