<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { setLanguage } from '@/utils/setting'

export default {
  name: 'App',
  async created() {
    const _headerAcceptLanguage = this.$store.getters.language
    setLanguage(_headerAcceptLanguage)
    await this.$store.dispatch('localization/getAll')
    await this.$store.dispatch('auth/initAuth')
  }
}
</script>
