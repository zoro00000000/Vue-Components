<template>
  <input class="corrci-doc-search" :placeholder="placeholder"/>
</template>

<script>
export default {
  name: 'corrci-doc-search',
  props: {
    lang: String,
    searchConfig: Object
  },
  computed: {
    placeholder () {
      return this.searchConfig.placeholder || 'Search...'
    }
  },
  watch: {
    lang (lang) {
      if (this.docsearchInstance) {
        this.docsearchInstance.algoliaOptions.facetFilters = [`lang:${lang}`]
      }
    }
  },
  mounted () {
    const { searchConfig } = this
    if (searchConfig) {
      const { algoliaOptions } = searchConfig
      let facetFilters = [`lang:${this.lang}`]

      if (algoliaOptions?.facetFilters) {
        facetFilters = facetFilters.concat(algoliaOptions.facetFilters)
      }

      this.docsearchInstance = window.docsearch({
        ...searchConfig,
        transformData: hits => {
          hits.forEach(hit => {
            if (hit.anchor) {
              hit.url = `${hit.url}#${hit.anchor}`
              hit.anchor = null
            }
          })
          if (searchConfig.transformData) {
            searchConfig.transformData(hits)
          }
        },
        inputSelector: '.corrci-doc-search',
        algoliaOptions: {
          ...algoliaOptions,
          facetFilters
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '../../common/style/var';

.corrci-doc-search {
  width: 200px;
  height: 60px;
  margin-left: 140px;
  color: #fff;
  font-size: 14px;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #fff;
    opacity: 0.7;
  }
}

.ds-dropdown-menu {
  line-height: 1.8;
}

.algolia-autocomplete {
  .algolia-docsearch-suggestion--highlight {
    color: @corrci-doc-blue;
    background-color: transparent;
  }

  .algolia-docsearch-suggestion--title {
    font-weight: 600;
  }

  .algolia-docsearch-suggestion--text {
    .algolia-docsearch-suggestion--highlight {
      box-shadow: inset 0 -1px 0 0 @corrci-doc-blue;
    }
  }

  .algolia-docsearch-suggestion--category-header {
    border-bottom-color: #eee;
  }

  .ds-dropdown-menu [class^='ds-dataset-'] {
    border: none;
  }

  .ds-dropdown-menu {
    top: 80% !important;
    box-shadow: 0 4px 12px #ebedf0;

    &::before {
      display: none;
    }
  }
}
</style>
