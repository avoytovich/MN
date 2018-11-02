import { GET_GROUPS, ADD_GROUP, EDIT_GROUP, DELETE_GROUP } from '../../constants/actions';
const initialState = {
  groups: []
};


export default (state = initialState, action: any) => {
  switch (action.type) {

    case DELETE_GROUP:
      if(!action.data.isSubgroup)
        return Object.assign({}, state, {
          groups: state.groups.filter(el => el.id === action.data.id? action.data: el)
        })
      return state;
    case EDIT_GROUP: {
      if (!action.data.isSubgroup)
        return Object.assign({}, state, {
          groups: state.groups.map(el => el.id === action.data.id ? action.data : el)
        })
      else {
        const groups = state.groups.map(g => {
          return g.subgroups.map(el => {
            if(el.id === action.data.id)
              return action.data;
            else
              return el;
          })
        })
        return Object.assign({}, state, {
          groups: state.groups.map(g => g.subgroups.map(el => el.id === action.data.id ? action.data : el))
        })
      }

    }
    case ADD_GROUP:
      return Object.assign({}, state, {
        groups: [...state.groups, action.data]
      })
    case GET_GROUPS:
      return Object.assign({}, state, {
        groups: action.data
      });
    default:
      return state;
  }
};
