<template>
  <div class="header pc" v-if="isPc">
    <div class="header-left">
      <div class="logo">
        <img :src="logoSrc" alt="吾股中台">
        <h3>吾股中台</h3>
      </div>
    </div>
    <div class="header-middle">
      <wg-search />
    </div>
    <div class="header-right">
      <button
          @click="toggleDark()"
          class="border-none w-full bg-transparent cursor-pointer"
          style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-sunny ep-moon" />
      </button>
    </div>
  </div>
  <div class="header mobile" v-else>
    <div class="header-left">
      <div class="logo">
        <mobile-menu :is-dark="!isDark" />
      </div>
    </div>
    <div class="header-middle">
      <wg-search />
    </div>
    <div class="header-right">
      <button
          @click="toggleDark()"
          class="border-none w-full bg-transparent cursor-pointer"
          style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-sunny ep-moon" />
      </button>
    </div>
  </div>
</template>

<script lang="js" setup>
import { computed, ref } from "vue";
import { toggleDark, isDark } from "~/composables";
const isPc = window.screen.width > 640

// 实时计算tooltip显示条件，目前只有activated
const logoSrc = computed(() => {
  return isDark.value ? new URL('@/assets/img/wogoo_dark.png', import.meta.url).href : new URL('@/assets/img/wogoo.png', import.meta.url).href
})
</script>

<style lang="scss">

.mobile {
  .header-left {
    width: 60px;
    height: 100%;
    .logo{
      img{
        margin-right: 0;
      }
    }
  }
}
.header{
  display: flex;
  position: relative;
  top: 0;
  right: 0;
  z-index: 999;
  height: 64px;
  width: 100%;
  background: var(--headerBackground);
  box-shadow: var(--headerShadow);
}
.ep-menu--horizontal.ep-menu{
  border: none !important;
}
.header-left{
  width: 200px;
  height: 100%;
  .logo{
    width: 100%;
    height: 64px;
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
.header-middle{
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 64px;
}
.header-right{
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    outline: none;
    color: var(--ep-menu-hover-text-color);
    background-color: var(--ep-menu-hover-bg-color);
  }
}
</style>
