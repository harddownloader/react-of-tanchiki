import React, { Component } from "react";
import styled from "styled-components";
import ourTank from "../../assets/images/yourTank.png";
// import {initPlayer} from '@/core/api/player'
import { domain } from "@/configs/config";
import { initPlayer } from "@/core/api/player";

class OurTank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius_of_destruction: 70,
      cannon_turning_radius: 360,
      armor_level: 4,
      // координаты
      coordinates: {
        x: null,
        y: null,
      },
      // направление
      // direction: props.direction,
      direction: "right",
      // движение
      move: {
        move_status: true,
        speed: "max",
      },
      // пушки у танка
      weapon: [
        {
          name: "gun",
          shells: {
            qta: 40,
            in_clip: 40,
          },
          health: 2,
        },
        {
          name: "machine_gun",
          shells: {
            qta: 200,
            in_clip: 200,
          },
          health: 1,
        },
      ],
      // список выпущенных снарядов
      bullets: [],

      playerData: {},
    };

    this.ourTankRef = React.createRef();
  }

  initializationPlayer() {
    const initPlayerData = initPlayer();
    console.log("initPlayerData", initPlayerData);
    this.setState({ playerData: initPlayerData });
  }

  componentDidMount() {
    this.initializationPlayer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.direction !== prevProps.direction) {
      console.log("ourtank update direction");
      this.setState({ direction: this.props.direction });
    }
  }

  render() {
    const { coordinates } = this.state;
    // console.log('initPlayer', this.state.initPlayer.then(newData => newData))

    // console.log('this.ourTankRef', {
    //   ourTankRef: this.ourTankRef,
    //   // offsetLeft: this.ourTankRef.current.offsetLeft,
    //   // offsetTop: this.ourTankRef.current.offsetTop
    // });
    
    const OurTankImg = styled.img`
      width: 100%;
      // transform: translate3d(${coordinates.x}, 0px, 0px);
    
      &.direction-up {
        transform: rotate(0deg);
      }
      &.direction-down {
        transform: rotate(180deg);
      }
      &.direction-left {
        transform: rotate(-90deg);
      }
      &.direction-right {
        transform: rotate(90deg);
      }
    `;

    return (
      <>
        <div className="our-tank" ref={this.ourTankRef}>
          {/* <p>OurTank</p> */}
          <OurTankImg
            src={ourTank}
            alt="tank"
            className={`direction-${this.state.direction}`}
          />
        </div>
      </>
    );
  }
}

export default OurTank;
