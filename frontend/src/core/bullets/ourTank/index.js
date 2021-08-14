// import React from 'react';
// import BulletsLogic from '@/core/bullets/BulletsLogic'
import GenerateRandomWrap from '@/core/generators/GenerateRandom'

export default class OurTankBulletsLogic{
  constructor(props) {
    // super(props);
    this.contextThis = props._this
    this.GenerateRandom = new GenerateRandomWrap()
  }

	addOurTankBullet() {
    console.log('addOurTankBullet', this)
		const ourBulletsTmp = this.contextThis.state.ourBullets
		const randomId = this.GenerateRandom.generateRandomString(10)

		ourBulletsTmp.push({
			id: randomId,
			direction: this.contextThis.props.direction.directionCurrent,
			// started X,Y
			y: this.contextThis.state.ourTank.y,
			x: this.contextThis.state.ourTank.x,
		})
		this.contextThis.setState({ ourBullets: ourBulletsTmp })
	}
}
