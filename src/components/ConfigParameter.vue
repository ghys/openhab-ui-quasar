<template>
  <div class="full-width">
    <q-input
      v-if="configDescription.type === 'TEXT' && !configDescription.options.length"
      type="text" filled
      v-model="actualValue" :label="configDescription.label">
      <template v-slot:hint>
      </template>
    </q-input>
    <q-input
      v-if="configDescription.type === 'INTEGER' && !configDescription.options.length"
      type="number"
      v-model="actualValue" filled :label="configDescription.label">
      <template v-slot:hint>
      </template>
    </q-input>
    <div v-else-if="configDescription.type === 'TEXT' && configDescription.options.length">
      <q-select v-model="actualValue" :options="options"
        filled map-options :label="configDescription.label"
        :use-input="configDescription.options.length > 10" @filter="filterFn" />
    </div>
    <q-list v-else-if="configDescription.type === 'BOOLEAN'">
      <q-item tag="label" class="bg-grey-3">
        <q-item-section>
          <q-item-label class="text-grey-6">{{configDescription.label}}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle v-model="actualValue" />
        </q-item-section>
      </q-item>
    </q-list>
    <small v-html="configDescription.description"></small>
    <br /><br />
  </div>
</template>

<script>
export default {
  props: [
    'configDescription',
    'value'
  ],
  data () {
    return {
      smartSelectParams: {},
      options: []
    }
  },
  computed: {
    actualValue: {
      get () {
        if (this.configDescription.type === 'BOOLEAN' && typeof (this.value) === 'string') {
          return this.value === 'true'
        } else if (this.configDescription.type === 'INTEGER') {
          return parseInt(this.value)
        }
        return this.value
      },
      set (value) {
        this.value = value
      }
    }
  },
  created () {
    if (this.configDescription.options) {
      this.options = this.configDescription.options
    }
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.configDescription.options
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.configDescription.options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>

<style lang="stylus">
.param-description
  padding-left 16px !important
  p
    margin 0 !important
</style>
