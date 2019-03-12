<template>
  <q-page>
    <div class="block-narrow q-mt-lg">
      <div class="row wide">
        <div class="col">
          <q-card class="q-mt-lg q-mx-md" v-if="showSetup">
            <q-card-section>
              <div class="text-h6">Welcome to openHAB!</div>
              <div class="text-subtitle">
                Congratulations, your server is up and running! However, it is not configured yet. Follow the setup wizard and let it guide you through the initial configuration. (Note: the wizard could also be started automatically on launch if no package is detected - services/org.openhab.addons > package).
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions>
              <q-btn color="secondary">Start Setup Wizard</q-btn>
              <q-btn color="secondary" flat @click="skipSetupWizard()">No thanks</q-btn>
            </q-card-actions>
          </q-card>
          <q-card class="q-mt-lg q-mx-md" v-if="showTasks">
            <q-card-section>
              <div class="text-h6">Suggested Tasks</div>

              <div class="text-subtitle2 tasks">
                <ol>
                  <li><router-link to="/settings">Install Bindings &amp; other add-ons</router-link></li>
                  <li><router-link to="/settings">Discover &amp; configure Things</router-link></li>
                  <li><router-link to="/settings">Design your home's conceptual model with Home Builder</router-link></li>
                  <li><router-link to="/settings">Connect to openHAB Cloud for remote access and integration with voice assistants</router-link></li>
                </ol>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn color="secondary" flat @click="dismissTasks()">Dismiss</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus">
@import url(../css/quasar.variables.styl);
.tasks a
  text-decoration none
  color #2196f3 //$secondary
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      showSetup: true,
      showTasks: true
    }
  },
  methods: {
    skipSetupWizard () {
      const vm = this
      this.$q.dialog({
        message: 'Are you sure? You currently only have a minimal set of features available and you will need to install all essential add-ons by hand!',
        title: 'Skip Setup Wizard',
        cancel: true,
        persistent: true
      }).onOk(() => {
        vm.showSetup = false
      }).onCancel(() => {
      })
    },
    dismissTasks () {
      this.showTasks = false
    }
  }
}
</script>
