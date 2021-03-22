import React, {Component} from 'react';

/**
 * арта
 */
class Artillery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radius_of_destruction: 50,
      cannon_turning_radius: 360,
      armor_level: 1,
      coordinates: {
        x: null,
        y: null
      },
      move: {
        move_status: false,
        speed: null
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
        <div className="enemy arta">
          <p>Artillery</p>
        </div>
      </>
    )
  }
}

export default Artillery