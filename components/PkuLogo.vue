<script setup lang="ts">
import { computed } from 'vue'
import logoDefault from '../assets/logo-horizontal.svg?raw'
import { resolveAssetUrl, usePkuConfig } from '../layout-helper'
import PkuSeal from './PkuSeal.vue'

/**
 * Horizontal institution mark: circular seal, local name, and optional
 * English name. Global frontmatter can override it with:
 *   logo: /path/to/logo.svg      — replace the complete mark (SVG/PNG)
 *   seal: /path/to/seal.svg      — replace only the circular seal
 *   schoolName: Example Institute — use a text name with the seal
 *   schoolNameEn: EXAMPLE INSTITUTE
 */
const props = withDefaults(defineProps<{
  logo?: string
  seal?: string
  /** Circular seal diameter in pixels. */
  size?: number
}>(), {
  size: 48,
})

const cfgLogo = usePkuConfig('logo')
const schoolName = usePkuConfig('schoolName')
const schoolNameEn = usePkuConfig('schoolNameEn')

const src = computed(() => props.logo ?? cfgLogo.value)
const pxSize = computed(() => `${props.size}px`)
const nameSize = computed(() => `${Math.round(props.size * 0.94)}px`)
const enSize = computed(() => `${Math.max(9, Math.round(props.size * 0.24))}px`)
</script>

<template>
  <!-- Complete custom logo. -->
  <img v-if="src" class="pku-logo-img" :src="resolveAssetUrl(src)" alt="Institution logo">

  <!-- Built-in seal plus a configurable text name. -->
  <span v-else-if="schoolName" class="pku-logo" :style="{ height: pxSize }">
    <PkuSeal :seal="seal" :size="size" />
    <span class="pku-logo-text" aria-hidden="true">
      <span class="pku-logo-name">{{ schoolName }}</span>
      <span v-if="schoolNameEn" class="pku-logo-en">{{ schoolNameEn }}</span>
    </span>
  </span>

  <!-- Default: complete built-in vector mark. -->
  <span v-else class="pku-logo pku-logo-vector" :style="{ height: pxSize }" aria-hidden="true" v-html="logoDefault" />
</template>

<style scoped>
.pku-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  color: var(--slidev-theme-logoColor, var(--slidev-theme-primary));
  line-height: 1.1;
}
.pku-logo-vector :deep(svg),
.pku-logo-img {
  display: block;
  height: 100%;
  width: auto;
}
.pku-logo-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--slidev-theme-logoColor, var(--slidev-theme-primary));
}
.pku-logo-name {
  font-size: v-bind(nameSize);
  font-weight: 700;
  font-family: 'STKaiti', 'KaiTi', 'Microsoft YaHei', serif;
  letter-spacing: 0.12em;
}
.pku-logo-en {
  font-size: v-bind(enSize);
  font-weight: 500;
  letter-spacing: 0.05em;
  font-family: Georgia, 'Times New Roman', serif;
}
</style>
