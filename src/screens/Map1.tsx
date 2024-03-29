/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import TimersInstanceWrap from '@/core/timers'
import EnemyBulletsTimerWrap from '@/core/timers/enemyBullets'
import OurTankBulletsLogicWrap from '@/core/bullets/ourTank'
import EnemyBulletsLogicWrap from '@/core/bullets/enemy'
// import GenerateMapWrap from '@/core/generators/GenerateMap'
import GenerateRandomWrap from '@/core/generators/GenerateRandom'
import GeneratorEnemyWrap from '@/core/generators/GeneratorEnemy'
import OurTank from "@/components/ourTank/OurTank";
import Bullet from "@/components/Bullets/ourTank";
import { initMap } from '@/core/api/map'
// import { v4 as uuidv4 } from 'uuid';


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
		// this.GenerateMap = new GenerateMapWrap({ _this: this })
		this.GenerateRandom = new GenerateRandomWrap({ _this: this })
		this.GeneratorEnemy = new GeneratorEnemyWrap({ _this: this })
		this.initializationMap = this.initializationMap.bind(this)
		this.createMap = this.createMap.bind(this)
	}

	componentDidMount() {
		this.initializationMap()

		// start timer
		this.TimersInstance.startTimer()
		this.EnemyBulletsTimer.startTimer()
	}

	componentDidUpdate(prevProps, prevState) {
		// обновился список патронов
		// console.log('this.props.newBulletCount', this.props.newBulletCount)
		if (this.props.newBulletCount !== prevProps.newBulletCount) {
			console.log('Update newBulletCount')
			this.OurTankBulletsLogic.addOurTankBullet()

			// this.GenerateMap.generateMap()
		}

		// console.log('this.state.timer', this.state.timer)
		if (this.state.timer !== prevState.timer) {
			// this.GenerateMap.generateMap()
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
			// this.GenerateMap.generateMap()
		}
	}

	async initializationMap() {
		const mapInitData = await initMap()
		await this.createMap(mapInitData.map)
		return mapInitData
	}

	createMap(data) {
		const map = data.encodedMap
		const mapItems = map.split(';')

		mapItems.forEach((item) => {
			const [x, y] = item.split('/')
			console.log({
				x, y
			})
		})
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
		let gridItems = []
		let x = 0
		let y = 0

		for (let i=0; i<169; i++) {
			if (x >= 13) {
				y = y + 1
				x = 0
			}

			gridItems.push(
				<div
					className={`grid-item`}
					id={`x-${x} y-${y}`}
					key={i}
				></div>
			)
			x++
		}

		return (
			<>
				<div className='map map1'>
					<div className='grids-container'>
						{gridItems.map(el => el)}
					</div>
					{this.state.ourBullets.map((bullet) => {
							return <Bullet key={bullet.id} />
						})}
						<OurTank direction={'left'}/>
						{this.state.mapItems}
				</div>
			</>
		)
	}
}

export default Map1
