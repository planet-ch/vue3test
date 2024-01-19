<template>
  <el-tooltip
      ref="popperRef"
      trigger="click"
      content="Bottom center"
      placement="bottom"
      effect="light"
      popper-class="wg-search"
      @before-show="onSuggestionShow"
      :visible="suggestionVisible"
  >
    <el-input
        ref="inputRef"
        v-model="keywords"
        class="search-input"
        placeholder="请输入你要查询的关键字"
        :suffix-icon="Search"
        @keydown.enter="keywordsChange"
        @input="handleInput"
        @mousedown="handleMouseDown"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="close"
    />
    <template #content>
      <el-scrollbar max-height="400px" ref="listRef">
        <div class="wg-search-dropdown" :style="{width: dropdownWidth}">
          <div class="wg-recommend-list">
            <div class="title">
              <span>推荐问句</span>
              <el-icon :size="18">
                <GoldMedal/>
              </el-icon>
            </div>
            <div class="list">
              <p :key="index" @click="handleRecommendClick(item)" v-for="(item, index) in recommend">{{ item }}</p>
            </div>
          </div>
          <div class="wg-history-list" v-show="historyList.length > 0">
            <div class="title">
              <span>历史问句</span>
              <el-popconfirm
                  :teleported="false"
                  width="240px"
                  confirm-button-text="是"
                  cancel-button-text="否"
                  title="您确认要清空历史问句吗？"
                  @confirm="deleteAll"
              >
                <template #reference>
                  <el-icon style="cursor: pointer" :size="18">
                    <Delete/>
                  </el-icon>
                </template>
              </el-popconfirm>

            </div>
            <div class="list">
              <p :key="index" @click.stop="handleHistoryClick(item)" v-for="(item, index) in historyList">{{ item }}</p>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </template>
  </el-tooltip>

</template>

<script setup>
const HISTORY_KEY = 'WG/ADMIN/SEARCH/HISTORY/KEY'
const MAX_HISTORY_COUNT = 10
import {computed, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {onClickOutside} from '@vueuse/core'
import {
  Delete, GoldMedal,
  Search
} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import {useRoute, useRouter} from 'vue-router'
import random from 'lodash/random';

let ignoreFocusEvent = false

const store = useStore()
const keywords = ref('')
const inputRef = ref()
const popperRef = ref()
const listRef = ref()
const activated = ref(false)
const dropdownWidth = ref('')
const historyList = ref([])
const route = useRoute()
const router = useRouter()
const recommend = ref([
  '最近三年累计现金分红金额低于最近三年年均净利润30%',
  '贵州茅台去年三季报的十大股东和净利润',
  '净利润涨幅超0.3'
])
/* 历史记录相关操作 */
const getHistory = () => {
  const history = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || '[]')
  return history
}
const addHistory = (keyword) => {
  let history = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || '[]')
  const inHistoryIndex = history.findIndex(h => h === keyword)
  if (inHistoryIndex > -1) {
    history.splice(inHistoryIndex, 1)
  }
  history.unshift(keyword)
  const result = [...new Set(history.splice(0, MAX_HISTORY_COUNT))]
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(result))
}
const deleteAll = () => {
  window.localStorage.setItem(HISTORY_KEY, '[]')
  historyList.value = getHistory()
  // nextTick 和 200ms都不行，应该是有动画没结束导致无法聚焦
  setTimeout(() => {
    inputRef.value.focus()
  }, 300)
}

/* 点击历史记录 */
const handleHistoryClick = (key) => {
  keywords.value = key
  keywordsChange(key)
  close()
}

/* 点击推荐问句 */
const handleRecommendClick = (key) => {
  keywords.value = key
  keywordsChange(key)
  close()
}

/* 搜索相关操作 */

watch(() => route.query, (v) => {
  if (JSON.stringify(route.query) !== '{}') {
    if (route.query.keywords && route.query.classify) {
      // 有参数就请求
      const params = {
        text: route.query.keywords,
        classify: route.meta.classify,
        page: 1,
        page_size: 10
      }
      keywords.value = params.text
      addHistory(keywords.value)
      searchFetch(params)
    }
  } else {
    keywords.value = ''
  }
})

const searchFetch = (value) => store.dispatch('stock/search', {value})
const keywordsChange = () => {
  console.log(3);
  if (keywords.value.length === 0) {
    ElMessage({
      message: '请输入有效内容查询',
      type: 'warning',
    })
    return
  }
  router.replace({
    name: route.name,
    query: {
      keywords: keywords.value,
      classify: route.meta.classify,
      sj: random(0, 10000000)
    }
  })
}

/* 弹窗展开之前操作 1. 刷新历史记录列表 2. 同步最新inputk宽度 */
const onSuggestionShow = () => {
  historyList.value = getHistory()
  let inputWidth = '100%'
  try {
    inputWidth = inputRef.value.$el.offsetWidth
  } catch (e) {
    console.log(e);
  }
  if (suggestionVisible.value) {
    dropdownWidth.value = `${inputWidth}px`
  }
}

// 实时计算tooltip显示条件，目前只有activated
const suggestionVisible = computed(() => {
  return activated.value
})

/* input组件相关事件 大多为了处理tooltip的显示条件 */
const handleMouseDown = (event) => {
  if (
      (event.target)?.tagName !== 'INPUT'
  ) {
    activated.value = true
  }
}
const handleFocus = () => {
  if (keywords.value.length > 0) {
    activated.value = false
    return
  }
  activated.value = true
}
const close = () => {
  activated.value = false
}
const handleBlur = (evt) => {
  setTimeout(() => {
    // validate current focus event is inside el-tooltip-content
    // if so, ignore the blur event and the next focus event
    if (popperRef.value?.isFocusInsideContent()) {
      ignoreFocusEvent = true
      return
    }
    activated.value && close()
  })
}
const handleInput = (v) => {
  activated.value = !Boolean(v.length)
}

onClickOutside(inputRef, (e) => {
  // 判断点击落点是否在popperRef元素之内, 不在的直接关闭弹窗
  const outside = !popperRef.value?.isFocusInsideContent()
  outside && close()
})
</script>

<style lang="scss" scoped>
.search-input {
  width: 90%;
  height: 66%;
}
</style>

<style lang="scss">
.search-input {
  .ep-input {
    height: 100%;
  }

  .ep-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px var(--fontHoverColor) inset !important;
  }
}

.wg-search {
  background: var(--wgSearch) !important;

  &.ep-popper {
    padding: 8px 0 !important;
  }
}

.wg-search-dropdown {
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: 14px;

  .wg-recommend-list {
    margin-bottom: 20px;

    .title {
      justify-content: start;
    }
  }

  .wg-history-list {
    .title {
      justify-content: space-between;
    }
  }

  .title {
    width: 100%;
    display: flex;
    align-items: center;
    color: #999;
    margin-bottom: 6px;
  }

  .list {
    p {
      color: var(--fontColor);
      cursor: pointer;
      line-height: 30px;

      &:hover {
        color: var(--fontHoverColor);
      }
    }
  }
}
</style>