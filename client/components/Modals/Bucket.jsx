import React from 'react';
import styled from 'styled-components';


const StyledBucket = styled.div`
  display: flex;
  position: absolute;
  z-indez: 10;
  height: auto;
  width: 280px;
  background: white;
  left: 15%;
  top: 10.5%;
  flex-flow: row wrap;
`;

const BucketItem = styled.div`
  height: 70px;
  width: 70px;
  margin: 0;
`;

const Bucket = (props) => {
  return(
    <StyledBucket>
      {props.bucket.map((item, index) => {
        let color = 'sprites';
        let id = item;
        let shiny = 0;
        if (id >= 1000) {
          color = 'shiny';
          id = id / 1000;
          shiny = 1;
        }
        return (<BucketItem key={index}><img id={shiny} src={`/${color}/${id}.png`} style={{"height": "100%", "width": "100%"}} onClick={(e) => {props.displayPokemonInfo(e)}} /></BucketItem>)
      })}
    </StyledBucket>
  )
}

export default Bucket;