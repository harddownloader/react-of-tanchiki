class GenerateEnemy {
	constructor(props) {
		this.contextThis = props._this
		console.log('GenerateEnemy props', props)
	}

	// защита от респамна врага на одном месте, или очень рядом с нашим танком
	generateEnemyX(enemyY, ourTankX, ourTankY) {
		const randomX = this.contextThis.GenerateRandom.generateRandomInt(
			this.contextThis.state.wightMap
		)
		// console.log('randomX', randomX)
		if (enemyY === ourTankY) {
			// позитивное - значит справа
			const diffXPositive = randomX - ourTankX
			// позитивное - значит слева
			const diffXNegative = ourTankX - randomX

			if (diffXPositive > 0 && diffXPositive < 5) {
				// недостаточно справа
				return ourTankX + 5
			}
			if (diffXNegative > 0 && diffXNegative < 5) {
				// недостаточно слева
				return ourTankX - 5
			}
		}

		// все норм, можем генерить
		return randomX
	}

	// чтобы враг двигался, --прокидывается бумерангом до уровня логики движения врага
	updateEnemyXY({ x, y, enemyId }) {
		const { enemies } = this.contextThis.state
		// тут его name всесто индификатора порядкового номера
		const indexEnemy = enemies.findIndex(item => item.id === enemyId)
		// debugger
		enemies[indexEnemy] = {
			...enemies[indexEnemy],
			x,
			y,
		}
		this.contextThis.setState({ enemies }, () => {
			return enemies
		})
	}
}

export default GenerateEnemy
