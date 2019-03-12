<template>
  <q-page>
    <div form v-if="items.length" class="service-config block-narrow">
      <div class="row wide q-mt-lg">
        <div class="col full-width">
          <q-list separator>
            <q-item clickable v-ripple
                v-for="item in items"
                :key="item.name">
              <q-item-section>
                <q-item-label>{{item.label || item.name}}</q-item-label>
                <q-item-label caption>{{item.name}}</q-item-label>
              </q-item-section>
              <small>{{item.type}}</small>
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
    <div v-if="!items.length" class="service-config block-narrow">
      <div class="row wide q-mt-lg">
        <div class="col full-width">
          <p>No items.</p>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round size="large" color="secondary" icon="add" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      items: [], // [{ label: 'Staircase', name: 'Staircase'}],
      indexedItems: {},
      initSearchbar: false,
      vlData: {
        items: []
      },
      showCheckboxes: false
    }
  },
  mounted () {
    // this.$f7.preloader.show()
    this.loading = true
    this.$oh.api.get('/rest/items').then((resp) => {
      const data = resp.data
      this.items = data.sort((a, b) => {
        const labelA = a.label || a.name
        const labelB = b.label || b.name
        return labelA.localeCompare(labelB)
      })
      this.indexedItems = this.items.reduce((prev, item, i, items) => {
        const initial = (item.label) ? item.label.substring(0, 1).toUpperCase() : item.name.substring(0, 1).toUpperCase()
        if (!prev[initial]) {
          prev[initial] = []
        }
        prev[initial].push(item)

        return prev
      }, {})
      this.loading = false
      // this.$f7.preloader.hide()
      setTimeout(() => {
        this.initSearchbar = true
        this.$refs.listIndex.update()
      })
    })
  },
  methods: {}
}
</script>
