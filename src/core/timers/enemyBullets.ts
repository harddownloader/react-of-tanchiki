// import React, { Component } from 'react'

class EnemyBuleetsTimer {
	constructor(props) {
		// super(props)
		// console.log(props._this.state)
		this.contextThis = props._this
		// console.log('EnemyBuleetsTimer', props)
	}

	stopTimer() {
		clearInterval(this.timerId)
	}

	startTimer() {
		if (!this.timerId) {
			this.timerId = setInterval(() => {
				// update bullets
				const bullets = this.contextThis.state.enemiesBulletsList
				// console.log('bullets', bullets)
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
									this.contextThis.setState({ enemiesBulletsList: bullets })
									break
								}
							}
						}

						// console.log('item', item)

						return item
					})

					this.contextThis.setState({ enemiesBulletsList: bullets })
				}
			}, 1000)
		}
	}
}

export default EnemyBuleetsTimer
