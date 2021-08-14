// import React from 'react';
// import BulletsLogic from '@/core/bullets/BulletsLogic'

export default class EnemyBulletsLogic{
  constructor(props) {
    // super(props);
    console.log('EnemyBulletsLogic', props)
    this.contextThis = props._this
  }

  // enemy bullets
  addEnemyBullet(bullet) {
    console.log('addEnemyBullet', this)
    const { enemiesBulletsList } = this.state
    enemiesBulletsList.push(bullet)
    this.setState({ enemiesBulletsList })
  }

}
