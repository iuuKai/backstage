<template>
  <div style="height: 100%" ref="echart"></div>
</template>

<script>
import { mapState } from 'vuex'
import * as echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Object,
      default () {
        return {
          xData: [],
          series: []
        }
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.resizeChart)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    initChart () {
      this.initChartData()
      if (!this.echart) {
        this.echart = echarts.init(this.$refs.echart)
      }
      this.echart.setOption(this.options)
    },
    initChartData () {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.xAxis.boundaryGap = this.isBoundaryGap
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    },
    resizeChart () {
      if (this.echart) this.echart.resize()
    }
  },
  computed: {
    options () {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    isAxisChart () {
      return !!this.chartData.xData
    },
    isBoundaryGap () {
      return this.chartData.series.findIndex(({ type }) => type === 'bar') !== -1
    },
    ...mapState({
      isCollapse: state => state.tab.isCollapse
    })
  },
  watch: {
    chartData: {
      handler () {
        this.initChart()
      },
      deep: true
    },
    isCollapse () {
      setTimeout(() => {
        this.resizeChart()
      }, 200)
    }
  },
  data () {
    return {
      echart: null,
      axisOption: {
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: []
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [],
        // 图表配置
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '15%',
          right: '5%'
        }
      },
      normalOption: {
        series: [],
        // 图表配置
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        tooltip: {
          trigger: 'item'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
