<template>
  <el-config-provider namespace="ep" :locale="locale">
    <div class="flex main-side-container">
      <BaseHeader />
      <div class="flex main-container">
        <BaseSide />
        <div class="router-wrap">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    document.title = '吾股中台2222'
    return {
      locale: zhCn,
    }
  },
})
</script>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-side-container{
  display: flex;
  flex-direction: column;
  /*height: 100vh;*/
  height: calc(100vh - 64px);
}

.main-container {
  display: flex;
  /*flex-flow: column;*/
  /*width: calc(100vw - 180px);*/
  width: calc(100vw);
  height: 100vh;
}

.router-wrap{
  width: calc(100% - 180px);
  height: calc(100vh - 64px);
  box-sizing: border-box;
  padding: 0 20px;
  overflow-y: auto;
  background: var(--globalBackground);
}
@media  (max-width: 640px){
  .router-wrap{
    width: 100%;
  }
}
</style>
