<template>
  <div class="graph__wrapper">
    <i class="icon-arrow-left add-pointer" @click="panChart(1)" />
    <div
      style="
        background-color: #f7fafb;
        border-radius: 24px;
        width: 100%;
        max-width: 100%;
      "
    >
      <div class="sharing-tags__wrapper">
        <div
          class="sharing-tag green"
          :class="{ disabled: feelsDisabled }"
          @click="showHideLine('Ощущения')"
        >
          <i class="icon-close" />
          Ощущения
        </div>
        <div
          class="sharing-tag blue"
          :class="{ disabled: thoughtsDisabled }"
          @click="showHideLine('Мысли')"
        >
          <i class="icon-close" />
          Мысли
        </div>
        <div
          class="sharing-tag purple"
          :class="{ disabled: feelingsDisabled }"
          @click="showHideLine('Чувства')"
        >
          <i class="icon-close" />
          Чувства
        </div>
      </div>
      <LineChartGenerator
        :data="chartData"
        :options="options"
        :plugins="plugins"
        ref="myChart"
        :key="id"
      />
    </div>
    <i class="icon-arrow-right add-pointer" @click="panChart(-1)" />
  </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom'
import sharing1 from '@/assets/sharing-logos/sharing_1.svg'
import sharing2 from '@/assets/sharing-logos/sharing_2.svg'
import sharing3 from '@/assets/sharing-logos/sharing_3.svg'
import sharing4 from '@/assets/sharing-logos/sharing_4.svg'
import sharing5 from '@/assets/sharing-logos/sharing_5.svg'

import {
  Chart as ChartJS,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Tooltip,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  zoomPlugin
)

const sharingImage1 = new Image()
sharingImage1.src = sharing1

const sharingImage2 = new Image()
sharingImage2.src = sharing2

const sharingImage3 = new Image()
sharingImage3.src = sharing3

const sharingImage4 = new Image()
sharingImage4.src = sharing4

const sharingImage5 = new Image()
sharingImage5.src = sharing5

const image = [
  sharingImage1,
  sharingImage2,
  sharingImage3,
  sharingImage4,
  sharingImage5,
]

const imageItems = {
  id: 'imageItems',
  beforeDatasetsDraw(chart) {
    const {
      ctx,
      scales: { y },
      width,
    } = chart
    ctx.save()
    const isMobile = width < 400
    image.forEach((image, id) => {
      if (isMobile && id % 2 === 0) {
        ctx.drawImage(image, 10, y.getPixelForValue(id + 1) - 10, 15, 15)
      } else if (!isMobile) {
        ctx.drawImage(image, 0, y.getPixelForValue(id + 1) - 15, 30, 30)
      }
    })
    if (isMobile) {
      ChartJS.defaults.font.size = 8
    } else {
      ChartJS.defaults.font.size = 14
    }
  },
}

var chartInstance = null

const zoomItems = {
  id: 'zoomItems',
  afterRender(chart) {
    if (!chart.$rendered) {
      chart.$rendered = true
      // do whatever you want for the first render ...
      const paned = {
        x: -1000,
      }
      chart.pan(paned, undefined, 'default')
      chartInstance = chart
    }
  },
}

export default {
  name: 'LineChart',
  data() {
    return {
      id: 0,
      localDatasets: this.datasets,
      plugins: [imageItems, zoomItems],
      options: {
        responsive: true,
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            mode: 'x',
            limits: {
              y: { min: 1, max: 5 },
            },
          },
          tooltip: {
            yAlign: 'bottom',
            usePointStyle: true,
            backgroundColor: '#FFFFFF',
            callbacks: {
              title: () => {
                return ''
              },
              label: () => {
                return ' '
              },
              labelPointStyle: (context) => {
                const { raw } = context
                return {
                  pointStyle: image[raw - 1],
                }
              },
            },
          },
        },
        tension: 0.5,
        layout: {
          padding: {
            left: 30,
            top: 20,
          },
        },
        scales: {
          x: {
            min: 0,
            max: 4,
            grid: {
              display: true,
            },
          },
          y: {
            min: 1,
            max: 6,
            grid: {
              display: true,
            },
            ticks: {
              // clear label
              callback: () => '',
            },
          },
        },
      },
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: this.localDatasets,
      }
    },
    feelsDisabled() {
      return this.isLineDisabled('Ощущения')
    },
    thoughtsDisabled() {
      return this.isLineDisabled('Мысли')
    },
    feelingsDisabled() {
      return this.isLineDisabled('Чувства')
    },
  },
  components: {
    LineChartGenerator,
  },
  props: {
    labels: {
      type: Array,
      required: true,
    },
    datasets: {
      type: Array,
      required: true,
    },
  },
  methods: {
    panChart(value) {
      chartInstance.pan({ x: value * 100 }, undefined, 'default')
    },
    showHideLine(lineName) {
      const val = this.localDatasets.find((x) => x.label === lineName)
      val.hidden = !val.hidden
      this.$set(this.localDatasets, this.localDatasets.indexOf(val), val)
      this.id++
    },
    isLineDisabled(lineName) {
      const val = this.localDatasets.find((x) => x.label === lineName)
      return val.hidden
    },
  },
}
</script>

<style scoped>
.chartWrapper {
  position: relative;
  overflow: auto;
  width: 100%;
}

chartContainer {
  position: relative;
  height: 300px;
}
</style>
