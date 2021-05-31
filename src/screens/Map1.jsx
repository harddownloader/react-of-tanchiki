import React, {Component} from 'react';

import OurTank from '@/components/ourTank/OurTank'
import Bullet from '@/components/Bullet'
import makeId from '@/utils/generateRandomString'

class Map1 extends Component {
  constructor(props) {
    super(props)
    // console.log('props store', this.props.store)
    
    this.state = {
      mapItems: [],
      heightMap: 13,
      wightMap: 13,

      // our tank
      ourTank: {
        y: 12,
        x: 6
      },
      direction: {
        // directionCurrent: props.direction.directionCurrent,
        // dicrectionRightStatus: props.direction.dicrectionRightStatus,
        // dicrectionLeftStatus: props.direction.dicrectionLeftStatus,
        // dicrectionDownStatus: props.direction.dicrectionDownStatus,
        // dicrectionUpStatus: props.direction.dicrectionUpStatus,

        directionCurrent: null,
        dicrectionRightStatus: null,
        dicrectionLeftStatus: null,
        dicrectionDownStatus: null,
        dicrectionUpStatus: null,
      },

      // our bullets
      ourBullets: [],

      // timer
      timer: 0,
    }
  }

  // MAP
  generateMap () {
    const mapItemsTmp = this.genereteRows()
    this.setState({mapItems: mapItemsTmp})
  }

  genereteRows() {
    let mapItemsRows = []
    for(let y=0; y<this.state.heightMap; y++) {
      // mapItemsRows = mapItemsRows.concat( this.genereteColumns(y) )
      mapItemsRows.push(this.genereteColumns(y) )
    }
    return mapItemsRows
  }

  genereteColumns(y) {
    // console.log('genereteColumns')
    const mapItemsCol = []
    for(let x=0; x<this.state.wightMap; x++) {
      let isOurTank = this.state.ourTank
      let isOurBullets = this.state.ourBullets
      let itemContent
      if( isOurTank.x === x && isOurTank.y === y) {
        // mapItemsCol.push(<div className="grid-item" key={`${y}${x}`}><OurTank /></div>)
        itemContent = <>{itemContent}<OurTank direction={this.props.direction.directionCurrent} /></>
      }
      if (isOurBullets.length !== 0) {
        isOurBullets.forEach(bullet => {
          if(bullet.x ===x && bullet.y ===y) {
            // mapItemsCol.push(<div className="grid-item" key={`${y}${x}`}><Bullet /></div>)
            // console.log('find boolet x y')
            itemContent = <>{itemContent}<Bullet/></>
          } 
        })
      }
      // console.log('itemContent', itemContent)
      
      if (!itemContent) {
        // mapItemsCol.push(<div className="grid-item" key={`${y}${x}`}>{y}-{x}</div>)
        itemContent = <>{y}-{x}</>
      }

      mapItemsCol.push(<div className="grid-item" key={`${y}${x}`}>{itemContent}</div>)
    }

    return mapItemsCol
  }

  // BULLETS
  generateBullet() {
    const ourBulletsTmp = this.state.ourBullets
    const randomId = makeId(10)
    
    ourBulletsTmp.push({
      id: randomId,
      direction: this.props.direction.directionCurrent,
      // started X,Y
      y: this.state.ourTank.y,
      x: this.state.ourTank.x
    })
    this.setState({ourBullets: ourBulletsTmp})
  }

  componentDidMount() {
    this.generateMap()

    console.log(
      'map1 store dispatch',
      this.props.store.dispatch({
        type:'INCREMENT',
        data: {
          ourTank: {
            y: this.state.ourTank.y,
            x: this.state.ourTank.x
          }
        }
      })
    )

    // start timer
    this.startTimer()
  }

