<script setup lang="ts">
import { computed } from 'vue'
import sealDefault from '../assets/seal.svg?raw'
import { resolveAssetUrl, usePkuConfig } from '../layout-helper'

/**
 * Circular seal. The built-in vector follows the theme color and can be
 * replaced with an SVG/PNG through the `seal` prop or global `seal:` config.
 */
const props = withDefaults(defineProps<{
  seal?: string
  size?: number | string
}>(), {
  size: 48,
})

const cfgSeal = usePkuConfig('seal')

const src = computed(() => props.seal ?? cfgSeal.value)
const pxSize = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)
</script>

<template>
  <img
    v-if="src"
    class="pku-seal"
    :src="resolveAssetUrl(src)"
    alt="Institution seal"
  >
  <!-- Built-in vector seal: its fill follows currentColor and the theme color. -->
  <span
    v-else
    class="pku-seal pku-seal-vector"
    aria-hidden="true"
    v-html="sealDefault"
  />
</template>

<style scoped>
.pku-seal {
  display: inline-block;
  width: v-bind(pxSize);
  height: v-bind(pxSize);
}
.pku-seal-vector {
  color: var(--slidev-theme-sealColor, var(--slidev-theme-sealColor, var(--pku-deep)));
}
.pku-seal-vector :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
