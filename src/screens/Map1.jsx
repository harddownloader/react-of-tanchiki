import React, {Component} from 'react';

import OurTank from '@/components/ourTank/OurTank'


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
      }
    }
  }

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
    const mapItemsCol = []
    for(let x=0;x<this.state.wightMap; x++) {
      let isOurTank = this.state.ourTank
      if( isOurTank.x === x && isOurTank.y === y) {
        mapItemsCol.push(<div className="grid-item" key={`${y}${x}`}><OurTank /></div>)
      } else {
        mapItemsCol.push(<div className="grid-item" key={`${y}${x}`}>{y}-{x}</div>)
      }
      
    }
    return mapItemsCol
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
  }

  componentDidUpdate() {
    // newBulletCount
    // this.generateMap()
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
