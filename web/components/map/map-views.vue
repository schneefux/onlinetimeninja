<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 justify-items-center"
    :class="{
      '2xl:grid-cols-4': id != undefined,
      '2xl:grid-cols-3': id == undefined,
    }"
  >
    <card
      v-if="id != undefined"
      md
    >
      <div
        slot="content"
        class="flex justify-center"
      >
        <media-img
          v-observe-visibility="{
            callback: (v, e) => trackScroll(v, e, 'image'),
            once: true,
          }"
          :path="id != 0 ? `/maps/${id}` : `/maps/competition-winners/${map.replace('Competition Winner ', '')}`"
          size="512"
          clazz="h-auto"
        ></media-img>
      </div>
    </card>

    <!-- FiXME find cause for SSR error -->
    <client-only>
    <map-best-brawlers-table
      v-observe-visibility="{
        callback: (v, e) => trackScroll(v, e, 'brawlers'),
        once: true,
      }"
      :mode="mode"
      :map="map"
      :id="id"
      full-height
      md
    ></map-best-brawlers-table>

    <map-best-teams-table
      v-if="mode != 'soloShowdown'"
      v-observe-visibility="{
        callback: (v, e) => trackScroll(v, e, 'teams'),
        once: true,
      }"
      :mode="mode"
      :map="map"
      :id="id"
      full-height
      md
    ></map-best-teams-table>

    <map-best-players-table
      v-observe-visibility="{
        callback: (v, e) => trackScroll(v, e, 'leaderboard'),
        once: true,
      }"
      :mode="mode"
      :map="map"
      :id="id"
    ></map-best-players-table>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    mode: {
      type: String
    },
    map: {
      type: String
    },
    id: {
      type: Number
    },
    timestamp: {
      type: String
    },
    gaCategory: {
      type: String
    },
  },
  methods: {
    trackScroll(visible, element, section) {
      if (this.gaCategory != undefined && visible) {
        this.$gtag.event('scroll', {
          'event_category': this.gaCategory,
          'event_label': section,
        })
      }
    },
  },
})
</script>
