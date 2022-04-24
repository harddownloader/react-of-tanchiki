import { domain } from '@/configs/config'

export const initMap = () => fetch(`${domain}map/`)
	.then(response => response.json())
	.then(data => {
		return data
	})
	.catch(err => {
		console.error(err)
		return err
	})
