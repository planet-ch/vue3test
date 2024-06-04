import { createRouter, createWebHistory } from 'vue-router'
import Answer from '@/pages/answer.vue'
import Stock from '@/pages/stock.vue'
import StockIndex from '@/pages/stockIndex.vue'
import Index from '@/pages/index.vue'
import Live from '@/pages/live/index.vue'

const routes = [
    { path: '/', component: Index, name: 'index', meta: { title: '首页', classify: '1' } },
    { path: '/stock', component: Stock, name: 'stock', meta: { title: 'A股', classify: '1' } },
    { path: '/stockIndex', component: StockIndex, name: 'stockIndex', meta: { title: '指数', classify: '2' } },
    { path: '/live', component: Live, name: 'live', meta: { title: '直播' } }
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default router