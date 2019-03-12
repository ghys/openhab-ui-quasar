<template>
  <q-page>
    <div class="block-narrow q-pt-lg q-px-md">
      <div class="row wide"
          v-for="parameter in configDescriptions.parameters"
          :key="parameter.name">
        <div class="col full-width">
          <config-parameter
            :config-description="parameter"
            :value="config[parameter.name]"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ConfigParameter from '../../../components/ConfigParameter.vue'

export default {
  components: {
    ConfigParameter
  },
  props: ['serviceId'],
  data () {
    return {
      service: {},
      configDescriptions: null,
      config: null
    }
  },
  methods: {
    save () {
      alert('Save not implemented!')
      // this.$f7.dialog.alert('Save not implemented!')
    }
  },
  created () {
    fetch('/rest/services/' + this.serviceId).then(resp => {
      const json = resp.json()
      json.then(j => {
        this.service = j

        if (this.service.configDescriptionURI) {
          fetch(
            '/rest/config-descriptions/' + this.service.configDescriptionURI
          ).then(resp2 => {
            const json2 = resp2.json()
            json2.then(j2 => {
              this.configDescriptions = j2

              fetch('/rest/services/' + this.serviceId + '/config').then(
                resp3 => {
                  const json3 = resp3.json()
                  json3.then(j3 => {
                    this.config = j3
                  })
                }
              )
            })
          })
        }
      })
    })
  }
}
</script>

<style lang='stylus'>
.service-config {
  .item-input-info {
    white-space: normal;
  }
}
</style>
