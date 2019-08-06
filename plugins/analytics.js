import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

export default ({ app, env }) => {
  window.onNuxtReady(() => {
    // should be called after vuex-persist
    Vue.use(VueAnalytics, {
      id: 'UA-137233906-1',
      router: app.router,
      set: [
        { field: 'dimension1', value: env.branch },
        // events should not affect bounce rate
        { field: 'nonInteraction', value: true },
      ],
      disabled: app.store.state.adsAllowed !== true,
    })
  })
}
