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
`;

const Bucket = styled.button`
  display: flex;
  height: 70px;
  width: 120px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 5%;
`;

const Rods = styled.select`
  display: flex;
  height: 70px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 15%;
`;

const Lakes = styled.select`
  display: flex;
  height: 70px;
  width: 100px;
  border: 1px solid black;
  position: absolute;
  top: 0.6%;
  left: 24%;
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
  left: 75%;
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

class InfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return(
      <StyledInfo>
        <Bucket>Bucket</Bucket>
        <Rods>Rods
          {this.props.rods.map((rod, index) => <option key={index}>{rod}</option>)}
        </Rods>
        <Lakes>Lakes
          {this.props.lakes.map((lake, index) => <option key={index}>{lake}</option>)}
        </Lakes>
        <Fishermon onClick={this.props.fishingOn} >Fish!</Fishermon>
        <Money />
        <Store>Store</Store>
      </StyledInfo>
    )
  }
}

export default InfoBox;