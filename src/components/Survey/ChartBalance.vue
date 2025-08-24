<template>
  <PolarArea
    id="balanceWheel"
    ref="bar"
    :options="chartOptions"
    :data="chartData"
    :width="width"
    :height="height"
  />
</template>

<script>
import { PolarArea } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'

ChartJS.register(ArcElement, RadialLinearScale, Tooltip)

export default {
  name: 'PolarAreaChart',
  components: {
    PolarArea,
  },
  props: {
    balanceData: {
      type: Array,
      default: () => [2, 3, 5, 6, 6, 10, 5, 1],
    },
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          'Физическое здоровье',
          'Эмоции',
          'Финансы',
          'Соц. реализация',
          'Отношения',
          'Развлечения и отдых',
          'Личностный рост',
          'Духовный рост',
        ],
        datasets: [
          {
            data: this.balanceData,
            backgroundColor: [
              '#E6434F',
              '#FF7043',
              '#F2A33C',
              '#C0CA33',
              '#59CA56',
              '#009FF5',
              '#1570F0',
              '#B240EB',
            ],
            hoverBackgroundColor: [
              '#E6434F',
              '#FF7043',
              '#F2A33C',
              '#C0CA33',
              '#59CA56',
              '#009FF5',
              '#1570F0',
              '#B240EB',
            ],
          },
        ],
      },
      chartOptions: {
        elements: {
          arc: {
            borderWidth: 1,
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuad',
        },
        responsive: true,
        scale: {
          display: false,
          ticks: {
            min: 0,
            max: 10,
            stepSize: 10,
            display: false,
          },
        },
        scales: {
          r: {
            display: false,
            pointLabels: {
              display: true,
              centerPointLabels: true,
            },
          },
        },
      },
    }
  },
}
</script>

<style scoped></style>
