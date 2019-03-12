<template>
  <q-page>
    <div class="block-narrow" v-show="addonTypes.length > 0 && systemServices.length > 0">
      <div class="row gutter-x-sm q-pt-lg">
        <div class="col-sm-6 col-xs-12 settings-column">
          <q-list separator>
            <q-item-label header>Configuration &amp; Automation</q-item-label>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Inbox <q-badge label="2" color="red" /></q-item-label>
                <q-item-label caption>{{objectsSubtitles.inbox}}</q-item-label>
              </q-item-section>
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/settings/things">
              <q-item-section>
                <q-item-label>Things</q-item-label>
                <q-item-label caption>{{objectsSubtitles.things}}</q-item-label>
              </q-item-section>
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/settings/items">
              <q-item-section>
                <q-item-label>Items</q-item-label>
                <q-item-label caption>{{objectsSubtitles.items}}</q-item-label>
              </q-item-section>
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Rules</q-item-label>
                <q-item-label caption>{{objectsSubtitles.rules}}</q-item-label>
              </q-item-section>
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
          </q-list>
          <q-list separator class="full-width">
            <q-item-label header>Add-ons</q-item-label>
            <q-item
              v-for="type in addonTypes"
              :key="type.id"
              clickable v-ripple
              :to="'/settings/addons/' + type.id">
              <q-item-section>
                <q-item-label>{{type.label}}</q-item-label>
                <q-item-label caption>{{addonsSubtitles[type.id]}}</q-item-label>
              </q-item-section>
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="col-sm-6 col-xs-12 settings-column">
          <q-list separator class="full-width">
            <q-item-label header>System Services</q-item-label>
            <q-item
              v-for="service in systemServices"
              :key="service.id"
              clickable v-ripple
              :to="'/settings/services/' + service.id">
              <q-item-section>
                <q-item-label>{{service.label}}</q-item-label>
              </q-item-section>
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
          </q-list>

          <q-list separator class="full-width">
            <q-item-label header>Other Services</q-item-label>
            <q-item
              v-for="service in otherServices"
              :key="service.id"
              clickable v-ripple
              :to="'/settings/services/' + service.id">
              <q-item-section>
                <q-item-label>{{service.label}}</q-item-label>
              </q-item-section>
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
          </q-list>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      addonTypes: {},
      systemServices: [],
      otherServices: [],
      objectsSubtitles: {
        inbox: 'Add new things to your system',
        things: 'Manage the physical layer, link to items',
        items: 'The conceptual model of your home',
        rules: 'Automate without programming'
      },
      addonsSubtitles: {
        binding: 'Connect and control hardware and online services',
        action: 'Predefined methods for rules and scripts',
        persistence: 'Backend connectors to store historical data',
        transformation: 'Translate between technical and human-readable values',
        misc: 'Integrations to external systems and more',
        ui: 'Alternative frontends for user interaction',
        voice:
          'Convert between text and speech, interpret human language queries'
      }
    }
  },
  beforeCreate () {
    // can be done in parallel!
    this.$oh.api.get('/rest/services').then((resp) => {
      const data = resp.data
      this.systemServices = data.filter(s => s.category === 'system')
      this.otherServices = data.filter(s => s.category !== 'system')
    })
    this.$oh.api.get('/rest/extensions/types').then((resp) => {
      const data = resp.data
      this.addonTypes = data
    })
  }
}
</script>

<style lang="stylus">

@media (min-width: 600px)
  .settings-column
    padding-left 1rem
    padding-right 1rem
</style>
