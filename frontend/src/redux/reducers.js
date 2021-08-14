import { isConstructorDeclaration } from "typescript"

export function playlist(state = [], action) {
  switch (action.type) {
    case 'INCREMENT':
      state.push({name:'Audi'})
      // console.log('reducers - hello increment index', action.data)
      state.push(action.data)
      for(let item of state) {
        // console.log(item)
      }
      return state
    case 'DECREMENT':
      state.splice(0,1)
      // console.log('hello decrement')
      for(let item of state) {
        // console.log(item)
      }
      console.log(state)
      return state
      // default если не сработал ни один из случаев
    default:
      state = [{name: 'bmw'}]
      return state
  }
}

export function fireEnemy(state = [], action) {
  switch(action.type) {
    case 'fire':
      console.log('fire', action.data)
      return state
    default:
      return state
  }
}
