<template>
  <div class="page-container" v-loading="loading" >
    <div class="card-box header-wrap" v-show="!!searchValue && !loading">
      <h2>方大集团（{{searchValue}}）</h2>
    </div>
    <div class="card-box" v-show="!!searchValue && !loading">
      <div class="title">
        <el-divider direction="vertical" class="blue" />
        <h2>简介和看点</h2>
      </div>
      <div class="answer-text" v-show="!!searchValue">
        方大集团股份有限公司的主营业务为高端幕墙系统及材料产业、轨道交通屏蔽门设备产业、新能源产业、房地产等业务。主要产品有智慧节能幕墙、光电幕墙、LED彩显幕墙等各类建筑幕墙、PVDF铝板、石墨烯铝板、纳米铝板材料。公司荣获全国工商联“抗击新冠肺炎疫情先进民营企业”,“广东省抗击新冠肺炎疫情突出贡献民营企业”,“抗击疫情赣商在行动”最美企业称号,2020中国企业慈善公益500强,江西省“千企帮千村”精准扶贫行动先进民营企业,连续3年荣登“中国A股上市公司创新指数500强”榜单,蝉联“广东省制造业500强”,荣获“深圳老字号”,深圳特区40周年“最具潜力50家上市公司”,连续三年获评“履行社会责任杰出企业”。“方大(FANGDA)”品牌被授予“国际信誉品牌”,连续六次摘得“深圳知名品牌”荣誉称号。熊建明董事长荣获“2020中国慈善企业家”,“2020金质量卓越企业家奖”,“献礼特区40年致敬品牌40人”殊荣。
      </div>
    </div>
    <div class="card-box"  v-show="!!searchValue && !loading">
      <div class="title">
        <el-divider direction="vertical" class="blue" />
        <h2>财务数据</h2>
      </div>
      <div class="answer-wrapper" v-show="!!searchValue" element-loading-text="Loading...">
        <el-table border stripe :data="result" style="position: static;" max-height="80vh" v-if="result.length > 0">
          <el-table-column v-for="(item, index) in Object.keys(result[0] || [])" :prop="item" :label="item" width="150" :fixed="index === 0" />
        </el-table>
      </div>
    </div>
    <div class="card-box" :style='{opacity: (!!searchValue && !loading) ? 1 : 0}'>
      <div class="title">
        <el-divider direction="vertical" class="blue" />
        <h2>利润率</h2>
      </div>
      <div id="echarts"></div>
    </div>
  </div>

</template>

<script lang="js">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts';
export default {
  setup () {
    const now = new Date()
    const store = useStore()
    const result = computed(() => store.state.stock.result)
    const loading = computed(() => store.state.stock.loading)
    const searchValue = computed(() => store.state.stock.searchValue)
    const deleteRow = (index) => {
      result.value.splice(index, 1)
    }

    onMounted(() => {

      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('echarts'));
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['毛利率', '净利率', '经营调整营业利润率']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (value) => {
              return value + '%';
            }
          }
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    })

    return {
      result,
      deleteRow,
      loading,
      searchValue
    }
  }
}
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