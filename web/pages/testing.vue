<template>
  <div>
    {{ data }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import cubejs, { ResultSet } from "@cubejs-client/core"

export default Vue.extend({
  data() {
    return {
      data: {} as ResultSet<any>,
    }
  },
  fetchDelay: 0,
  fetchOnServer: false,
  async fetch() {
    const cubejsApi = cubejs(
      this.$config.cubeSecret,
      { apiUrl: this.$config.cubeUrl }
    )

    this.data = await cubejsApi.load({
      measures: ['map.wins_measure'],
      dimensions: ['map.brawler_dimension'],
      filters: [],
      timeDimensions: [ {
        dimension: 'map.season_dimension',
        granularity: 'month',
        dateRange: 'last 6 month',
      } ],
    })
  },
})
</script>
