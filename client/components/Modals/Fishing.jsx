import React from 'react';
import styled from 'styled-components';

const FishingModal = styled.div`
  display: inline-block;
  width: 100%;
  height: 233px;
  z-index: 5;
  border: 1px solid black;
  position: absolute;
  top: 75%;
  left: 0;
  text-align: center;
  background: white;
`;

const FishingCommand = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  text-align: center;
  vertical-align: middle;
  line-height: 150px;
  font-size: 100px;
  font-smooth: never;
  -webkit-font-smoothing: none;
  font-family: 'pokemon-font', monospace;
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
      fail: false,
      pokemon: null,
    };
    this.targetKey = '';
    this.startFishing = this.startFishing.bind(this);
    this.displayFail = this.displayFail.bind(this);
    this.retry = this.retry.bind(this);
  }

  componentDidMount() {
    this.setState({
      pokemon: this.props.nextPokemon,
    })
    this.startFishing();
  }

  startFishing() {
    const reels = Math.floor(Math.random() * 5) + 1;
    let reelCounter = 0;
    let readyCounter = 1;
    const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v','w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    // const keys = ['a']
    this.targetKey = keys[Math.floor(Math.random() * keys.length)];
    let clicked = false;
    const handleReel = () => {
      clicked = false;
      const handleKeyboard = (e) => {
        clicked = true;
        if (e.key === this.targetKey) {
          if (reelCounter < reels) {
            this.targetKey = keys[Math.floor(Math.random() * keys.length)];
            readyCounter = 1;
            window.removeEventListener('keydown', handleKeyboard);
            ready();
          } else {
            window.removeEventListener('keydown', handleKeyboard);
            this.props.fishingOff();
            this.props.success(this.state.pokemon);
            return;
          }
        } else {
          window.removeEventListener('keydown', handleKeyboard);
          reelCounter = reels;
          this.displayFail();
          return;
        }
      }
      window.addEventListener('keydown', handleKeyboard);
      const timeUp = () => {
        if (!clicked) {
          window.removeEventListener('keydown', handleKeyboard);
          reelCounter = reels;
          this.displayFail();
        }
      }
      setTimeout(timeUp, 700);
    }
    const ready = () => {
      if (readyCounter === 1) {
        this.setState({
          one: true,
          two: false,
          three: false,
          four: false
        })
        readyCounter++;
        setTimeout(ready, 800)
      } else if (readyCounter === 2) {
        this.setState({
          two: true
        })
        readyCounter++;
        setTimeout(ready, 800)
      } else if (readyCounter === 3) {
        this.setState({
          three: true
        })
        readyCounter++;
        setTimeout(ready, 800)
      } else if (readyCounter === 4) {
        this.setState({
          one: false,
          two: false,
          three: false,
          four: true,
        })
        reelCounter++;
        handleReel();
        return;
      }
    }
    ready();
  }

  retry() {
    this.setState({
      one: true,
      two: false,
      three: false,
      four: false,
      fail: false,
    }, this.startFishing)
  }

  displayFail() {
    this.setState({
      one: false,
      two: false,
      three: false,
      four: false,
      fail: true
    })
  }

  render() {
    return (
      <FishingModal>
        {this.state.one && <FishingCommand>.</FishingCommand>}
        {this.state.two && <FishingCommand>.</FishingCommand>}
        {this.state.three && <FishingCommand>.</FishingCommand>}
        {this.state.four && <FishingCommand>{this.targetKey}</FishingCommand>}
        {this.state.fail && <Fail>Aww.. It got away.</Fail>}
        {this.state.fail && <StartFishing onClick={this.retry}>Try Again?</StartFishing>}
        {this.state.fail && <ExitFishing onClick={this.props.fishingOff}>Stop Fishing</ExitFishing>}
      </FishingModal>
    )
  }
}

export default Fishing;