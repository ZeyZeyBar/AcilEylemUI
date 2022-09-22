<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      daysInTheLastWeek: [],
      chartDataSeries: [],
      chart: null
    }
  },
  watch: {
    chartData() {
      this.initChart()
    }
  },
  created() {
    this.getDaysInTheLastWeek()
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getDaysInTheLastWeek() {
      const daysInTheLastWeek = []
      const today = new Date()
      for (let i = 6; i >= 0; i--) {
        daysInTheLastWeek.push(
          new Date(
            new Date().setDate(
              today.getDate() - i
            )
          ).toLocaleDateString('tr-TR', {
            weekday: 'short'
          })
        )
      }
      this.daysInTheLastWeek = daysInTheLastWeek
    },
    setChartDataSeries() {
      this.chartDataSeries = this.chartData.map(chartData => {
        const chartDataSerie = Object.assign({
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          animationDuration
        }, chartData)
        const chartDataSerieDatas = []
        this.daysInTheLastWeek
          .forEach(dayInTheLastWeek => {
            const chartDataSerieData = chartDataSerie.data.find(chartDataSerieData =>
              chartDataSerieData.dayInTheLastWeek === dayInTheLastWeek)
            chartDataSerieDatas.push(chartDataSerieData ? chartDataSerieData.value : 0)
          })
        chartDataSerie.data = chartDataSerieDatas
        return chartDataSerie
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setChartDataSeries()
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.daysInTheLastWeek,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: this.chartDataSeries
      })
    }
  }
}
</script>
