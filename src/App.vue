<template>
  <router-view name="main" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainApp',
  metaInfo: {
    title: 'YYC',
    titleTemplate: '%s | Yoga Care',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '',
      },
      {
        vmid: 'surveyStepTitle',
        name: 'surveyStepTitle',
        content: '',
      },
      {
        vmid: 'surveyStepType',
        name: 'surveyStepType',
        content: '',
      },
    ],
  },
  methods: {
    ...mapActions('shared', [
      'clearError',
      'clearSuccess',
      'clearInfo',
      'setMobile',
    ]),
  },
  watch: {
    error(newValue) {
      if (newValue) {
        this.$awn.alert(newValue)
      }
      this.clearError()
    },
    success(newValue) {
      if (newValue) {
        this.$awn.success(newValue)
      }
      this.clearSuccess()
    },
    info(newValue) {
      if (newValue) {
        this.$awn.info(newValue)
      }
      this.clearInfo()
    },
  },
  computed: {
    ...mapGetters('shared', ['error', 'success', 'info']),
  },
  created() {
    this.setMobile(window.innerWidth <= 980)
    addEventListener('resize', () => {
      this.setMobile(innerWidth <= 980)
    })
  },
}
</script>

<style>
@import '@/assets/css/kirill.css';
@import '@/assets/css/init.css';

.add-pointer {
  cursor: pointer;
}
.remove-pointer {
  cursor: default;
}
.socials__link {
  cursor: pointer;
}
</style>
