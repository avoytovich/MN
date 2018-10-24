import { GET_GROUPS } from '../../constants/actions';
import Axios from 'axios';
const initialState = {
  groups: []
};


Axios.get('https://18.217.30.162/api/Group/GetGroups?limit=25&offset=0',{
  headers: {
    'Organization': 718143998,
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGV2MkBtZXRrbm93LmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNDAiLCJpc1JlZnJlc2giOiJGYWxzZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJuYmYiOjE1NDAzNzY5NDQsImV4cCI6MTU0MTU4NjU0NCwiaXNzIjoiTWV0S25vd0F1dGhTZXJ2ZXIiLCJhdWQiOiJDbGllbnQifQ.aHT_N98OgfRM7sXbGbfK6YpXHqrCdjGUcHxAop4STzY'
  }
})
  .then(r => {
    console.log(r);
  })
  .catch(err => {
    console.log('err');
  })

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return Object.assign({}, state, {
        groups: action.data
      });
    default:
      return state;
  }
};
