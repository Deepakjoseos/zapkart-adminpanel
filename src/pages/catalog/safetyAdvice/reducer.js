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
    datas: [],
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
        case 'setdatas':
            return { ...state, datas: action.payload }
        case 'deletedatas': {
            const id = action.payload
            // eslint-disable-next-line no-underscore-dangle
            const filterdata = state.datas.filter(i => i._id !== id)
            return { ...state, filterdata }
        }
        case 'setSorters':
            return { ...state, sort: action.payload, sortQuery: qs.stringify({ sort: action.payload }) }
        case 'setSearchers':
            return {
                ...state,
                search: action.payload,
                searchQuery: qs.stringify({ search: action.payload }),
            }
        case 'updateClickedStatus': {
            const {value,id}=action.payload
            const index = findIndex(state.datas, i => {
                return i.id === id
            })
            console.log("action",action.payload)
           

            if (index > -1) {
                const { datas } = state

                datas[index].status = value

                return { ...state, datas }
            }
            return { ...state }
        }

        default:
            return { ...state }
    }
}

export { initialState, reducer }
