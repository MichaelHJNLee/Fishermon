import React from 'react';
import styled from 'styled-components';

const StyledBucket = styled.div`
  display: flex;
  position: absolute;
  z-indez: 5;
  height: auto;
  width: 280px;
  background: white;
  border: 1px solid orange;
  left: 15%;
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
      {props.bucket.map((item, index) => <BucketItem key={index}><img src={`/sprites/${item.id}.png`} style={{"height": "100%", "width": "100%"}} /></BucketItem>)}
    </StyledBucket>
  )
}

export default Bucket;