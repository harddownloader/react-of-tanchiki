import React, {Component} from 'react'
import ourTank from '../../assets/images/yourTank.png'
import styled from 'styled-components'

const OurTankImg = styled.img`
  width: 100%;

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
`

class OurTank extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radius_of_destruction: 70,
      cannon_turning_radius: 360,
      armor_level: 4,
      // координаты
      coordinates: {
        x: null,
        y: null
      },
      // направление
      direction: props.direction,
      // движение
      move: {
        move_status: true,
        speed: 'max'
      },
      // пушки у танка
      weapon: [
        {
          name: 'gun',
          shells: {
            qta: 40,
            in_clip: 40,
          },
          health: 2
        },
        {
          name: 'machine_gun',
          shells: {
            qta: 200,
            in_clip: 200,
          },
          health: 1
        }
      ],
      // список выпущенных снарядов
      bullets: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.direction !== prevProps.direction) {
      console.log('ourtank update direction')
      this.setState({direction: this.props.direction})
    }
  }
  
  render() {
    return(
      <>
        <div className="out-tank">
          {/* <p>OurTank</p> */}
          <OurTankImg
            src={ourTank}
            alt=""
            className={`direction-${this.state.direction}`}
          />
        </div>
      </>
    )
  }
}

export default OurTank