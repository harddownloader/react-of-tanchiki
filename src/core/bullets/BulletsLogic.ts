// import React from 'react';
import multiClass from '@/utils/MultiClass'
import OurTankBulletsLogic from '@/core/bullets/ourTank'
import EnemyBulletsLogic from '@/core/bullets/enemy'

class BulletsLogic extends (new multiClass(
	OurTankBulletsLogic.call(this, { _this: this }),
	EnemyBulletsLogic.call(this, { _this: this })
)) {}
export default BulletsLogic
