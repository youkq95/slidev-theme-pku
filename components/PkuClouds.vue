<script setup lang="ts">
import cloudsDefault from '../assets/clouds.svg?raw'

/** Decorative vector pattern (22% opacity by default). */
withDefaults(defineProps<{
  width?: number | string
  opacity?: number
}>(), {
  width: 320,
  opacity: 0.22,
})
</script>

<template>
  <span
    class="pku-clouds"
    :style="{ width: typeof width === 'number' ? `${width}px` : width, opacity }"
    aria-hidden="true"
    v-html="cloudsDefault"
  />
</template>

<style scoped>
.pku-clouds {
  display: inline-block;
  pointer-events: none;
  color: #FFFFFF;
}
.pku-clouds :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
