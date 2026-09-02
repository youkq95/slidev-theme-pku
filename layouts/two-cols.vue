<script setup lang="ts">
import { computed } from 'vue'
import PkuTitleBar from '../components/PkuTitleBar.vue'
import PkuLogo from '../components/PkuLogo.vue'
import PkuFooter from '../components/PkuFooter.vue'
import { useFrontmatter, usePkuConfig } from '../layout-helper'

/**
 * Two-column content layout with the same title bar and footer as `default`.
 * Use `<template #left>` and `<template #right>` (or Slidev's `::left::` and
 * `::right::` blocks) to populate the columns.
 *
 * Frontmatter: `title` / `footnote` / `noLogo` / `noFooter` / `noPageNum` /
 * `noLine` / `leftWidth`.
 */
const props = withDefaults(defineProps<{
  title?: string
  footnote?: string
  noLogo?: boolean
  noFooter?: boolean
  noPageNum?: boolean
  noLine?: boolean
  /** Left-column width as a percentage (50 by default). */
  leftWidth?: number
}>(), { leftWidth: 50 })

const fm = useFrontmatter()
const cfgNoLogo = usePkuConfig('noLogo')

const title = computed(() => props.title ?? fm.value.title)
const showLogo = computed(() => !props.noLogo && !fm.value.noLogo && !cfgNoLogo.value)
const showFooter = computed(() => !props.noFooter && !fm.value.noFooter)
const showTitleBar = computed(() => !!title.value)
const columns = computed(() => `${fm.value.leftWidth ?? props.leftWidth}% 1fr`)
</script>

<template>
  <div class="slidev-layout pku-two-cols" :class="{ 'no-title': !showTitleBar }">
    <PkuTitleBar v-if="showTitleBar" :title="title" />
    <PkuLogo v-if="showLogo" class="pku-two-cols-logo" :size="47" />
    <div class="pku-two-cols-content" :style="{ gridTemplateColumns: columns }">
      <div class="pku-two-cols-left">
        <slot />
        <slot name="left" />
      </div>
      <div class="pku-two-cols-right"><slot name="right" /></div>
    </div>
    <PkuFooter v-if="showFooter" :footnote="footnote" :no-page-num="noPageNum" :no-line="noLine" />
  </div>
</template>

<style scoped>
.pku-two-cols {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.pku-two-cols-logo {
  position: absolute;
  top: 34px;
  right: 53px;
}
.pku-two-cols-content {
  position: absolute;
  top: 150px;
  bottom: 100px;
  left: 47px;
  right: 47px;
  display: grid;
  column-gap: 48px;
  align-items: start;
}
.pku-two-cols:not(.no-title) .pku-two-cols-content :deep(h1:first-child) {
  display: none;
}
</style>
