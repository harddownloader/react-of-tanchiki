// import React, { Component } from 'react'

class Timers {
	constructor(props) {
		// super(props)
		// console.log(props._this.state)
		this.contextThis = props._this
		// console.log('Timers', props)
	}

	stopTimer() {
		clearInterval(this.timerId)
	}

	// таймер для патронов и генерации врагов
	startTimer() {
		if (!this.timerId) {
			this.timerId = setInterval(() => {
				// update bullets
				const bullets = this.contextThis.state.ourBullets
				if (bullets.length !== 0) {
					bullets.map(item => {
						if (item.direction === 'up') {
							item.y -= 1
						} else if (item.direction === 'down') {
							item.y += 1
						} else if (item.direction === 'left') {
							item.x -= 1
						} else if (item.direction === 'right') {
							item.x += 1
						}

						if (
							item.x < 0 ||
							item.y < 0 ||
							item.x > this.contextThis.state.heightMap ||
							item.y > this.contextThis.state.wightMap
						) {
							// rm current bullet
							for (let i = 0; i < bullets.length; i++) {
								if (bullets[i].id === item.id) {
									// rm useless bullet then it outside game zome
									bullets.splice(i, 1)
									this.contextThis.setState({ ourBullets: bullets })
									break
								}
							}
						}

						// console.log('item', item)

						return item
					})

					this.contextThis.setState({ ourBullets: bullets })
				}
				// generete enemy
				if (this.contextThis.state.timer === 3) {
					const enemies = this.contextThis.state.enemies
					const enemyY = 0
					const generateX = this.contextThis.GeneratorEnemy.generateEnemyX(
						enemyY,
						this.contextThis.state.ourTank.x,
						this.contextThis.state.ourTank.y,
					)
					// console.log('generateX', generateX)
					enemies.push({
						name: 'SelfPropelledGun',
						id: 'SelfPropelledGun' + enemies.length,
						x: generateX,
						y: enemyY,
					})
					// console.log('generete enemy', enemies)
					// debugger
					this.contextThis.setState({ enemies: enemies })
				}

				// update timer
				this.contextThis.setState({ timer: this.contextThis.state.timer + 1 })
			}, 1000)
		}
	}

	// передвижение танка игрока
	timerRunTank() {
		// console.log('timerRunTank', this.contextThis)

		// нажимает кнопку
		if (!this.timerIdRunTank) {
			const counterInterval = 0
			this.timerIdRunTank = setInterval(() => {
				const { ourTank } = this.contextThis.state
				const { direction } = this.contextThis.state

				let needNewOurTankXY =
					this.contextThis.checkOurTankOnOutSideMap(ourTank)
				if (direction.dicrectionRightStatus === 'active') {
					needNewOurTankXY = this.contextThis.checkOurTankOnOutSideMap({
						y: ourTank.y,
						x: ourTank.x + 1,
					})
				} else if (direction.dicrectionLeftStatus === 'active') {
					needNewOurTankXY = this.contextThis.checkOurTankOnOutSideMap({
						y: ourTank.y,
						x: ourTank.x - 1,
					})
				} else if (direction.dicrectionUpStatus === 'active') {
					needNewOurTankXY = this.contextThis.checkOurTankOnOutSideMap({
						y: ourTank.y - 1,
						x: ourTank.x,
					})
				} else if (direction.dicrectionDownStatus === 'active') {
					needNewOurTankXY = this.contextThis.checkOurTankOnOutSideMap({
						y: ourTank.y + 1,
						x: ourTank.x,
					})
				} else {
					// this.stopTimerRunTank()
				}

				this.contextThis.setState({ ourTank: needNewOurTankXY })

				// console.log('setInterval is running', counterInterval++)
			}, 500)
		}
	}

	// остановить передвижение танка игрока
	stopTimerRunTank() {
		// console.log('stopTimerRunTank')
		// отжимаем кнопку
		clearInterval(this.timerIdRunTank)
		delete this.timerIdRunTank
	}
}

export default Timers
