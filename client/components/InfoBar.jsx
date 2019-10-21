import React from 'react';
import styled from 'styled-components';

const StyledInfo = styled.div`
  display: flex;
  height: 80px;
  width: auto;
  flex-flow: row;
  align-self: center;
  box-sizing: border-box;
  border: 1px solid black;
  margin: 0;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const CurrentPlayer = styled.div`
  display: inline-block;
  height: 25px;
  width: auto;
  position: absolute;
  top: 1.75%;
  left: 3%;
  text-align: center;
  vertical-align: middle;
  line-height: 25px;
  font-size: 10px;
  border-radius: 5px;
`;

const LogOut = styled.div`
  display: inline-block;;
  height: 25px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 6.5%;
  left: 3%;
  text-align: center;
  vertical-align: middle;
  line-height: 25px;
  font-size: 10px;
  border-radius: 5px;
`;

const Bucket = styled.button`
  display: inline-block;
  height: 70px;
  width: 120px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 20%;
  text-align: center;
  vertical-align: middle;
  line-height: 25px;
  font-size: 15px;
  font-family: 'Press Start 2P', cursive;
  border-radius: 5px;
`;

const RegionsContainer = styled.div`
  display: inline-block;
  height: 70px;
  width: 180px;
  position: absolute;
  top: 0;
  left: 30%;
  text-align: center;
  vertical-align: middle;
  line-height: 25px;
  font-size: 9px;
  font-family: 'Press Start 2P', cursive;
`;

const Regions = styled.div`
  display: flex;
  height: 45px;
  font-size: 7px;
  font-family: 'Press Start 2P', cursive;
  flex-flow: row wrap;
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
`;

const Fishermon = styled.button`
  display: inline-block;
  height: 70px;
  width: 170px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 44%;
  text-align: center;
  vertical-align: middle;
  line-height: 70px;
  border-radius: 5px;
  font-size: 20px;
  font-family: 'Press Start 2P', cursive;
`;

const Rods = styled.select`
  display: inline-block;
  height: 70px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 60%;
  text-align: center;
  vertical-align: middle;
  line-height: 25px;
  font-size: 10px;
  font-family: 'Press Start 2P', cursive;
`;

const Lakes = styled.select`
  display: inline-block;
  height: 70px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 68%;
  text-align: center;
  vertical-align: middle;
  line-height: 25px;
  font-size: 8px;
  font-family: 'Press Start 2P', cursive;
`;

const Money = styled.div`
  display: inline-block;
  height: 50px;
  width: auto;
  border: 1px solid black;
  position: absolute;
  top: 1.75%;
  left: 78%;
  text-align: center;
  vertical-align: middle;
  line-height: 50px;
  border-radius: 5px;
  font-size: 10px;
`;
const Store = styled.button`
  display: inline-block;
  height: 70px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 87%;
  text-align: center;
  vertical-align: middle;
  line-height: 25px;
  font-size: 15px;
  border-radius: 5px;
  font-family: 'Press Start 2P', cursive;
`;

const Help = styled.button`
  display: inline-block;
  height: 50px;
  width: 50px;
  border: 1px solid black;
  position: absolute;
  top: 2%;
  left: 95%;
  border-radius: 30px;
  text-align: center;
  vertical-align: middle;
  line-height: 50px;
  font-family: 'Press Start 2P', cursive;
`;

class InfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    let gens = [];
    for (let i = 1; i < this.props.gens.length; i++) {
      gens.push(this.props.gens[i]);
    }
    gens.sort();
    for (let j = 0; j < gens.length; j++) {
      if (gens[j] === '2') {
        gens[j] = 'Johto';
      } else if (gens[j] === '3') {
        gens[j] = "Hoenn";
      } else if (gens[j] === '4') {
        gens[j] = "Sinnoh";
      } else if (gens[j] === '5') {
        gens[j] = "Unova";
      } else if (gens[j] === '6') {
        gens[j] = "Kalos";
      } else if (gens[j] === '7') {
        gens[j] = "Alola";
      }
    }
    return(
      <StyledInfo>
        <CurrentPlayer>{this.props.player}</CurrentPlayer>
        <LogOut onClick={this.props.logout}>Log Out</LogOut>
        <Bucket onClick={this.props.displayBucket}>Bucket</Bucket>
        <RegionsContainer>
          Unlocked Regions
          <Regions>Kanto{gens.map((gen) => {return ` ${gen}`})}</Regions>
        </RegionsContainer>
        <Rods onChange={(e) => {this.props.changeRod(e.target.value)}}>Rods
          {this.props.rods.map((rod, index) => <option key={index}>{rod}</option>)}
        </Rods>
        <Lakes onChange={(e) => {this.props.changeLake(e.target.value)}}>Lakes
          {this.props.lakes.map((lake, index) => <option key={index}>{lake}</option>)}
        </Lakes>
        <Fishermon onClick={this.props.fishingOn} >Fish!</Fishermon>
        <Money>{JSON.stringify(this.props.money)} coins</Money>
        <Store onClick={this.props.displayStore} >Store</Store>
        <Help onClick={this.props.help}>?</Help>
      </StyledInfo>
    )
  }
}

export default InfoBox;