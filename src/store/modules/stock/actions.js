import {getTakingData} from "@/api/stock";
// actions
const actions = {
    async search ({ commit }, { value }) {
        commit('loading', true)
        commit('setSearchValue', value)
        const params = {
            code: '000725'
        }
        const data = await getTakingData(params)
        console.log(data);
        const list = value.split('').map((v, i) => {
            let randomNumber1 = Math.floor(Math.random() * 10) + 1;
            let randomNumber4 = Math.floor(Math.random() * 10) + 1;
            let randomNumber2 = (Math.random() * 100).toFixed(2);
            let randomNumber3 = (Math.random() * 1000).toFixed(2);
            return {
                '时间区间': `2023-0${i + 1}-03`,
                '净利润(元)': randomNumber1 + '亿',
                '净利润(同比增长率)(%)': randomNumber2,
                '扣非净利润(元)': randomNumber1 + '亿',
                '营业收入(元)': randomNumber2 + '亿',
                '营业收入(同比增长率)(%)': randomNumber2,
                '销售费用(元)': randomNumber3 + '万',
                '管理费用(元)': randomNumber1 + '亿',
                '研发费用(元)': randomNumber4 + '亿',
                '财务费用(元)': randomNumber1 + '亿',
                '基本每股收益(元)': randomNumber1,
            }
        })
        commit('search', list)
        commit('loading', false)
        // setTimeout(() => {
        //     commit('search', list)
        //     commit('loading', false)
        // }, 100000)
    }
}

export default actions