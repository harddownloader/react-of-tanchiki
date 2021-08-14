// генерируем предметы на карте
import OurTank from '@/components/ourTank/OurTank'
import Bullet from '@/components/Bullets/ourTank'
import EnemyBullet from '@/components/Bullets/enemy'
import { SelfPropelledGun } from '@/components/enemies/SelfPropelledGun'


// MAP
export default class GenerateMap {
  constructor(props) {
    // this.contextThis = props._this
  }

  generateMap() {
    const mapItemsTmp = this.genereteRows()
    this.setState({ mapItems: mapItemsTmp })
  }

  genereteRows() {
    const mapItemsRows = []
    for (let y = 0; y < this.state.heightMap; y++) {
      mapItemsRows.push(this.genereteColumns(y))
    }
    return mapItemsRows
  }

  genereteColumns(y) {
    const mapItemsCol = []
    for (let x = 0; x < this.state.wightMap; x++) {
      const isOurTank = this.state.ourTank
      const isOurBullets = this.state.ourBullets
      const enemyBullets = this.state.enemiesBulletsList
      const { enemies } = this.state
      let itemContent = 0

      const currentBlock = []

      // out tank
      if (isOurTank.x === x && isOurTank.y === y) {
        currentBlock.push(
          <OurTank direction={this.props.direction.directionCurrent} />,
        )
      }
      // bullets
      for (let q = 0; q < isOurBullets.length; q++) {
        if (isOurBullets[q].x === x && isOurBullets[q].y === y) {
          currentBlock.push(<Bullet />)
        }
      }
      // bullets enemy
      for (let q = 0; q < enemyBullets.length; q++) {
        if (enemyBullets[q].x === x && enemyBullets[q].y === y) {
          currentBlock.push(<EnemyBullet />)
        }
      }
      // enemies
      for (let w = 0; w < enemies.length; w++) {
        if (enemies.length > 1) {
          // debugger
        }
        if (enemies[w].x === x && enemies[w].y === y) {
          currentBlock.push(
            <SelfPropelledGun
              ourTank={this.state.ourTank}
              enemy={{
                id: enemies[w].id,
                x: enemies[w].x,
                y: enemies[w].y,
              }}
              updateEnemyXY={this.updateEnemyXY.bind(this)}
              addEnemyBullet={this.EnemyBulletsLogic.addEnemyBullet.bind(this)}
            />,
          )
        }
      }

      for (let i = 0; i < currentBlock.length; i++) {
        itemContent = (
          <>
            {itemContent} {currentBlock[i]}{' '}
          </>
        )
      }

      if (!itemContent) {
        itemContent = (
          <>
            {y}-{x}
          </>
        )
      }

      mapItemsCol.push(
        <div className='grid-item' key={`${y}${x}`}>
          {itemContent}
        </div>,
      )
    }

    return mapItemsCol
  }
}
