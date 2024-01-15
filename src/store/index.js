import { createStore, createLogger } from 'vuex'
import stock from './modules/stock'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        stock
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})