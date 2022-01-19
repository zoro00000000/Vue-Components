<template>
  <div class="app">
    <corrci-doc
      :lang="lang"
      :config="config"
      :versions="versions"
      :simulator="simulator"
      :has-simulator="hasSimulator"
      :lang-configs="langConfigs"
    >
      <router-view/>
    </corrci-doc>
  </div>
</template>

<script>
// TODO: 需要修改这里
import { config, packageVersion } from './site-desktop-shared'
import corrciDoc from './components'
import { setLang } from '../common/locales'

export default {
  components: {
    corrciDoc
  },
  data () {
    const path = window.location.pathname.replace(/\/index(\.html)?/, '/')

    return {
      packageVersion,
      simulator: `${path}mobile.html${window.location.hash}`,
      hasSimulator: true
    }
  },
  computed: {
    lang () {
      const { lang } = this.$route.meta
      return lang || ''
    },
    langConfigs () {
      const { locales = {} } = config.site
      return Object.keys(locales)
        .map(key => ({
          lang: key,
          label: locales[key].langLabel || ''
        }))
    },
    config () {
      const { locales } = config.site

      if (locales) {
        return locales[this.lang]
      }

      return config.site
    },
    versions () {
      if (config.site.versions) {
        return [{ label: packageVersion }, ...config.site.versions]
      }

      return null
    }
  },
  watch: {
    lang (val) {
      setLang(val)
      this.setTitleAndToogleSimulator()
    }
  },
  created () {
    this.setTitleAndToogleSimulator()
  },
  methods: {
    setTitleAndToogleSimulator () {
      let { title } = this.config

      if (this.config.description) {
        title += ` - ${this.config.description}`
      }

      document.title = title

      const navItems = this.config.nav.reduce(
        (result, nav) => [...result, ...nav.items],
        []
      ) 
      const current = navItems.find(item => item.path === this.$route.meta.name)

      this.hasSimulator = !(
        config.site.hideSimulator
        || this.config.hideSimulator
        || (current && current.hideSimulator)
      )
    }
  }
}
</script>

<style lang="less">
@import '../common/style/base';
@import '../common/style/highlight';

.corrci-doc-intro {
  padding-top: 20px;
  text-align: center;

  p {
    margin-bottom: 20px;
  }
}
</style>
