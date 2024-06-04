import {ref, shallowRef} from "vue";
import {Coin, House, Money, VideoCamera} from "@element-plus/icons-vue";

export const menus = ref([
    {
        name: '首页',
        icon: shallowRef(House),
        path: '/'
    },
    {
        name: 'A股',
        icon: shallowRef(Money),
        path: '/stock'
    },
    {
        name: '板块',
        icon: shallowRef(Coin),
        path: '/stockIndex'
    },
    {
        name: '直播',
        icon: shallowRef(VideoCamera),
        path: '/live'
    }
])