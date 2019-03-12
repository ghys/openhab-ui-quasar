<template>
  <q-page>
    <div class="block-narrow">
      <div class="row wide q-mt-lg">
        <div class="col" v-if="sitemap.widgets">
          <!-- <q-list v-if="sitemap.widgets[0].type !== 'Frame'" separator>
            <sitemap-widget-generic :model="sitemap" :sitemapId="sitemapId" :pageId="pageId" />
          </q-list> -->
          <sitemap-widget-generic :model="sitemap" :sitemapId="sitemapId" :pageId="pageId" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
// import SitemapWidgetGeneric from '../components/sitemap/widget-generic.vue'

export default {
  // components: {
  //   SitemapWidgetGeneric
  // },
  props: ['sitemapId', 'pageId'],
  data () {
    return {
      sitemap: {}
    }
  },
  created () {
    fetch('/rest/sitemaps/' + this.sitemapId + '/' + this.pageId).then(resp => {
      const json = resp.json()
      json.then(j => {
        this.sitemap = j
      })
    })
  }
}
</script>
