<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useFrontmatter } from '../layout-helper'

/**
 * Footer with a hairline, an optional footnote on the left, and a page number
 * on the right.
 */
const props = withDefaults(defineProps<{
  /** Footnote text, falling back to the slide's `footnote:` frontmatter. */
  footnote?: string
  /** Hide the page number. */
  noPageNum?: boolean
  /** Hide the hairline. */
  noLine?: boolean
}>(), {})

const fm = useFrontmatter()
const { currentPage } = useNav()

const footnote = computed(() => props.footnote ?? fm.value.footnote)
</script>

<template>
  <footer class="pku-footer">
    <div v-if="!noLine" class="pku-footer-line" />
    <div class="pku-footer-row">
      <div v-if="footnote" class="pku-footnote">
        <slot name="footnote"><span v-html="footnote" /></slot>
      </div>
      <div v-if="!noPageNum" class="pku-pagenum">&lt;&ensp;{{ currentPage }}&ensp;&gt;</div>
    </div>
  </footer>
</template>

<style scoped>
.pku-footer {
  position: absolute;
  left: 47px;
  right: 47px;
  top: 640px;
}
.pku-footer-line {
  height: 1px;
  background: var(--slidev-theme-hairline, var(--pku-hairline));
}
.pku-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  margin-top: 8px;
}
.pku-footnote {
  font-size: 15px;
  color: var(--slidev-theme-textSecondary, var(--pku-text-secondary));
  line-height: 1.4;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pku-pagenum {
  font-size: 18px;
  color: var(--slidev-theme-text, var(--pku-text));
  white-space: nowrap;
  margin-left: auto;
}
</style>
