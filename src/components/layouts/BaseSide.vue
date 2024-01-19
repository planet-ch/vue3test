<template>
  <div class="menu-wrap pc">
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
import { useRouter, useRoute } from 'vue-router'
import {
  House,
  Money,
  Coin
} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import { menus } from '@/config/menus'
const isCollapse = ref(false);
const fontSize = 22
const route = useRoute()
const store = useStore()
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
  store.commit('stock/clearAll')
  activeIndex.value = index
  router.push(key)
}
</script>

<style lang="scss" scoped>
.menu-wrap{
  display: flex;
  flex-flow: column;
  background: var(--menuWrapBackground);
}
</style>

<style lang="scss">
.menu-wrap{
  display: flex;
  position: relative;
  z-index: 998;
  width: 180px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.15);
  padding-top: 10px;
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
