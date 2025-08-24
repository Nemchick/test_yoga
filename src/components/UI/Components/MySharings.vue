<template>
  <section class="section section--sharing" v-if="localLoading">
    <LoaderComponent />
  </section>
  <section class="section section--sharing" v-else-if="sharings.length < 3">
    <div class="container">
      <div class="sharing__wrapper">
        <h3 class="sharing__title">Дневник эмоций</h3>
        <div class="sharing__description">
          <div class="icon__wrapper"><i class="icon-activity"></i></div>
          <p>
            Здесь будет отображаться динамика ваших чувств и эмоций. Не
            забывайте делиться впечатлениями после каждого занятия
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="section section--sharing" v-else>
    <div class="container">
      <div class="sharing__wrapper">
        <h3 class="sharing__title">Дневник эмоций</h3>
        <div class="sharing__graph">
          <SharingChart :labels="chartLabels" :datasets="chartDatasets" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SharingChart from '@/components/Cabinet/SharingChart.vue'
import { parseJSON, format } from 'date-fns'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
export default {
  name: 'MySharings',
  components: {
    LoaderComponent,
    SharingChart,
  },
  data() {
    return {
      localLoading: true,
      sharings: null,
    }
  },
  methods: {
    getSharings() {
      this.localLoading = true
      this.$http
        .get('/api/user/sharing')
        .then((res) => res.json())
        .then((sharingInfo) => {
          this.sharings = sharingInfo
        })
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  mounted() {
    this.getSharings()
  },
  computed: {
    chartLabels() {
      return this.sharings.map((x) => {
        const dateParsed = parseJSON(x.ect)
        return format(dateParsed, 'dd.MM')
      })
    },
    chartDatasets() {
      const physicalData = []
      const mentalData = []
      const emotionalData = []
      this.sharings.forEach((x) => {
        physicalData.push(x.physical)
        mentalData.push(x.mental)
        emotionalData.push(x.emotional)
      })
      // prepare ds for physical line
      const physicalDS = {
        label: 'Ощущения',
        backgroundColor: '#59CA56',
        borderColor: '#59CA56',
        data: physicalData,
      }
      const mentalDS = {
        label: 'Мысли',
        backgroundColor: '#009FF5',
        borderColor: '#009FF5',
        data: mentalData,
      }
      const emotionalDS = {
        label: 'Чувства',
        backgroundColor: '#B240EB',
        borderColor: '#B240EB',
        data: emotionalData,
      }
      return [physicalDS, mentalDS, emotionalDS]
    },
  },
}
</script>

<style scoped></style>
