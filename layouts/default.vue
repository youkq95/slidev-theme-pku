<script setup lang="ts">
import { computed } from 'vue'
import PkuTitleBar from '../components/PkuTitleBar.vue'
import PkuLogo from '../components/PkuLogo.vue'
import PkuFooter from '../components/PkuFooter.vue'
import { useFrontmatter, usePkuConfig } from '../layout-helper'

/**
 * Content layout:
 *  - upper-left: bold accent-colored title and gray/accent rule
 *  - upper-right: institution mark
 *  - footer: hairline, optional footnote, and page number
 *
 * Frontmatter flags: `noLogo` / `noFooter` / `noPageNum` / `noLine`.
 */
const props = withDefaults(defineProps<{
  /** Explicit title, taking precedence over frontmatter `title`. */
  title?: string
  footnote?: string
  noLogo?: boolean
  noFooter?: boolean
  noPageNum?: boolean
  noLine?: boolean
}>(), {})

const fm = useFrontmatter()
const cfgNoLogo = usePkuConfig('noLogo')

const title = computed(() => props.title ?? fm.value.title)
const showLogo = computed(() => !props.noLogo && !fm.value.noLogo && !cfgNoLogo.value)
const showFooter = computed(() => !props.noFooter && !fm.value.noFooter)
const showTitleBar = computed(() => !!title.value)
</script>

<template>
  <div class="slidev-layout pku-default" :class="{ 'no-title': !showTitleBar }">
    <PkuTitleBar v-if="showTitleBar" :title="title" />
    <PkuLogo v-if="showLogo" class="pku-default-logo" :size="47" />
    <div class="pku-default-content">
      <slot />
    </div>
    <PkuFooter v-if="showFooter" :footnote="footnote" :no-page-num="noPageNum" :no-line="noLine" />
  </div>
</template>

<style scoped>
.pku-default {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.pku-default-logo {
  position: absolute;
  top: 34px;
  right: 53px;
}
.pku-default-content {
  position: absolute;
  top: 150px;
  bottom: 100px;
  left: 47px;
  right: 47px;
}
/* Without a frontmatter title, style the first h1 as the title bar. */
.pku-default.no-title .pku-default-content {
  top: 25px;
}
.pku-default.no-title .pku-default-content :deep(h1:first-child) {
  font-size: 32px;
  font-weight: 700;
  color: var(--slidev-theme-primary);
  margin: 0 0 14px;
  padding-bottom: 13px;
  position: relative;
  text-align: left;
}
.pku-default.no-title .pku-default-content :deep(h1:first-child)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 255px;
  height: 3px;
  background:
    linear-gradient(to right,
      var(--slidev-theme-primary) 0, var(--slidev-theme-primary) 62px,
      var(--slidev-theme-line, var(--pku-line)) 62px, var(--slidev-theme-line, var(--pku-line)) 100%);
}
.pku-default.no-title .pku-default-content :deep(h1:first-child) + p {
  margin-top: 0.6em;
}
/* With a frontmatter title, the title bar is already visible; hide the injected h1. */
.pku-default:not(.no-title) .pku-default-content :deep(h1:first-child) {
  display: none;
}
.pku-default-content :deep(img) {
  max-width: 100%;
  /* Keep images inside the content area and above the footer. */
  max-height: 435px;
  object-fit: contain;
}
</style>
