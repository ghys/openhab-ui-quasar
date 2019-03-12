<template>
  <q-page>
    <div form v-if="things.length" class="service-config block-narrow">
      <div class="row wide q-mt-lg">
        <div class="col full-width">
          <q-list separator>
            <q-item clickable v-ripple
                v-for="thing in things"
                :key="thing.UID">
              <q-item-section>
                <q-item-label>{{thing.label}}</q-item-label>
                <q-item-label caption>{{thing.UID}}</q-item-label>
              </q-item-section>
              <q-badge :label="thing.statusInfo.status" :color="thing.statusInfo.status === 'ONLINE' ? 'positive' : 'negative'" />
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
    <div v-if="!things.length" class="service-config block-narrow">
      <div class="row wide q-mt-lg">
        <div class="col full-width">
          <p>No things.</p>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round size="large" color="secondary" icon="add" />
    </q-page-sticky>
    <addon-details-popup
      :addon-id="currentAddonId"
      :opened="addonPopupOpened"
      @hide="addonPopupOpened = false; currentAddonId = null"
    />
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      initSearchbar: false,
      things: [],
      indexedThings: {}
    }
  },
  created () {
    // this.$f7.preloader.show()
    this.loading = true
    this.$oh.api.get('/rest/things').then((resp) => {
      const data = resp.data
      this.things = data.sort((a, b) => a.label.localeCompare(b.label))
      this.indexedThings = this.things.reduce((prev, thing, i, items) => {
        const initial = thing.label.substring(0, 1).toUpperCase()
        if (!prev[initial]) {
          prev[initial] = []
        }
        prev[initial].push(thing)

        return prev
      }, {})
      this.initSearchbar = true
      this.loading = false
      setTimeout(() => { this.$refs.listIndex.update() })
      // this.$f7.preloader.hide()
    })
  },
  methods: {}
}
</script>
