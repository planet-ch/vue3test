import { createRouter, createWebHistory } from 'vue-router'
import Answer from '@/pages/answer.vue'
import Stock from '@/pages/stock.vue'
import StockIndex from '@/pages/stockIndex.vue'
import Index from '@/pages/index.vue'

const routes = [
    { path: '/', component: Index },
    { path: '/stock', component: Stock },
    { path: '/stockIndex', component: StockIndex }
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default router