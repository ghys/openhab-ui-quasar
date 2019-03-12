<template>
  <q-page>
    <div form v-if="addons.length" class="service-config block-narrow">
      <div class="row wide q-mt-lg">
        <div class="col full-width">
          <p>{{addons.length}} Add-on{{addons.length > 1 ? 's' : ''}} installed</p>
          <q-list separator>
            <q-item clickable v-ripple
                v-for="addon in addons"
                :key="addon.id"
                @click="openAddonPopup(addon.id)">
              <q-item-section>
                <q-item-label>{{addon.label}}</q-item-label>
                <q-item-label caption>{{addon.version}}</q-item-label>
              </q-item-section>
              <q-item-section side><q-icon name="chevron_right" /></q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
    <div v-if="!addons.length" class="service-config block-narrow">
      <div class="row wide q-mt-lg">
        <div class="col full-width">
          <p>No add-ons of type {{addonType}} installed yet. Click the + button to add one!</p>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round size="large" color="secondary" icon="add" :to="`/settings/addons/${addonType}/add`" />
    </q-page-sticky>
    <addon-details-popup
      :addon-id="currentAddonId"
      :opened="addonPopupOpened"
      @hide="addonPopupOpened = false; currentAddonId = null"
    />
  </q-page>
</template>

<script>
import AddonDetailsPopup from './AddonDetailsPopup.vue'

export default {
  components: {
    AddonDetailsPopup
  },
  props: ['addonType'],
  data () {
    return {
      addons: [],
      currentAddonId: null,
      addonPopupOpened: false
    }
  },
  created () {
    this.$oh.api.get('/rest/extensions').then(resp => {
      const data = resp.data
      this.addons = data.filter(addon => addon.installed && addon.type === this.addonType)
    })
  },
  methods: {
    openAddonPopup (addonId) {
      this.currentAddonId = addonId
      this.addonPopupOpened = true
    }
  }
}
</script>
