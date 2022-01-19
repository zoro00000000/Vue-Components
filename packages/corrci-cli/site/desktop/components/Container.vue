<template>
  <div
    class="corrci-doc-container corrci-doc-row"
    :class="{ 'corrci-doc-container--with-simulator': hasSimulator }"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'corrci-doc-container',

  props: {
    hasSimulator: Boolean
  }
}
</script>

<style lang="less">
@import '../../common/style/var';

.corrci-doc-container {
  box-sizing: border-box;
  padding-left: @corrci-doc-nav-width;
  overflow: hidden;

  &--with-simulator {
    padding-right: @corrci-doc-simulator-width + @corrci-doc-padding;
  }
}
</style>
