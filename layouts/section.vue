<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import PkuLogo from '../components/PkuLogo.vue'
import PkuClouds from '../components/PkuClouds.vue'
import { useFrontmatter, usePkuConfig } from '../layout-helper'

/**
 * Section divider: institution mark at the top and an accent-colored band in
 * the middle with `PART n`, the section title, and a decorative pattern.
 *
 * Frontmatter: `title` / `section` / `part` / `noLogo`.
 */
const props = withDefaults(defineProps<{
  /** Section title, taking precedence over frontmatter. */
  title?: string
  /** Alternate section title from frontmatter `section`. */
  section?: string
  /** Part number; defaults to the count of earlier section slides plus one. */
  part?: number
  noLogo?: boolean
}>(), {})

const fm = useFrontmatter()
const cfgNoLogo = usePkuConfig('noLogo')
const { slides, currentPage } = useNav()

const showLogo = computed(() => !props.noLogo && !fm.value.noLogo && !cfgNoLogo.value)
const heading = computed(() => props.title ?? fm.value.title ?? props.section ?? fm.value.section)

// Automatic numbering: count section layouts before the current slide.
const autoPart = computed(() => {
  let count = 0
  const list = slides.value
  for (let i = 0; i < Math.min(currentPage.value - 1, list.length); i++) {
    const layout = list[i]?.meta?.slide?.frontmatter?.layout
    if (layout === 'section')
      count++
  }
  return count + 1
})

const partNo = computed(() => props.part ?? fm.value.part ?? autoPart.value)
</script>

<template>
  <div class="slidev-layout pku-section">
    <PkuLogo v-if="showLogo" class="pku-section-logo" :size="70" />

    <div class="pku-section-band">
      <PkuClouds class="pku-section-clouds" :width="440" />
      <div class="pku-section-inner">
        <div class="pku-section-part">PART&ensp;{{ partNo }}</div>
        <div class="pku-section-divider" />
        <div class="pku-section-title">{{ heading }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pku-section {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--slidev-theme-bg, var(--pku-bg));
}
/* Hide Slidev's automatically injected frontmatter title h1. */
.pku-section :deep(h1) {
  display: none;
}
.pku-section-logo {
  position: absolute;
  top: 62px;
  left: 92px;
}
.pku-section-band {
  position: absolute;
  top: 185px;
  left: 0;
  right: 0;
  height: 350px;
  background: var(--slidev-theme-primary);
}
.pku-section-clouds {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
}
.pku-section-inner {
  position: absolute;
  left: 92px;
  right: 520px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
}
.pku-section-part {
  font-size: 53px;
  font-weight: 500;
  font-family: Arial, 'Microsoft YaHei', sans-serif;
  letter-spacing: 0.04em;
  line-height: 1.2;
}
.pku-section-divider {
  width: 62px;
  height: 2px;
  background: rgb(255 255 255 / 85%);
  margin: 14px 0;
}
.pku-section-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  color: #fff;
}
</style>
