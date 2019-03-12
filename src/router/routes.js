
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/sitemap/:sitemapId/:pageId', component: () => import('pages/sitemap/Sitemap.vue'), props: true },
      { path: '/settings', component: () => import('pages/settings/Settings.vue') },
      { path: '/settings/services/:serviceId', component: () => import('pages/settings/services/ServiceSettings.vue'), props: true },
      { path: '/settings/addons/:addonType', component: () => import('pages/settings/addons/AddonsList.vue'), props: true },
      { path: '/settings/addons/:addonType/add', component: () => import('pages/settings/addons/AddonsAdd.vue'), props: true },
      { path: '/settings/items', component: () => import('pages/settings/items/ItemsList.vue'), props: true },
      { path: '/settings/things', component: () => import('pages/settings/things/ThingsList.vue'), props: true },
      { path: '/about', component: () => import('pages/About.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
