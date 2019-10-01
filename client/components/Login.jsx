import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'pokemon-font', monospace;
`;

const UserList = styled.div`
  border: 1px solid black;
  height: auto;
  width: 400px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'pokemon-font', monospace;
`;

const User = styled.div`
  border: 1px solid blue;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'pokemon-font', monospace;
  ${({ selected, id }) =>  selected === id && `
    background-color: #f5d3e9;
  `}
`;

const LoginButton = styled.button`
  height: 30px;
  width: 100px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'pokemon-font', monospace;
`;

const SignUpButton = styled.button`
  height: 30px;
  width: 100px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'pokemon-font', monospace;
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
      <div>
        <center><StyledHeader>Fishermon</StyledHeader></center>
        <center style={{'font-smooth': 'never', '-webkit-font-smoothing': 'none', 'font-family': "'pokemon-font', monospace"}}>Fishers:</center>
        <br/>
        <center>
          <UserList>
            {this.props.users.map((user, index) => <User selected={this.state.selected} id={user.name} key={index} onClick={(e) => {this.selectUser(e.target.id)}}>{user.name}</User>)}
          </UserList>
          <br/>
          <LoginButton onClick={() => {this.props.login(this.state.selected)}}>Log-In</LoginButton>
          <SignUpButton onClick={this.props.signup}>New Fisher?</SignUpButton>
        </center>
      </div>
    )
  }
}

export default Login;