

<template>
  <div :class="['menu', { 'blackMenu': isDark, 'close': isClose }]" @click="() => toggleClose(!isClose)">
    <div class="inner">
      <span></span>
    </div>
  </div>
  <div :class="['menuWrapBox', { 'open': isClose, 'black': isDark }]">
    <div :class="['menuWrap', { 'open': isClose }]">
      <template v-for="(menu, index) in menus">
        <div :class="['homeMenu', { 'current': activeIndex === index }]" @click="() => menuClick(menu)">{{ menu.name }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import { menus } from '@/config/menus'
const { isDark } = defineProps(['isDark'])

const isClose = ref(false)
const activeIndex = ref('0');
const route = useRoute()
const store = useStore()
const router = useRouter()
const toggleClose = (flag) => {
  isClose.value = flag
}
const menuClick = (menu) => {
  store.commit('stock/clearAll')
  toggleClose(false)
  router.push(menu.path)
}
watch(() => route.path, (v) => {
  const index = menus.value.findIndex((item) => item.path === v)
  activeIndex.value = index === -1 ? 0 : index
})
</script>

<style scoped lang="scss">
.menu{
  float: right;
  width: 50px;
  height: 50px;
  /*background: url("https://static-1253442168.file.myqcloud.com/xupload/20210402_menu.png") no-repeat center;*/
  background-size: 24px 24px;
  position: relative;
  transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-right: 1px;
  .inner{
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 22px;
    height: 20px;
    span{
      top: 50%;
      margin-top: -1px;
    }
    &::before{
      top: 0;
    }
    &::after {
      bottom: 0;
    }
    &::before{
      top: 0;
    }
  }
  .inner span, .inner::before, .inner::after{
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: #FFF;
    position: absolute;
    transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &.close{
    .inner span{
      opacity: 0;
    }
    .inner::before{
      transform: translateY(9px) rotate(45deg);
    }
    .inner::after {
      transform: translateY(-9px) rotate(-45deg);
    }
  }
}
.menu.blackMenu .inner span, .menu.blackMenu .inner::before, .menu.blackMenu .inner::after{
  background: #000;
}

.menuWrapBox{
  display: none;
  opacity: 0;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  &.open{
    display: block;
    opacity: 1;
  }
  .menuWrap{
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100vh;
    max-height: 100vh;
    opacity: 0;
    background: var(--globalBackground);
    transition: all .4s;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    &.open{
      opacity: 1;
      width: 50%;
      padding: 20px 0;
    }
  }

  .homeMenu{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 15px;
    color: var(--fontColor);
    text-align: center;
    font-weight: 400;
    margin-top: 30px;
    &.current{
      color: var(--fontHoverColor);
    }
  }
}
</style>