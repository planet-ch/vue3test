<template>
  <div class="menu-wrap">
    <div class="logo">
      <img :src="logoSrc" alt="吾股中台">
      <h3>吾股中台</h3>
    </div>
    <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        :default-active="activeIndex"
    >
      <el-menu-item v-for="(item, index) in menus" :index="String(index)" @click="() => menuClick(item.path, index)">
        <el-icon :size="fontSize">
          <component :is="item.icon" />
        </el-icon>
        <template #title><span>{{ item.name }}</span></template>
      </el-menu-item>
    </el-menu>
<!--    <div class="collapse-wrap" @click="toggle">-->
<!--      {{ isCollapse ? '展开' : '收起' }}-->
<!--    </div>-->
  </div>
</template>


<script lang="ts" setup>
import { ref, shallowRef, watch, computed } from "vue";
import { isDark } from "~/composables";
import { useRouter, useRoute } from 'vue-router'
import {
  House,
  Money,
  Coin
} from "@element-plus/icons-vue";

// 实时计算tooltip显示条件，目前只有activated
const logoSrc = computed(() => {
  return isDark.value ? new URL('@/assets/img/wogoo_dark.png', import.meta.url).href : new URL('@/assets/img/wogoo.png', import.meta.url).href
})

const menus = ref([
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
    name: '指数',
    icon: shallowRef(Coin),
    path: '/stockIndex'
  }
])
const isCollapse = ref(false);
const fontSize = 22
const route = useRoute()
const activeIndex = ref('0');
watch(() => route.path, (v) => {
  const index = menus.value.findIndex((item) => item.path === v)
  activeIndex.value = index === -1 ? '0' : String(index)
})
const router = useRouter()
const handleOpen = (key: string, keyPath: string[]) => {
};
const handleClose = (key: string, keyPath: string[]) => {
};
const toggle = () => {
  isCollapse.value = !isCollapse.value
}
const menuClick = (key, index) => {
  activeIndex.value = index
  router.push(key)
}
</script>

<style lang="scss" scoped>
.menu-wrap{
  display: flex;
  flex-flow: column;
  background: var(--menuWrapBackground);
  .logo{
    width: 100%;
    height: 80px;
    background: var(--menuWrapBackground);
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      display: block;
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }
}
</style>

<style lang="scss">
.menu-wrap{
  display: flex;
  position: relative;
  z-index: 1000;
  width: 180px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.15);
  .ep-menu{
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    border: none;
    .ep-menu-item{
      cursor: pointer;
      font-size: 18px;
      padding-left: 30px !important;
      span{
        margin-left: 8px;
      }
      &.is-active{
        color: #fff;
        background: var(--menuActiveBackground);
      }
    }
  }
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.collapse-wrap{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  &:hover{
    outline: none;
    color: var(--ep-menu-hover-text-color);
    background-color: var(--ep-menu-hover-bg-color);
  }
}
</style>
