<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          openHAB
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <div class="logo">
        <router-link to="/">
          <img src="../statics/img/openhab-logo.png" width="100%">
        </router-link>
      </div>
      <q-list separator>
        <q-separator />
        <q-item
           class="bg-white"
           v-for="sitemap in sitemaps" :key="sitemap.name"
           clickable tag="a" :to="'/sitemap/' + sitemap.name + '/' + sitemap.name">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{sitemap.label}}</q-item-label>
            <!-- <q-item-label caption>@quasarframework</q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-separator />
        <q-item-label header>Administration</q-item-label>
        <q-item clickable tag="a" to="/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
            <!-- <q-item-label caption>@quasarframework</q-item-label> -->
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/about">
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Help &amp; About</q-item-label>
            <!-- <q-item-label caption>@quasarframework</q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      sitemaps: []
    }
  },
  methods: {
    openURL
  },
  created () {
    this.$oh.api.get('/rest/sitemaps').then((resp) => {
      this.sitemaps = resp.data
    })
  }
}
</script>

<style lang="stylus">
  .logo
    padding 2rem 2rem
    background-color #fff
</style>
