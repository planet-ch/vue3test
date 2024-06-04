<template>
  <el-table id="index" border stripe fit v-loading="loading" :data="listData" style="position: static;">
    <el-table-column v-for="(item) in columns" :prop="item" :label="item" min-width="150">
      <template #default="scope">
        <div v-html="getCellData(scope.row, item)"></div>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination" v-if="paginationData.total > 10">
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :background="true"
        :small="true"
        :layout="isPc ? 'total, sizes, prev, pager, next, jumper' : 'pager, next'"
        :total="paginationData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import {computed, defineProps, ref} from 'vue';
import {useStore} from "vuex";
import {useRoute} from "vue-router";

const isPc = window.screen.width > 640
const store = useStore()
const route = useRoute()
const props = defineProps(['data', 'columns', 'defaultProps', 'condition']);
const currentPage = ref(1)
const selection = ref([])
const pageSize = ref(10)

const loading = ref(false)

const getCellData = (cellData, key) => {
  const defaultKeys = ['吾股排名变化']
  const findIndex = defaultKeys.findIndex(item => key.includes(item))
  const value = cellData[key]
  if (findIndex > -1) {
    const numValue = String(value).match(/\d+/g)
    console.log(numValue, '?');
    const arrow = cellData[key] <= 0 ? `<b style="color: red;">↑</b>` : `<b style="color: green;">↓</b>`
    return `<span>${numValue[0]} ${arrow}</span>`
  }
  return `<span>${value}</span>`
}

const searchFetch = (value) => store.dispatch('stock/updateTableData', {value})
const listData = computed(() => {
  return JSON.parse(props.data)
})
const paginationData = computed(() => {
  const condition = JSON.parse(props.condition)
  return {
    total: condition.total
  }
})
const handleSizeChange = (val) => {
  loading.value = true
  currentPage.value = 1
  pageSize.value = val
  const condition = JSON.parse(props.condition)
  const params = {
    text: route.query.keywords,
    classify: route.meta.classify,
    page: 1,
    page_size: val,
    tableLoading: true,
    condition: {
      condition: JSON.parse(condition.condition),
      table: condition.table
    }
  }
  searchFetch(params).then(() => loading.value = false).catch(() => loading.value = false)
}
const handleCurrentChange = (val) => {
  loading.value = true
  currentPage.value = val
  const condition = JSON.parse(props.condition)
  const params = {
    text: route.query.keywords,
    classify: route.meta.classify,
    page: val,
    page_size: pageSize.value,
    tableLoading: true,
    condition: {
      condition: JSON.parse(condition.condition),
      table: condition.table
    }
  }
  searchFetch(params).then(() => loading.value = false).catch(() => loading.value = false)

}
const handleSelectionChange = (val) => {

}

// const filterNumber = (cor, column, cellValue, index) => {
//   function isNumeric(cellValue) {
//     return !isNaN(parseFloat(cellValue)) && isFinite(cellValue);
//   }
//
//   if (isNumeric(cellValue)) {
//     console.log(cor, column);
//     cellValue = parseFloat(cellValue)
//   }
//   return cellValue
// }
</script>

<style scoped lang="scss">
.pagination{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  >div{
    display: flex;
    flex-wrap: wrap;
  }
}
</style>