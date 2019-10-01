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
  font-family: 'pokemon-font', monospace;
`;

const CurrentPlayer = styled.div`
  display: flex;
  height: 25px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 1.75%;
  left: 3%;
`;

const LogOut = styled.div`
  display: flex;
  height: 25px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 6.5%;
  left: 3%;
`;

const Bucket = styled.button`
  display: flex;
  height: 70px;
  width: 120px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 20%;
`;

const Rods = styled.select`
  display: flex;
  height: 70px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 60%;
`;

const Lakes = styled.select`
  display: flex;
  height: 70px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 68%;
`;

const Fishermon = styled.button`
  display: flex;
  height: 70px;
  width: 170px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 44%;
`;

const Money = styled.div`
  display: flex;
  height: 50px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 1.75%;
  left: 79%;
`;
const Store = styled.button`
  display: flex;
  height: 70px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 87%;
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
`;

class InfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return(
      <StyledInfo>
        <CurrentPlayer>{this.props.player}</CurrentPlayer>
        <LogOut onClick={this.props.logout}>Log Out</LogOut>
        <Bucket onClick={this.props.displayBucket}>Bucket</Bucket>
        <Rods onChange={(e) => {this.props.changeRod(e.target.value)}}>Rods
          {this.props.rods.map((rod, index) => <option key={index}>{rod}</option>)}
        </Rods>
        <Lakes onChange={(e) => {this.props.changeLake(e.target.value)}}>Lakes
          {this.props.lakes.map((lake, index) => <option key={index}>{lake}</option>)}
        </Lakes>
        <Fishermon onClick={this.props.fishingOn} >Fish!</Fishermon>
        <Money>{JSON.stringify(this.props.money)}</Money>
        <Store onClick={this.props.displayStore} >Store</Store>
        <Help onClick={this.props.help}>?</Help>
      </StyledInfo>
    )
  }
}

export default InfoBox;