<script setup lang="ts">
/**
 * Content-slide title bar: a bold accent-colored title with a gray rule and
 * short accent segment.
 */
withDefaults(defineProps<{
  title?: string
}>(), {})

const pxBarWidth = '255px'
const pxBarAccent = '62px'
</script>

<template>
  <div class="pku-title-bar">
    <div class="pku-title">{{ title }}<slot /></div>
    <div class="pku-title-rule">
      <span class="pku-title-rule-accent" />
    </div>
  </div>
</template>

<style scoped>
.pku-title-bar {
  position: absolute;
  top: 25px;
  left: 47px;
  right: 220px;
}
.pku-title {
  font-size: 32px;
  line-height: 1.25;
  font-weight: 700;
  color: var(--slidev-theme-primary);
}
.pku-title-rule {
  position: relative;
  margin-top: 10px;
  width: v-bind(pxBarWidth);
  height: 3px;
  background: var(--slidev-theme-line, var(--pku-line));
}
.pku-title-rule-accent {
  position: absolute;
  left: 0;
  top: 0;
  width: v-bind(pxBarAccent);
  height: 3px;
  background: var(--slidev-theme-primary);
}
</style>
