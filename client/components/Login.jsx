import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const Search = styled.input`
  height: 20px;
  width: 150px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
`;

const UserList = styled.div`
  border: 1px solid black;
  height: auto;
  width: 400px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
  font-size: 15px;
`;

const User = styled.div`
  font-smooth: never;
  margin: 10px;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
  ${({ selected, id }) =>  selected === id && `
    background-color: #f5d3e9;
  `}
`;

const LoginButton = styled.button`
  height: 30px;
  width: 100px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
  margin: 5px;
`;

const SignUpButton = styled.button`
  height: 30px;
  width: 100px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
  margin: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-content: center;
  width: auto;
  align-self: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    }
    this.selectUser = this.selectUser.bind(this);
  }

  selectUser(user) {
    this.setState({
      selected: user
    })
  }

  render() {
    return(
      <LoginContainer>
        <center><StyledHeader>Fishermon</StyledHeader></center>
        <br/>
        <center style={{'fontSmooth': 'never', 'WebkitFontSmoothing': 'none', 'fontFamily': "'Press Start 2P', cursive"}}>Search Fishers: <Search onChange={(e) => this.props.search(e.target.value)}></Search></center>
        <br/>
        <center style={{'fontSmooth': 'never', 'WebkitFontSmoothing': 'none', 'fontFamily': "'Press Start 2P', cursive"}}>Fishers:</center>
        <br/>
        <center>
          <UserList>
            {this.props.users.map((user, index) => <User selected={this.state.selected} id={user.name} key={index} onClick={(e) => {this.selectUser(e.target.id)}}>{user.name}</User>)}
          </UserList>
          <br/>
        </center>
          <ButtonContainer>
            <LoginButton onClick={() => {this.props.login(this.state.selected)}}>Log-In</LoginButton>
            <SignUpButton onClick={this.props.signup}>New Fisher?</SignUpButton>
          </ButtonContainer>
      </LoginContainer>
    )
  }
}

export default Login;