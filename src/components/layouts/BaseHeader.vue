<template>
  <div class="header">
    <div class="header-left">
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
import { toggleDark } from "~/composables";
</script>

<style>
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
