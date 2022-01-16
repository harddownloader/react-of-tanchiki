import React, { Component } from 'react'
import styled from 'styled-components'

const BulletItem = styled.div`
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: green;
	border: 1px solid #000;
	// display: flex;
	// justify-content: center;
	// align-items: center;
`

class EnemyBullet extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<BulletItem className='enemy_bullet'></BulletItem>
  </>
		)
	}
}

export default EnemyBullet
