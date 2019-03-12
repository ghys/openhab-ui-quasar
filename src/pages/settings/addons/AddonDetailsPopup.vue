<template>
  <q-dialog v-model="opened">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>{{addon.label}}</q-toolbar-title>
          <q-btn flat v-close-dialog round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <div class="row">
            <div class="col q-pa-sm" v-if="addon.link">
              <q-btn class="full-width" outline color="secondary" label="Open documentation" />
            </div>
            <div class="col q-pa-sm">
              <q-btn class="full-width" color="secondary"
                :label="`Install ${addon.version}`"
                v-if="state === 'UNINSTALLED'"
                @click="install()"
                />
              <q-btn class="full-width" color="red"
                :label="`Uninstall ${addon.version}`"
                v-if="state === 'INSTALLED'"
                @click="uninstall()"
                />
            </div>
          </div>
          <div class="row q-mt-xl">
            <div class="col" v-if="bindingInfo.description">
              <p>
                <strong>Author: {{bindingInfo.author}}</strong>
              </p>
              <div v-html="bindingInfo.description"/>
            </div>
            <div class="col" v-else>
              <p>No description available.</p>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
export default {
  props: ['addonId', 'opened'],
  data () {
    return {
      addon: {},
      bindingInfo: {}
    }
  },
  watch: {
    addonId () {
      if (!this.addonId) {
        this.addon = {}
        this.bindingInfo = {}
        return
      }
      this.$oh.api.get('/rest/extensions/' + this.addonId).then(resp => {
        this.addon = resp.data

        if (this.addon.type === 'binding' && this.addon.installed) {
          this.$oh.api.get('/rest/bindings').then(resp2 => {
            this.bindingInfo = resp2.data.find(b => b.id === this.addonId.replace('binding-', '')) || {}

            // TODO: binding configuration stuff
          })
        }
      })
    }
  },
  computed: {
    state () {
      // TODO: figure out somehow whether the addon is BEING installed/uninstalled.
      if (!this.addon) return 'UNKNOWN'
      return this.addon.installed ? 'INSTALLED' : 'UNINSTALLED'
    }
  },
  methods: {
    install () {
      this.$q.dialog({
        message: 'Installing/uninstalling addons not implemented yet!',
        title: 'Sorry',
        persistent: true
      })
    },
    uninstall () {
      this.install()
    }
  }
}
</script>
