<template>
  <div v-if="model && !model.type">
    <q-card v-if="model.widgets.length && model.widgets[0].type !== 'Frame'">
      <q-list separator>
        <component v-for="widget in model.widgets" :name="widget.widgetId" :key="widget.widgetId" :is="componentType" :model="widget" :sitemap-id="sitemapId" :page-id="pageId" />
      </q-list>
    </q-card>
  <component v-else v-for="widget in model.widgets" :name="widget.widgetId" :key="widget.widgetId" :is="componentType" :model="widget" :sitemap-id="sitemapId" :page-id="pageId" />
  </div>
  <q-card v-else-if="model && model.type === 'Frame'" class="q-mt-md">
    <q-list separator>
      <q-item-label header v-if="model.label">{{model.label}}</q-item-label>
      <component v-for="widget in model.widgets" :name="widget.widgetId" :key="widget.widgetId" :is="componentType" :model="widget" :sitemap-id="sitemapId" :page-id="pageId" />
    </q-list>
  </q-card>
  <q-item v-else :clickable="link !== null" :to="link">
    <q-item-section avatar v-if="model.icon">
      <q-avatar square>
        <img :src="'/icon/' + model.icon + '?format=svg'">
      </q-avatar>
    </q-item-section>
    <q-item-section>
      {{title}}
    </q-item-section>
    <q-item-section side v-if="state">{{state}}</q-item-section>
    <q-item-section avatar v-if="model.type === 'Switch'">
      <q-toggle v-model="model.state"></q-toggle>
    </q-item-section>
    <q-item-section side v-if="model.type === 'Slider'" style="width: 30%">
      <q-slider v-model="model.state"></q-slider>
    </q-item-section>
    <q-item-section side v-if="link"><q-icon name="chevron_right" /></q-item-section>
  </q-item>
</template>

<script>
export default {
  props: [
    'model',
    'sitemapId',
    'pageId'
  ],
  data () {
    return {
      title: '',
      state: '',
      link: null
    }
  },
  created () {
    if (this.model && this.model.label) {
      let splittedlabel = this.model.label.split(' [')
      this.title = splittedlabel[0]
      if (splittedlabel[1]) {
        this.state = splittedlabel[1].replace(/\]$/, '')
      }
    }

    if (this.model && this.model.linkedPage) {
      this.link = '/sitemap/' + this.sitemapId + '/' + this.model.linkedPage.id
    }
  },
  computed: {
    componentType () {
      return 'sitemap-widget-generic'
    }
  }
}
</script>
