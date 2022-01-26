<template>
  <div>
    <mobile-nav />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import MobileNav from './components/MobileNav'

export default {
  components: { MobileNav }
}
</script>

<style lang="less">
@import '../common/style/var';
@import '../common/style/base';
 
body {
  min-width: 100vw;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
