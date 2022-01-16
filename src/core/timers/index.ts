import Timers from '@/core/timers/Timers'

function TimersInstance() {
	return new Timers({ _this: this })
}

export default TimersInstance
