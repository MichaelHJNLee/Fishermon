import React from 'react';
import styled from 'styled-components';

const StyledHelp = styled.div`
  position: absolute;
  height: 300px;
  width: 550px;
  top: 12%;
  left: 32%;
  border: 1px solid green;
  background: white;
  z-index: 10;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const Welcome = styled.div`
  height: 100px;
  width: auto;
  text-align: center;
  font-size: 20px;
  margin: 0;
  position: absolute;
  left: 8%;
`;

const Exit = styled.div`
  height: 80px;
  width: 80px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Body = styled.div`
  position: absolute;
  margin: 5px;
  height: 70px;
  width: 530px;
  left: 5px;
  top: 20%;
  font-size: 15px;
`;

const Help = (props) => (
  <StyledHelp>
    <Exit onClick={props.help}>X</Exit>
    <center><Welcome>Welcome to Fishermon!</Welcome></center>
    <Body>Fishermon is a game where you can fish for different Pokemon! Press the 'Fish!' button to fish for a Pokemon. Click the indicated key to reel it in. When you catch a Pokemon, it will go into your bucket. You can sell your Pokemon to earn coins. Use your coins to buy better rods or new lakes. Better rods will pull better Pokemon and different lakes will hold different Pokemon. If you're lucky you might even find a shiny!</Body>
  </StyledHelp>
);

export default Help;