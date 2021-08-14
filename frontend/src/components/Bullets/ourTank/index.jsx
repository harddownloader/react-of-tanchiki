import React, { Component } from 'react'
import styled from 'styled-components'

const BulletItem = styled.div`
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: #fff;
	border: 1px solid #000;
	// display: flex;
	// justify-content: center;
	// align-items: center;
`

class Bullet extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<BulletItem className='bullet'></BulletItem>
			</>
		)
	}
}

export default Bullet
