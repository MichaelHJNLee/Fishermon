import React from 'react';
import styled from 'styled-components';

const StyledStore = styled.div`
  display: flex;
  position: absolute;
  z-index: 10;
  height: auto;
  width: 210px;
  background: white;
  left: 79.5%;
  flex-flow: row wrap;
`;

const StoreItem = styled.div`
  height: auto;
  width: 70px;
  margin: 0;
`;

const Store = (props) => {
  return (
    <StyledStore>
      {props.store.map((item, index) => {
        if (item.type[0] === 'rod') {
          if (item.name === 'Good Rod') {
            return (<StoreItem value={item.name} key={index} onClick={() => {props.display(item)}}><img src={`types/goodrod.png`} style={{"height": "100%", "width": "100%"}} /></StoreItem>)
          } else if (item.name === 'Super Rod') {
            return (<StoreItem value={item.name} key={index} onClick={() => {props.display(item)}}><img src={`types/superrod.png`} style={{"height": "100%", "width": "100%"}} /></StoreItem>)
          } else {
            return (<StoreItem value={item.name} key={index} onClick={() => {props.display(item)}}><img src={`types/ultrarod.png`} style={{"height": "100%", "width": "100%"}} /></StoreItem>)
          }
        } else {
          return (<StoreItem value={item.name} key={index} onClick={() => {props.display(item)}}><img src={`types/${item.name.split(' ')[0][0].toLowerCase() + item.name.split(' ')[0].slice(1)}.png`} style={{"height": "100%", "width": "100%"}} /></StoreItem>)
        }
      })}
    </StyledStore>
  )
}

export default Store;