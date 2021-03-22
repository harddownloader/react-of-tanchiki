import React, {Component} from 'react';

/**
 * самоходка
 */
class SelfPropelledGun extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radius_of_destruction: 30,
      cannon_turning_radius: 0,
      armor_level: 1,
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
            qta: 20,
            in_clip: 20,
          },
          health: 0.5
        }
      ]
    }
  }
  
  render() {
    return(
      <>
        <div className="enemy self-propelled-gun">
          <p>SelfPropelledGun</p>
        </div>
      </>
    )
  }
}

export default SelfPropelledGun
