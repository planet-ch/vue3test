<template>
  <el-config-provider namespace="ep">
    <div class="flex main-side-container">
      <BaseSide />
      <div class="flex main-container">
        <BaseHeader />
        <div class="router-wrap">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<script lang="js">
  document.title = '吾股中台'
</script>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-side-container{
  height: 100vh;
}

.main-container {
  display: flex;
  flex-flow: column;
  width: calc(100vw - 180px);
  height: 100vh;
}

.router-wrap{
  width: 100%;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding: 0 20px;
  overflow-y: auto;
  background: var(--globalBackground);
}
</style>
