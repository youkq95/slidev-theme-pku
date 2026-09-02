<script setup lang="ts">
import { computed } from 'vue'
import { resolveAssetUrl, useFrontmatter, usePkuConfig } from '../layout-helper'
import defaultThanks from '../assets/thanks.jpg'

/**
 * Closing slide: a centered message with an optional accent strip and
 * portrait photo on the right.
 *
 * Frontmatter: `title` (defaults to `Thank you`), `thanksImage`, `noStrip`,
 * and `schoolNameEn` for the vertical label.
 */
const props = withDefaults(defineProps<{
  title?: string
  thanksImage?: string
  noStrip?: boolean
}>(), {
  title: 'Thank you',
})

const fm = useFrontmatter()
const cfgThanksImage = usePkuConfig('thanksImage')
const cfgSchoolNameEn = usePkuConfig('schoolNameEn')

const text = computed(() => fm.value.title ?? props.title)
const noStrip = computed(() => fm.value.noStrip ?? props.noStrip)
const schoolNameEn = computed(() => fm.value.schoolNameEn ?? cfgSchoolNameEn.value)

const image = computed(() => {
  const v = fm.value.thanksImage ?? props.thanksImage ?? cfgThanksImage.value
  return v ? resolveAssetUrl(v) : defaultThanks
})
</script>

<template>
  <div class="slidev-layout pku-thanks">
    <div class="pku-thanks-main">{{ text }}</div>

    <div v-if="!noStrip" class="pku-thanks-strip">
      <div class="pku-thanks-band">
        <span class="pku-thanks-band-text">{{ schoolNameEn || 'Peking University' }}</span>
      </div>
      <img class="pku-thanks-photo" :src="image" alt="">
    </div>
  </div>
</template>

<style scoped>
.pku-thanks {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--slidev-theme-bg, var(--pku-bg));
}
/* Hide Slidev's automatically injected frontmatter title h1. */
.pku-thanks :deep(h1) {
  display: none;
}
.pku-thanks-main {
  position: absolute;
  left: 0;
  right: 316px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 59px;
  font-weight: 700;
  color: var(--slidev-theme-sealColor, var(--pku-deep));
  line-height: 1.35;
  text-align: center;
}
.pku-thanks-strip {
  position: absolute;
  left: 964px;
  top: 0;
  width: 98px;
}
.pku-thanks-band {
  height: 220px;
  background: var(--slidev-theme-sealColor, var(--pku-deep));
  position: relative;
  overflow: hidden;
}
.pku-thanks-band-text {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  writing-mode: vertical-rl;
  color: #fff;
  font-size: 19px;
  font-weight: 600;
  white-space: nowrap;
  font-family: Arial, sans-serif;
}
.pku-thanks-photo {
  display: block;
  width: 100%;
  height: 347px;
  object-fit: cover;
  border-radius: 0;
}
</style>
