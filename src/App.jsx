import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/styles'
import Header from '@/components/header'
import Map1 from '@/screens/Map1'

const styles = theme => ({
	root: {
		minHeight: '100vh',
		position: 'relative',
		width: '100vw',

    //bullets
    bullets: 40
	},
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
      }
    }

    // this.handlerRight = this.handlerRight.bind(this)
    // this.handlerLeft = this.handlerLeft.bind(this)
    // this.handlerUp = this.handlerUp.bind(this)
    // this.handlerDown = this.handlerDown.bind(this)
    this.handlerSpace = this.handlerSpace.bind(this)
    // this.handlerEsc = this.handlerEsc.bind(this)
  }

  // handlerRight = event => {}

  // handlerLeft = event => {}

  // handlerUp = event => {}

  // handlerDown = event => {}

  handlerSpace = event => {
    this.setState({bullets: this.state.bullets--})
  }

  // handlerEsc = event => {}


  componentDidMount() {
    document.addEventListener('keydown', event => {
      if (event.isComposing || event.code === 'Space') {
        this.handlerSpace(event)
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
          <Map1 newBulletCount={this.state.bullets} store={this.props.store}/>
          <Header />
        </Container>
      </>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App)
