<template>
  <div class="corrci-mobile-home">
    <h1
      class="corrci-mobile-home__title"
      :class="{ 'corrci-mobile-home__title--small': smallTitle }"
    >
      <img :src="config.logo" />
      <span>{{ config.title }}</span>
    </h1>
    <h2 v-if="config.description" class="corrci-mobile-home__desc">
      {{ config.description }}
    </h2>
    <template v-for="(group, index) in config.nav">
      <mobile-home-nav :group="group" :lang="lang" :key="index" />
    </template>
  </div>
</template>

<script>
import { config } from 'set-mobile-deploy'
import MobileHomeNav from './MobileHomeNav'

export default {
  components: {
    MobileHomeNav
  },
  computed: {
    lang () {
      const { lang } = this.$route.meta
      return lang
    },
    config () {
      const { locales } = config.site

      if (locales) {
        return locales[this.lang]
      }

      return config.site
    },
    smallTitle () {
      return this.config.title.length >= 8
    }
  }
}
</script>

<style lang="less">
@import '../../common/style/var';

.corrci-mobile-home {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 46px 20px 20px;
  background: #fff;

  &__title,
  &__desc {
    padding-left: 16px;
    font-weight: normal;
    line-height: 1;
    user-select: none;
  }

  &__title {
    margin: 0 0 16px;
    font-size: 32px;

    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    img {
      width: 32px;
    }

    span {
      margin-left: 16px;
    }

    &--small {
      font-size: 24px;
    }
  }

  &__desc {
    margin: 0 0 40px;
    color: rgba(69, 90, 100, 0.6);
    font-size: 14px;
  }
}
</style>
