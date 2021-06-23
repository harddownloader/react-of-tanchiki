import React, {Component} from 'react';


/**
 * логика врагов
 */
export class EnemyLogic extends Component{
  constructor(props) {
    super(props)
    // this.enemyId = enemyId
    // this.x = enemyX
    // this.y = enemyY
    // this.ourTankX = ourTankX
    // this.ourTankY = ourTankY
    // this.updateEnemyXY = updateEnemyXY
    console.log('EnemyLogic')

    this.state = {
      enemyId: props.enemyId,
      enemyX: props.enemyX,
      enemyY: props.enemyY,
      ourTankX: props.ourTankX,
      ourTankY: props.ourTankY,
      // updateEnemyXY
    } 
    this.startMove()
  }

  startMove() {
    // найти наш танк
    const target = this.findOurTank()
    // начать движение к нему
    const newXY = this.moveTo(target)
    console.log('startMove newXY', newXY)
    console.log('startMove enemyId', this.state.enemyId)
    this.props.updateEnemyXY({
      enemyId: this.state.enemyId,
      x: newXY.x,
      y: newXY.y
    })
  }

  findOurTank() {
    return {
      ourTankX: this.state.ourTankX,
      ourTankY: this.state.ourTankY
    }
  }

  moveTo({ourTankX, ourTankY}) {
    let x = ourTankX,
        y = ourTankY,
        currentX = this.state.enemyX,
        currentY = this.state.enemyY
    // if (currentX > x) {
    //   currentX = currentX - 1
    // } else if (currentX < x) {
    //   currentX = currentX + 1
    // } else if(currentY > y) {
    //   currentY = currentY + 1
    // } else if (currentY < y) {
    //   currentY = currentY - 1
    // } else {
    //   console.error('EnemyLogic -> moveTo x y')
    // }

    // this.x = currentX
    // this.y = (currentY + 1)
    // this.setState({
    //   x: currentX,
    //   y: (currentY + 1)
    // }, () => {

    // сделать проверку, как танку врага быстрее всего добраться до общей диалогнали с нашим танком(чтобы атаковать), по x или по y?
    //   сравниваем x и y танка врага и нашего
    //   и выбираем то направление, по которому танку соперника ближе всего уровниться с нашим танком
    //     делаем проверку, сравнились ли два танка по диагонали
    //       если сравнились - то даем команду на атаку
      
    // })
    this.state.enemyX = currentX
    this.state.enemyY = (currentY + 1)
    console.log('currentY', currentY)
    return {
      x: this.state.enemyX,
      y: this.state.enemyY
    }
  }


}
