import React, {Component} from 'react';

/**
 * вражеский танк
 */
class EnemyTank extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radius_of_destruction: 50,
      cannon_turning_radius: 360,
      armor_level: 2,
      coordinates: {
        x: null,
        y: null
      },
      move: {
        move_status: true,
        speed: 'min'
      },
      weapon: [
        {
          name: 'gun',
          shells: {
            qta: 40,
            in_clip: 40,
          },
          health: 1
        },
        {
          name: 'machine_gun',
          shells: {
            qta: 200,
            in_clip: 200,
          },
          health: 0.5
        }
      ]
    }
  }
  
  render() {
    return(
      <>
        <div className="enemy tank">
          <p>EnemyTank</p>
        </div>
      </>
    )
  }
}

export default EnemyTank