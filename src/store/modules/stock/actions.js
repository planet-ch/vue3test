import { getSearchData } from "@/api/stock";
import { updateTableData } from "@/store/utils";

// actions
const actions = {
    async search ({ commit, state }, { value }) {
        commit('loading', true)
        commit('setSearchValue', value.text)
        const params = {
            ...value,
            token: '26027edd1eedf8b21a3a070062b3d9ba'
        }
        delete params.tableLoading
        delete params.condition
        const data = await getSearchData(params).catch(() => commit('loading', false))
        const status = !!data ? 1 : 2
        const actionKeys = ['', 'search', 'stockIndexSearch']
        console.log(data, 'data出问题了？', value);
        commit('loading', false)
        if (data) {
            commit(actionKeys[Number(value.classify)], {
                ...(data?.data),
                status
            })
        }
        // setTimeout(() => {
        //     commit('search', list)
        //     commit('loading', false)
        // }, 1500)
    },

    /*
    * updateTableData: 更新已确定搜索条件下的 指定表格数据 - 一般由翻页触发
    * */
    async updateTableData ({ commit, state }, { value }) {
        const params = {
            ...value,
            token: '26027edd1eedf8b21a3a070062b3d9ba'
        }
        delete params.tableLoading
        delete params.condition
        const jsonData = value.condition
        const data = await getSearchData(params, jsonData)
        const actionKeys = ['', 'search', 'stockIndexSearch']
        const stateKeys = ['', 'result', 'stockIndexResult']
        console.log(data, 'data出问题了？', value);
        if (data) {
            const source = state[stateKeys[Number(value.classify)]]
            const newData = updateTableData(source, data.data, jsonData.table)
            commit(actionKeys[Number(value.classify)], {
                ...(newData)
            })
        }
    }
}

export default actions