import { domain } from '@/configs/config'

export const initEnemy = () => fetch(`${domain}enemy/set`)
	.then(response => response.json())
	.then(data => {
		console.log('initEnemy', data)
		return data
	})
	.catch(err => {
		console.error(err)
		return err
	})