  componentDidUpdate(prevProps, prevState) {
    // newBulletCount
    // this.generateMap()
    // обновился список патронов
    // console.log('this.props.newBulletCount', this.props.newBulletCount)
    if (this.props.newBulletCount !== prevProps.newBulletCount) {
      // console.log('Update newBulletCount')
      this.generateBullet()

      this.generateMap()

    }

    // console.log('this.state.timer', this.state.timer)
    if (this.state.timer !== prevState.timer) {
      this.generateMap()
    }

    // console.log('this.props.direction.dicrectionRightStatus', this.props.direction.dicrectionRightStatus)
    // console.log('prevProps.direction.dicrectionRightStatus', this.state.direction.dicrectionRightStatus)
    // console.log('===========')
    if (
      this.props.direction.dicrectionRightStatus !== this.state.direction.dicrectionRightStatus ||
      this.props.direction.dicrectionLeftStatus !== this.state.direction.dicrectionLeftStatus ||
      this.props.direction.dicrectionUpStatus !== this.state.direction.dicrectionUpStatus ||
      this.props.direction.dicrectionDownStatus !== this.state.direction.dicrectionDownStatus
    ) {
      console.log('update direction')

      if (
        this.props.direction.dicrectionRightStatus !== this.state.direction.dicrectionRightStatus &&
        this.props.direction.dicrectionRightStatus === 'stop'
      ) {
          this.stopTimerRunTank()
      } else if(this.props.direction.dicrectionLeftStatus !== this.state.direction.dicrectionLeftStatus &&
        this.props.direction.dicrectionLeftStatus === 'stop') {
          this.stopTimerRunTank()
      } else if (this.props.direction.dicrectionUpStatus !== this.state.direction.dicrectionUpStatus && 
        this.props.direction.dicrectionUpStatus === 'stop') {
          console.log('- dicrectionUpStatus stop')
          this.stopTimerRunTank()
      } else if (this.props.direction.dicrectionDownStatus !== this.state.direction.dicrectionDownStatus &&
        this.props.direction.dicrectionDownStatus === 'stop') {
          this.stopTimerRunTank()
      }

      // this.props.direction.dicrectionRightStatus !== this.state.direction.dicrectionRightStatus ||
      // this.props.direction.dicrectionLeftStatus !== this.state.direction.dicrectionLeftStatus ||
      // this.props.direction.dicrectionUpStatus !== this.state.direction.dicrectionUpStatus ||
      // this.props.direction.dicrectionDownStatus !== this.state.direction.dicrectionDownStatus

      const newDirection = Object.assign({}, this.props.direction)
      this.setState({direction: newDirection}, () => {
        // console.log('after update direction')
        this.timerRunTank()
      })
      this.generateMap()
    }
  }

  checkOurTankOnOutSideMap(NewTankXY) {
    let needTankXY = NewTankXY
    if (NewTankXY.x < 0) {
      needTankXY.x = 0
    }
    if (NewTankXY.y < 0) {
      needTankXY.y = 0
    }
    if (NewTankXY.x > this.state.heightMap - 1) {
      needTankXY.x = this.state.heightMap - 1
    }
    if (NewTankXY.y > this.state.wightMap -1) {
      needTankXY.y = this.state.wightMap - 1
    }
    // console.log('needTankXY', needTankXY)
    return needTankXY
  }

  timerRunTank() {
    // нажимает кнопку
    if(!this.timerIdRunTank) {
      let counterInterval = 0
      this.timerIdRunTank = setInterval(() => {
        const ourTank = this.state.ourTank
        const direction = this.state.direction

        let needNewOurTankXY = this.checkOurTankOnOutSideMap(ourTank)
        if (direction.dicrectionRightStatus === 'active') {
          needNewOurTankXY = this.checkOurTankOnOutSideMap({
            y: ourTank.y,
            x: (ourTank.x + 1)
          })
          
        } else if (direction.dicrectionLeftStatus === 'active') {
          needNewOurTankXY = this.checkOurTankOnOutSideMap({
            y: ourTank.y,
            x: (ourTank.x - 1)
          })
        } else if (direction.dicrectionUpStatus === 'active') {
          needNewOurTankXY = this.checkOurTankOnOutSideMap({
            y: (ourTank.y - 1),
            x: ourTank.x
          })
        } else if (direction.dicrectionDownStatus === 'active') {
          needNewOurTankXY = this.checkOurTankOnOutSideMap({
            y: (ourTank.y + 1),
            x: ourTank.x
          })
        } else {
          // this.stopTimerRunTank()
        }

        this.setState({ourTank: needNewOurTankXY})

        console.log('setInterval is running', counterInterval++)
      }, 500)
    }
  }

  stopTimerRunTank() {
    console.log('stopTimerRunTank')
    // отжимаем кнопку
    clearInterval(this.timerIdRunTank);
    delete this.timerIdRunTank
  }

  startTimer() {
    if(!this.timerId) {
      this.timerId = setInterval(() => {
        // update bullets
        const bullets = this.state.ourBullets
        if(bullets.length !== 0) {
          bullets.map((item) => {
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
              item.x > this.state.heightMap ||
              item.y > this.state.wightMap
            ) {
              // rm current bullet
              for (let i=0; i<bullets.length; i++) {
                if (bullets[i].id === item.id) {
                  // rm useless bullet then it outside game zome
                  bullets.splice(i, 1)
                  this.setState({ourBullets: bullets})
                  break
                }
              }
            }

            console.log('item', item)

            return item
          })

          this.setState({ourBullets: bullets})
        }
        // update our tank

        // update timer
        this.setState({timer: this.state.timer + 1})
      }, 1000);
    }
  }
  
  stopTimer() {
    clearInterval(this.timerId);
  }

  render() {
    return(
      <>
        <div className="map map1">
          <div className="grids-container">
            {this.state.mapItems}
          </div>
        </div>
      </>
    )
  }
}

export default Map1
