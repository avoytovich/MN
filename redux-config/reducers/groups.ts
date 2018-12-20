import find from 'lodash/find';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import reverse from 'lodash/reverse';
import {
  GET_GROUPS,
  ADD_GROUP,
  EDIT_GROUP,
  DELETE_GROUP,
  SET_MODAL_DELETE,
  SEARCH_GROUPS
} from '../../constants/actions';

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
      };
    case SEARCH_GROUPS:
      const filteredSearch = uniqBy(
        [...action.data, ...state.searchGroups],
        'id'
      );

      return {
        ...state,
        searchGroups: filteredSearch
      };
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
          groups: state.groups.map((el: any) =>
            el.id !== group.id
              ? el
              : {
                  ...group,
                  subgroups
                }
          )
        };
      }
      return {
        groups: state.groups.filter((g: any) => g.id !== action.data.id)
      };
    case EDIT_GROUP: {
      if (!action.data.isSubgroup)
        return Object.assign({}, state, {
          ...state,
          groups: state.groups.map(el =>
            el.id === action.data.id ? action.data : el
          )
        });

      return Object.assign({}, state, {
        ...state,
        groups: state.groups.map((g: any) =>
          g.id !== action.data.masterGroupId
            ? g
            : {
                ...g,
                subgroups: g.subgroups.map(sg =>
                  sg.id !== action.data.id ? sg : action.data
                )
              }
        )
      });
    }

    case ADD_GROUP: {
      if (action.data.isSubgroup)
        return {
          ...state,
          groups: state.groups.map((group: any) => {
            if (group.id === action.data.masterGroupId)
              return {
                ...group,
                subgroups: [...group.subgroups, action.data]
              };
            return group;
          })
        };

      const filtered = reverse(
        sortBy(uniqBy([action.data, ...state.groups], 'id'), group =>
          moment(group.dateOfLastUpdate).unix()
        )
      );
      return {
        ...state,
        groups: filtered
      };
    }
    case GET_GROUPS: {
      const filtered = reverse(
        sortBy(uniqBy([...action.data, ...state.groups], 'id'), group =>
          moment(group.dateOfLastUpdate).unix()
        )
      );
      return Object.assign({}, state, {
        ...state,
        groups: filtered
      });
    }
    default:
      return state;
  }
};
