import React from 'react';
import styled from 'styled-components';

const StyledSignUp = styled.div`
  height: 200px;
  width: 500px;
  border: 1px solid black;
  margin: 20px;
`;

const Input = styled.input`
  height: 20px;
  width: 200px;
`;

const Submit = styled.button`
  height: 25px;
  width: 100px;
`;

const SignUp = (props) => {
  return (
    <div>
      <center>
        <StyledSignUp>
          <br/>
          Enter your new fisher name here:
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