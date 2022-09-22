<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

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
      chartSerieDatas: [],
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
            weekday: 'long'
          })
        )
      }
      this.daysInTheLastWeek = daysInTheLastWeek
    },
    setChartSerieDatas() {
      this.chartSerieDatas = this.chartData.map(chartData => {
        const chartSerieDataValues = []
        this.daysInTheLastWeek
          .forEach(dayInTheLastWeek => {
            const chartSerieData = chartData.data.find(chartData =>
              chartData.dayInTheLastWeek === dayInTheLastWeek)
            chartSerieDataValues.push(chartSerieData ? chartSerieData.value : 0)
          })
        return {
          name: chartData.name,
          value: chartSerieDataValues
        }
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setChartSerieDatas()
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: this.daysInTheLastWeek
            .map(dayInTheLastWeek => {
              return {
                name: dayInTheLastWeek,
                max: 500
              }
            })
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.chartData.map(chartData => chartData.name)
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: this.chartSerieDatas,
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
