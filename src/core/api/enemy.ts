import { domain } from '@/configs/config'

export const initEnemy = fetch(`${domain}enemy/set`)
	.then(data => {
		console.log(data.json())
		return data.json()
	})
	.catch(err => {
		console.error(err)
		return err
	})
