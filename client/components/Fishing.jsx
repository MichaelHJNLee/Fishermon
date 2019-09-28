import React from 'react';
import styled from 'styled-components';

const FishingModal = styled.div`
  display: inline-block;
  width: 100%;
  height: 233px;
  z-index: 5;
  border: 1px solid black;
  position: absolute;
  top: 71%;
  left: 0;
  text-align: center;
`;

const FishingCommand = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  border: 1px solid blue;
  text-align: center;
  vertical-align: middle;
  line-height: 150px;
  font-size: 100px;
`;

const Fail = styled.div`
  display: inline-block;
  width: 1000px;
  height: 200px;
  border: 1px solid blue;
  text-align: center;
  vertical-align: middle;
  line-height: 150px;
  font-size: 50px;
`;

const StartFishing = styled.div`
  position: absolute;
  width: 100px;
  height: 50px;
  border: 1px solid green;
  top: 0%;
  left: 90%;
`;

const ExitFishing = styled.div`
  position: absolute;
  width: 100px;
  height: 50px;
  border: 1px solid red;
  top: 50%;
  left: 90%;
`;

class Fishing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: false,
      two: false,
      three: false,
      four: false,
      keyboard: '',
      fail: false,
      retry: false,
    };
    this.startFishing = this.startFishing.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.displayFail = this.displayFail.bind(this);
    this.retry = this.retry.bind(this);
  }

  componentDidMount() {
    const keys = ['d', 's', 'a', 'f', 'g']
    let key = keys[Math.floor(Math.random() * 5)];
    this.setState({
      keyboard: key
    })
    this.startFishing();
  }

  startFishing() {
    let counter = 1;
    const recurse = () => {
      if (counter === 1) {
        this.setState({
          one: true,
          two: false,
          three: false,
          four: false
        })
        setTimeout(recurse, 1000)
      } else if (counter === 2) {
        this.setState({
          two: true
        })
        setTimeout(recurse, 1000)
      } else if (counter === 3) {
        this.setState({
          three: true
        })
        setTimeout(recurse, 1000)
      } else if (counter === 4) {
        window.addEventListener('keydown', this.handleKeyboard);
        this.setState({
          one: false,
          two: false,
          three: false,
          four: true,
        })
        setTimeout(this.displayFail, 1500);
      }
      counter++;
    }
    recurse();
  }

  retry() {
    this.setState({
      retry: true
    })
  }

  reeledOnTime() {

  }

  displayFail() {
    this.setState({
      four: false,
      fail: true
    })
  }

  handleKeyboard(e) {
    if (e === this.state.keyboard) {
      return true;
    } else {
      this.displayFail();
    }
  }

  render() {
    return (
      <FishingModal>
        {this.state.one && <FishingCommand>.</FishingCommand>}
        {this.state.two && <FishingCommand>.</FishingCommand>}
        {this.state.three && <FishingCommand>.</FishingCommand>}
        {this.state.four && <FishingCommand>{this.state.keyboard}</FishingCommand>}
        {this.state.fail && <Fail>Aww.. It got away.</Fail>}
        {this.state.fail && <StartFishing onClick={this.retry}>Try Again?</StartFishing>}
        {this.state.fail && <ExitFishing onClick={this.props.fishingOff}>Stop Fishing</ExitFishing>}
      </FishingModal>
    )
  }
}

export default Fishing;