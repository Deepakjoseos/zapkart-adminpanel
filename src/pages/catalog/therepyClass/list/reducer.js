import qs from 'qs'
import findIndex from 'lodash/findIndex'

const initialState = {
  refresh: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  searchQuery: '',
  sortQuery: '',
  users: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'refreshData':
      return { ...state, refresh: !state.refresh }
    case 'setCurrentPage':
      return { ...state, pagination: { ...state.pagination, current: Number(action.payload) } }
    case 'setPageSize':
      return { ...state, pagination: { ...state.pagination, pageSize: Number(action.payload) } }
    case 'setTotal': {
      console.log('total data', action.payload)
      return { ...state, pagination: { ...state.pagination, total: Number(action.payload) } }
    }
    case 'setUsers':
      return { ...state, users: action.payload }
    case 'setSorters':
      console.log("actionPAyload",action.payload)
      return { ...state, sort: action.payload, sortQuery: qs.stringify({ sort: action.payload }) }
    case 'setSearchers':{
console.log("action",action.payload)
// action.payload=action.payload?.name.replace(/\s+/g, ' ').trim()
      return {
        ...state,
        search: action.payload,
        searchQuery: qs.stringify({ search: action.payload }),
      }
    }
    case 'setFilters': {
      console.log('setFilters reducer', action.payload)
      return {
        ...state,
        filterQuery: qs.stringify(action.payload),
      }
    }
    case 'updateClickedStatus': {
      const { value, id } = action.payload
      // eslint-disable-next-line no-underscore-dangle
      const index = findIndex(state.users, (i) => i._id === id)

      if (index > -1) {
        const { users } = state

        users[index].status = value

        return { ...state, users }
      }
      return { ...state }
    }
    case 'deleteClass': {
      const id = action.payload
      // eslint-disable-next-line no-underscore-dangle
      const filterdata = state.users.filter(i => i._id !== id)
      return { ...state, filterdata }
    }
    default:
      return { ...state }
  }
}

export { initialState, reducer }
