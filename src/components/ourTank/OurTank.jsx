import React, {Component} from 'react';

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
  
  render() {
    return(
      <>
        <div className="out-tank">
          <p>OurTank</p>
        </div>
      </>
    )
  }
}

export default OurTank