import React, {Component} from 'react'
import PropTypes from 'prop-types';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/styles'
// import Header from '@/components/header'
import Map1 from '@/screens/Map1'

const styles = theme => ({
	root: {
		minHeight: '100vh',
		position: 'relative',
		width: '100vw',
	}
})

class App extends Component {
  constructor(props) {
    super(props)
    console.log('App.js - updated state', this.props.store.getState())
    this.state = {
      keyCodes: {
        leftArrow :	37,
        upArrow : 38,
        rightArrow : 39,
        downArrow : 40
      },
      // bullets
      bullets: 40,
      // our tank
      direction: {
        directionCurrent: 'up',
        dicrectionLeftStatus: 'stop',
        dicrectionRightStatus: 'stop',
        dicrectionUpStatus: 'stop',
        dicrectionDownStatus: 'stop'
      },
      
    }

    // key downs
    this.handlerKeyDownRight = this.handlerKeyDownRight.bind(this)
    this.handlerKeyDownLeft = this.handlerKeyDownLeft.bind(this)
    this.handlerKeyDownUp = this.handlerKeyDownUp.bind(this)
    this.handlerKeyDownDown = this.handlerKeyDownDown.bind(this)
    this.handlerKeyDownSpace = this.handlerKeyDownSpace.bind(this)
    // key ups
    this.handlerKeyUpRight = this.handlerKeyUpRight.bind(this)
    this.handlerKeyUpLeft = this.handlerKeyUpLeft.bind(this)
    this.handlerKeyUpUp = this.handlerKeyUpUp.bind(this)
    this.handlerKeyUpDown = this.handlerKeyUpDown.bind(this)
    // this.handlerEsc = this.handlerEsc.bind(this)
  }

  // key down
  handlerKeyDownRight = event => {
    let direction = this.state.direction
    direction.directionCurrent = 'right'
    direction.dicrectionRightStatus = 'active'
    this.setState({direction: direction})
  }

  handlerKeyDownLeft = event => {
    let direction = this.state.direction
    direction.directionCurrent = 'left'
    direction.dicrectionLeftStatus = 'active'
    this.setState({direction: direction})
  }

  handlerKeyDownUp = event => {
    let direction = this.state.direction
    direction.directionCurrent = 'up'
    direction.dicrectionUpStatus = 'active'
    this.setState({direction: direction})
  }

  handlerKeyDownDown = event => {
    let direction = this.state.direction
    direction.directionCurrent = 'down'
    direction.dicrectionDownStatus = 'active'
    this.setState({direction: direction})
  }

  handlerKeyDownSpace = event => {
    // console.log('handlerSpace')
    const newBulletsCount = this.state.bullets - 1
    this.setState({bullets: newBulletsCount})
  }

  // key up
  handlerKeyUpRight = event => {
    let direction = this.state.direction
    direction.directionCurrent = 'right'
    direction.dicrectionRightStatus = 'stop'
    this.setState({direction: direction})
  }

  handlerKeyUpLeft = event => {
    let direction = this.state.direction
    direction.directionCurrent = 'left'
    direction.dicrectionLeftStatus = 'stop'
    this.setState({direction: direction})
  }

  handlerKeyUpUp = event => {
    let direction = this.state.direction
    direction.directionCurrent = 'up'
    direction.dicrectionUpStatus = 'stop'
    this.setState({direction: direction})
  }

  handlerKeyUpDown = event => {
    let direction = this.state.direction
    direction.directionCurrent = 'down'
    direction.dicrectionDownStatus = 'stop'
    this.setState({direction: direction})
  }

  handlerKeyUpSpace = event => {
    // console.log('handlerSpace')
    const newBulletsCount = this.state.bullets - 1
    this.setState({bullets: newBulletsCount})
  }

  // handlerEsc = event => {}


  componentDidMount() {
    document.addEventListener('keydown', event => {
      if (event.isComposing || event.code === 'Space') {
        this.handlerKeyDownSpace(event)
      }
      // move
      if (event.isComposing || event.code === 'ArrowUp') {
        // console.log('ArrowUp keydown')
        this.handlerKeyDownUp(event)
      }
      if (event.isComposing || event.code === 'ArrowDown') {
        // console.log('ArrowDown keydown')
        this.handlerKeyDownDown(event)
      }
      if (event.isComposing || event.code === 'ArrowLeft') {
        // console.log('ArrowLeft keydown')
        this.handlerKeyDownLeft(event)
      }
      if (event.isComposing || event.code === 'ArrowRight') {
        // console.log('ArrowRight keydown')
        this.handlerKeyDownRight(event)
      }
    })

    document.addEventListener('keyup', event => {
      // move
      if (event.isComposing || event.code === 'ArrowUp') {
        // console.log('ArrowUp keyup')
        this.handlerKeyUpUp(event)
      }
      if (event.isComposing || event.code === 'ArrowDown') {
        // console.log('ArrowDown keyup')
        this.handlerKeyUpDown(event)
      }
      if (event.isComposing || event.code === 'ArrowLeft') {
        // console.log('ArrowLeft keyup')
        this.handlerKeyUpLeft(event)
      }
      if (event.isComposing || event.code === 'ArrowRight') {
        // console.log('ArrowRight keyup')
        this.handlerKeyUpRight(event)
      }
    })
  }

  // componentDidUpdate() {}

  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <Container maxWidth='lg' className={classes.root}>
          <Map1
            newBulletCount={this.state.bullets}
            store={this.props.store}
            direction={this.state.direction}
          />
          {/* <Header /> */}
        </Container>
      </>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App)
