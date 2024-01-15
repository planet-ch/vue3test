import actions from './actions'
// initial state
const state = () => ({
    result: [],
    loading: false,
    searchValue: ''
})

// getters
const getters = {}


// mutations
const mutations = {
    search (state, result) {
        state.result = result
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