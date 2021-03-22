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

const styles = theme => ({
	root: {
		minHeight: '100vh',
		position: 'relative',
		width: '100vw',
	},
})

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <Container maxWidth='lg' className={classes.root}>
          <Header />
        </Container>
      </>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default  withStyles(styles)(App)
