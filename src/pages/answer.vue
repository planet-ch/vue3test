<template>
  <div class="answer-wrapper" v-loading="loading" element-loading-text="Loading...">
    <el-table border stripe :data="result" style="width: auto" max-height="80vh" v-if="result.length > 0">
      <el-table-column v-for="item in Object.keys(result[0] || [])" :prop="item" :label="item" width="150" />
    </el-table>
  </div>
</template>

<script lang="js">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const now = new Date()
    const store = useStore()
    const result = computed(() => store.state.stock.result)
    const loading = computed(() => store.state.stock.loading)

    const deleteRow = (index) => {
      result.value.splice(index, 1)
    }

    return {
      result,
      deleteRow,
      loading
    }
  }
}
</script>

<style scoped>
.answer-wrapper{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}
</style>

<style lang="scss">
.answer-wrapper{
  .ep-table__body-wrapper{
    .ep-scrollbar{
      .ep-scrollbar__view{
        display: block !important;
      }
    }
  }
}
</style>