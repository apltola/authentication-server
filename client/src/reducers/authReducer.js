export default function(state = {}, action) {
  switch(action.type) {
    case 'jotain':
      return { ...state, auth: action.payload }

    default: return state;
  }
}