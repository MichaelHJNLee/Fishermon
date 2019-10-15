import React from 'react';
import styled from 'styled-components';

const StyledSignUp = styled.div`
  height: 200px;
  width: 500px;
  margin: 20px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const Input = styled.input`
  height: 20px;
  width: 200px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const Submit = styled.button`
  height: 25px;
  width: 100px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const SignUp = (props) => {
  return (
    <div>
      <center>
        <StyledSignUp>
          <br/>
          Enter your new fisher name here:
          <br/>
          <br/>
          <Input id="new-fisher-input"></Input>
          <br/>
          <br/>
          <Submit onClick={() => {props.submit(document.getElementById("new-fisher-input").value)}}>Submit</Submit>
        </StyledSignUp>
      </center>
    </div>
  )
}

export default SignUp;