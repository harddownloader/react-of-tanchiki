import React, { Component } from 'react'
import { EnemyLogic } from './EnemyLogic'
import { initEnemy } from "@/core/api/enemy"

/**
 * самоходка
 */
export class SelfPropelledGun extends Component {
	constructor(props) {
		super(props)
		this.state = {
			enemyId: props.enemy.id,
			// radius_of_destruction: 30, // было задуманно
			radius_of_destruction: 5, // поставил для теста
			cannon_turning_radius: 0,
			armor_level: 1,
			coordinates: {
				x: props.enemy.x,
				y: props.enemy.y,
			},
			move: {
				move_status: true,
				speed: 'min',
			},
			weapon: [
				{
					name: 'gun',
					shells: {
						qta: 20,
						in_clip: 20,
					},
					health: 0.5,
				},
			],
			initEnemy: {}
		}

		this.EnemyLogic = new EnemyLogic({
			enemyId: this.state.enemyId,
			enemyX: props.enemy.x,
			enemyY: props.enemy.y,
			ourTankX: props.ourTank.x,
			ourTankY: props.ourTank.y,
			updateEnemyXY: props.updateEnemyXY,
			radius_of_destruction: this.state.radius_of_destruction,
			addEnemyBullet: props.addEnemyBullet,
		})
	}

	async initializationEnemy() {
		console.log('initializationEnemy')
		const enemyInitData = await initEnemy()
		// this.setState({initEnemy: enemyInitData})
		console.log('initializationEnemy', enemyInitData)
		return enemyInitData
	}

  componentDidMount() {
    console.log('componentDidMount')
    this.initializationEnemy()
  }

	render() {
		return (
			<>
				<div className='enemy self-propelled-gun'>
					<p>SelfPropelledGun</p>
				</div>
			</>
		)
	}
}
