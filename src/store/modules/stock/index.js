import actions from './actions'
// initial state
const DEFAULT_RESULT = {
    condition: [],
    list: [],
    status: 0 // 0未请求 1请求成功 2请求失败
}
const state = () => ({
    result: DEFAULT_RESULT,
    stockIndexResult: DEFAULT_RESULT,
    loading: false,
    searchValue: ''
})

// getters
const getters = {}


// mutations
const mutations = {
    clearAll (state, result) {
        state.result = DEFAULT_RESULT
        state.stockIndexResult = DEFAULT_RESULT
    },
    search (state, result) {
        state.result = result
    },
    stockIndexSearch (state, result) {
        state.stockIndexResult = result
    },
    loading (state, loading) {
        state.loading = loading
    },
    setSearchValue (state, value) {
        state.searchValue = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}