import React, { Component } from 'react'
import TimersInstanceWrap from '@/core/timers'
import EnemyBulletsTimerWrap from '@/core/timers/enemyBullets'
import OurTankBulletsLogicWrap from '@/core/bullets/ourTank'
import EnemyBulletsLogicWrap from '@/core/bullets/enemy'
import GenerateMapWrap from '@/core/generators/GenerateMap'
import GenerateRandomWrap from '@/core/generators/GenerateRandom'
import GeneratorEnemyWrap from '@/core/generators/GeneratorEnemy'

type myProps = {
	newBulletCount: any
}

class Map1 extends Component<myProps, {}> {
	constructor(props) {
		super(props)

		this.state = {
			// map
			mapItems: [],
			heightMap: 13,
			wightMap: 13,

			// our tank x,y
			ourTank: {
				y: 12,
				x: 6,
			},
			// our tank direction
			direction: {
				directionCurrent: null,
				dicrectionRightStatus: null,
				dicrectionLeftStatus: null,
				dicrectionDownStatus: null,
				dicrectionUpStatus: null,
			},

			// our bullets
			ourBullets: [],

			// game timer
			timer: 0,

			// enemies list
			enemies: [],

			// enemies bullets list
			enemiesBulletsList: [],
		}

		this.TimersInstance = TimersInstanceWrap.call(this)
		this.EnemyBulletsTimer = new EnemyBulletsTimerWrap({ _this: this })
		this.OurTankBulletsLogic = new OurTankBulletsLogicWrap({ _this: this })
		this.EnemyBulletsLogic = new EnemyBulletsLogicWrap({ _this: this })
		this.GenerateMap = new GenerateMapWrap({ _this: this })
		this.GenerateRandom = new GenerateRandomWrap({ _this: this })
		this.GeneratorEnemy = new GeneratorEnemyWrap({ _this: this })
	}

	componentDidMount() {
		this.GenerateMap.generateMap()

		// console.log(
		// 	'map1 store dispatch',
		// 	this.props.store.dispatch({
		// 		type: 'INCREMENT',
		// 		data: {
		// 			ourTank: {
		// 				y: this.state.ourTank.y,
		// 				x: this.state.ourTank.x,
		// 			},
		// 		},
		// 	}),
		// )

		// start timer
		this.TimersInstance.startTimer()
		this.EnemyBulletsTimer.startTimer()
	}

	componentDidUpdate(prevProps, prevState) {
		// обновился список патронов
		// console.log('this.props.newBulletCount', this.props.newBulletCount)
		if (this.props.newBulletCount !== prevProps.newBulletCount) {
			// console.log('Update newBulletCount')
			this.OurTankBulletsLogic.addOurTankBullet()

			this.GenerateMap.generateMap()
		}

		// console.log('this.state.timer', this.state.timer)
		if (this.state.timer !== prevState.timer) {
			this.GenerateMap.generateMap()
		}

		// console.log('this.props.direction.dicrectionRightStatus', this.props.direction.dicrectionRightStatus)
		// console.log('prevProps.direction.dicrectionRightStatus', this.state.direction.dicrectionRightStatus)
		// console.log('===========')
		if (
			this.props.direction.dicrectionRightStatus !==
				this.state.direction.dicrectionRightStatus ||
			this.props.direction.dicrectionLeftStatus !==
				this.state.direction.dicrectionLeftStatus ||
			this.props.direction.dicrectionUpStatus !==
				this.state.direction.dicrectionUpStatus ||
			this.props.direction.dicrectionDownStatus !==
				this.state.direction.dicrectionDownStatus
		) {
			// console.log('update direction')

			if (
				this.props.direction.dicrectionRightStatus !==
					this.state.direction.dicrectionRightStatus &&
				this.props.direction.dicrectionRightStatus === 'stop'
			) {
				this.TimersInstance.stopTimerRunTank()
			} else if (
				this.props.direction.dicrectionLeftStatus !==
					this.state.direction.dicrectionLeftStatus &&
				this.props.direction.dicrectionLeftStatus === 'stop'
			) {
				this.TimersInstance.stopTimerRunTank()
			} else if (
				this.props.direction.dicrectionUpStatus !==
					this.state.direction.dicrectionUpStatus &&
				this.props.direction.dicrectionUpStatus === 'stop'
			) {
				// console.log('- dicrectionUpStatus stop')
				this.TimersInstance.stopTimerRunTank()
			} else if (
				this.props.direction.dicrectionDownStatus !==
					this.state.direction.dicrectionDownStatus &&
				this.props.direction.dicrectionDownStatus === 'stop'
			) {
				this.TimersInstance.stopTimerRunTank()
			}

			const newDirection = { ...this.props.direction }
			this.setState({ direction: newDirection }, () => {
				// console.log('after update direction')
				this.TimersInstance.timerRunTank()
			})
			this.GenerateMap.generateMap()
		}
	}

	checkOurTankOnOutSideMap(NewTankXY) {
		const needTankXY = NewTankXY
		if (NewTankXY.x < 0) {
			needTankXY.x = 0
		}
		if (NewTankXY.y < 0) {
			needTankXY.y = 0
		}
		if (NewTankXY.x > this.state.heightMap - 1) {
			needTankXY.x = this.state.heightMap - 1
		}
		if (NewTankXY.y > this.state.wightMap - 1) {
			needTankXY.y = this.state.wightMap - 1
		}
		// console.log('needTankXY', needTankXY)
		return needTankXY
	}

	render() {
		return (
			<>
				<div className='map map1'>
					<div className='grids-container'>{this.state.mapItems}</div>
				</div>
			</>
		)
	}
}

export default Map1
