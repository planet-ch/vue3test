<template>
  <div :class="['page-container', { 'no-data': result.status === 2 }]" v-loading="loading" >
    <div v-if="result.status === 1">
      <div class="card-box" v-show="!!searchValue && !loading">
        <div class="title">
          <el-divider direction="vertical" class="blue" />
          <h3>已选条件</h3>
          <div class="box-item" v-if="!!result.prompt">
            <el-popover placement="right" :width="400" trigger="hover">
              <template #reference>
                <el-icon><WarningFilled /></el-icon>
              </template>
              <div>
                <p v-for="(item, index) in result.prompt">{{ index + 1 }}. {{ item }}</p>
              </div>
            </el-popover>
          </div>
        </div>
        <div class="tags">
          <el-tag
              v-for="item in result.condition"
              :key="item"
              class="mx-1"
              effect="plain"
          >
            {{ item }}
          </el-tag>
        </div>
      </div>
      <div class="answer-wrapper" v-show="!!searchValue && !loading" element-loading-text="Loading...">
        <wg-tables :key="searchValue" :data="JSON.stringify(result.list)" :defaultProps="defaultProps" :condition="JSON.stringify(result.condition || {})"/>
      </div>
    </div>
    <el-empty v-else-if="result.status === 2 && !loading" description="暂无数据～" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts';
import {WarningFilled} from "@element-plus/icons-vue";
const now = new Date()
const store = useStore()
const result = computed(() => store.state.stock.stockIndexResult)
const loading = computed(() => store.state.stock.loading)
const searchValue = computed(() => store.state.stock.searchValue)
const deleteRow = (index) => {
  result.value.splice(index, 1)
}
const defaultProps = reactive({
  deleteRow
})
</script>

<style scoped>
.answer-wrapper{
  width: 100%;
}
.answer-text{
  text-align: left;
  text-indent: 2em;
}
#echarts{
  width: 100%;
  height: 400px;
}
</style>

<style lang="scss">
.box-item{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
  .demo{
    list-style: none;
    li {
      text-align: center;
    }
  }
}
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