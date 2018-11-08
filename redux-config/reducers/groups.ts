import {
  GET_GROUPS,
  ADD_GROUP,
  EDIT_GROUP,
  DELETE_GROUP,
  SET_MODAL_DELETE,
  SEARCH_GROUPS
} from '../../constants/actions';
import find from 'lodash/find';
const initialState = {
  groups: [],
  deleteModal: null,
  searchGroups: []
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MODAL_DELETE: 
      return {
        ...state,
        deleteModal: action.data
      }
    case SEARCH_GROUPS:
      return {
        ...state,
        searchGroups: action.data
      }
    case DELETE_GROUP:
      if (action.data.isSubgroup) {
        const group = find(
          state.groups,
          el => el.id === action.data.masterGroupId
        );
        const subgroups = group.subgroups.filter(
          (sg: any) => sg.id !== action.data.id
        );
        return {
          groups: state.groups.map(
            (el: any) =>
              el.id !== group.id
                ? el
                : {
                    ...group,
                    subgroups
                  }
          )
        };
      } else
        return {
          groups: state.groups.filter((g: any) => g.id !== action.data.id)
        };
    case EDIT_GROUP: {
      if (!action.data.isSubgroup)
        return Object.assign({}, state, {
          groups: state.groups.map(
            el => el.id === action.data.id ? action.data : el
          )
        });
      else {
        return Object.assign({}, state, {
          groups: state.groups.map((g:any) => 
            g.id !== action.data.masterGroupId? g:
            {
              ...g,
              subgroups: g.subgroups.map(sg => 
                sg.id !== action.data.id? sg: action.data)
            }
          )
        });
      }
    }

    case ADD_GROUP:
      if (action.data.isSubgroup)
        return {
          groups: state.groups.map((group: any) => {
            if (group.id === action.data.masterGroupId)
              return {
                ...group,
                subgroups: [...group.subgroups, action.data]
              };
            return group;
          })
        };
      return {
        groups: [...state.groups, action.data]
      };
    case GET_GROUPS:
      return Object.assign({}, state, {
        groups: action.data
      });
    default:
      return state;
  }
};
