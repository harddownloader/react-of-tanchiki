import React, { Component } from 'react'
import { initEnemy } from '@/core/api/enemy'
/**
 * логика врагов
 */
export class EnemyLogic extends Component {
	constructor(props) {
		super(props)
		// this.enemyId = enemyId
		// this.x = enemyX
		// this.y = enemyY
		// this.ourTankX = ourTankX
		// this.ourTankY = ourTankY
		// this.updateEnemyXY = updateEnemyXY
		// console.log('EnemyLogic')

		this.state = {
			enemyId: props.enemyId,
			enemyX: props.enemyX,
			enemyY: props.enemyY,
			ourTankX: props.ourTankX,
			ourTankY: props.ourTankY,
			radius_of_destruction: props.radius_of_destruction,
			numberOfEnemyShots: 0,
			currentBulletId: '',
		}
		this.initEnemy = initEnemy()
		this.startMove()
	}

	async startMove() {
		// найти наш танк
		const target = await this.findOurTank()
		// начать движение к нему
		const newXY = await this.moveTo(target)
		console.log('startMove newXY', newXY)
		console.log('startMove enemyId', this.state.enemyId)
		await this.props.updateEnemyXY({
			enemyId: this.state.enemyId,
			x: newXY.x,
			y: newXY.y
		})
		console.log('before startMove')
		debugger
		setTimeout(() => {
			this.startMove()
		}, 1000)
	}

	findOurTank() {
		return {
			ourTankX: this.state.ourTankX,
			ourTankY: this.state.ourTankY
		}
	}

	moveTo({ ourTankX, ourTankY }) {
		const x = ourTankX,
			y = ourTankY,
			currentX = this.state.enemyX,
			currentY = this.state.enemyY

		// сделать проверку, как танку врага быстрее всего добраться до общей диалогнали с нашим танком(чтобы атаковать), по x или по y?
		// разница по y в любую сторону
		let diffY
		let needMoveToDown = false
		if (currentY >= y) {
			diffY = currentY - y
		} else {
			diffY = y - currentY
			needMoveToDown = true
		}

		// разница по x в любую сторону
		let diffX

		let needMoveToLeft = false
		if (currentX >= x) {
			diffX = currentX - x
			needMoveToLeft = true
		} else {
			diffX = x - currentX
		}

		// return {
		//   x: this.state.enemyX,
		//   y: this.state.enemyY
		// }
		let isFired = false
		if (this.state.currentBulletId !== '') isFired = true
		if (x === currentX && !isFired) {
			if (diffY < this.state.radius_of_destruction) {
				// console.log('fire! x', {
				//   id: this.state.enemyId + this.state.numberOfEnemyShots,
				//   enemyId: this.state.enemyId,
				//   direction: needMoveToDown ? 'down' : 'up'
				// })
				const newId = this.state.enemyId + this.state.numberOfEnemyShots

				this.props.addEnemyBullet({
					id: newId,
					enemyId: this.state.enemyId,
					direction: needMoveToDown ? 'down' : 'up',
					x: this.state.enemyX,
					y: this.state.enemyY
				})
				this.setState({ currentBulletId: newId })
				// debugger
				return {
					x: this.state.enemyX,
					y: this.state.enemyY
				}
			}
		} else if (y === currentY && !isFired) {
			if (diffX < this.state.radius_of_destruction) {
				// console.log('fire! y', {
				//   id: this.state.enemyId + this.state.numberOfEnemyShots,
				//   enemyId: this.state.enemyId,
				//   direction: needMoveToLeft ? 'left': 'right'
				// })
				const newId = this.state.enemyId + this.state.numberOfEnemyShots

				this.props.addEnemyBullet({
					id: newId,
					enemyId: this.state.enemyId,
					direction: needMoveToLeft ? 'left' : 'right'
				})
				this.setState({ currentBulletId: newId })

				// debugger
				return {
					x: this.state.enemyX,
					y: this.state.enemyY
				}
			}
		}

		// смотрим в какую сторону ближе двигаться
		if (diffY > diffX && diffX !== 0) {
			// если x нам ближе то двигаем ся по нему
			// console.log('diffY > diffX needMoveToLeft', needMoveToLeft)
			if (needMoveToLeft) {
				this.state.enemyX = currentX - 1
			} else {
				this.state.enemyX = currentX + 1
			}
			// debugger
		} else if (diffY < diffX && diffY !== 0) {
			// если y нам ближе , то двигаемся по нему
			// console.log('diffY < diffX needMoveToDown', needMoveToDown)
			if (needMoveToDown) {
				this.state.enemyY = currentY + 1
			} else {
				this.state.enemyY = currentY - 1
			}
			// debugger
		} else {
			// console.log('diffY = diffX, одинаковые x и y')

			// diffX === diffX
			// diffX && diffX !== 0
			this.state.enemyY = currentY + 1
			// debugger
		}
		// debugger
		//   сравниваем x и y танка врага и нашего
		//   и выбираем то направление, по которому танку соперника ближе всего уровниться с нашим танком
		//     делаем проверку, сравнились ли два танка по диагонали
		//       проверяем хватает ли нам нашего радиуса поражоения для атаки, если хватает
		//          атакуем
		//       иначе
		//        пытаемся подойти ближе
		//          как подошли на нужный радиус
		//            атакуем

		// })
		// this.state.enemyX = currentX
		// this.state.enemyY = (currentY + 1)
		// console.log('currentY', currentY)
		return {
			x: this.state.enemyX,
			y: this.state.enemyY
		}
	}
}
