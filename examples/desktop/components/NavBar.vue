<template>
    <div class="corrci-nav">
        <div v-for="(item, index) in navConfig" :key="index" class="corrci-nav__group">
            <div class="corrci-doc-nav__title">
                {{ group.title }}
            </div>
            <template v-if="group.items">
                <div
                    v-for="(item, groupIndex) in group.items"
                    :key="groupIndex"
                    class="corrci-doc-nav__item"
                >
                    <!-- <van-doc-nav-link :item="item" :base="base" /> -->
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CorrciNavBar',
        props: {
            navConfig: {
                type: Array,
                default: () => []
            }
        },
        data () {
            return {}
        },
        computed () {},
        methods: {}
    }
</script>

<style lang="scss">
.corrci-nav {
    position: fixed;
    left: 0;
    z-index: 1;
    min-width: 100px;
    max-width: 200px;
    padding: 24px 0;
    overflow-y: scroll;
    background-color: #fff;
    box-shadow: 0 8px 12px #ebedf0;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 6px;
    }

    &:hover::-webkit-scrollbar-thumb {
        background-color: rgba(69, 90, 100, 0.2);
    }

    &__group {
        margin-bottom: 16px;
        padding-left: 6px;
    }

    &__title {
        padding: 8px 0 8px 12px;
        color: #455a64;
        font-weight: 600;
        font-size: 15px;
        line-height: 28px;
    }

    &__item {
        a {
            display: block;
            margin: 8px 0;
            padding: 8px 0 8px 12px;
            color: #455a64;
            font-size: 14px;
            line-height: 20px;
            transition: color 0.2s;

            &:hover,
            &.active {
                color: #337788;
            }

            &.active {
                font-weight: 600;
                background-color: #ebfff0;
                border-radius: 999px;
            }

            span {
                font-size: 13px;
            }
        }
    }
}
</style>
