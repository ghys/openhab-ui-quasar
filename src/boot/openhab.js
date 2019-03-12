import axios from 'axios'
import SitemapWidgetGeneric from '../components/sitemap/WidgetGeneric.vue'
export default async ({ Vue }) => {
  Vue.component('sitemap-widget-generic', SitemapWidgetGeneric)
  Vue.prototype.$oh = {
    api: axios
  }
}
