import { domain } from '@/configs/config'

export const initPlayer = () =>
	fetch(`${domain}player/set`)
	.then(response => response.json())
	.then(data => {
    console.log('initPlayer', data)
    return data
  })
	.catch(err => {
		console.error(err)
		return err
	})
