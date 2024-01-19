
<template>
  <div class="card-box" v-for="({ data, columns, ...other } , index) in tableList">
    <wg-table :key="index" :data="data" :columns="columns" :defaultProps="defaultProps" :condition="returnPageData(other)" />
  </div>
</template>

<script setup>
import { defineProps, computed, watch, toRefs } from 'vue';
const props = defineProps(['data','defaultProps', 'condition']);
const tableList = computed(() => {
  // 后端目前没做分页，返回数据会有几万条，直接传递会造成性能问题，转字符串后传递
  const arrayData = JSON.parse(props.data)
  // 代表有几个表格
  const tableListArray = arrayData.map(list => {
    return {
      data: JSON.stringify(list.value),
      columns: Object.keys(list.value[0]),
      table: list.index,
      total: list.total
    }
  })
  return tableListArray
})

const returnPageData = (other) => {
  console.log(props.condition, 'props.condition', other);
  return JSON.stringify({
    condition: props.condition,
    ...other
  })
}
</script>

<style scoped lang="scss">

</style>