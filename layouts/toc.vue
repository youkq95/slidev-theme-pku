<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import PkuSeal from '../components/PkuSeal.vue'
import PkuClouds from '../components/PkuClouds.vue'
import { useFrontmatter } from '../layout-helper'

/**
 * Table of contents: a red panel and white card on the left, with numbered
 * entries (01, 02, ...) on the right.
 *
 * Entries are collected from slide `title` frontmatter. Set `hideInToc: true`
 * to omit a slide; cover, toc, section, and thanks layouts are omitted too.
 * Clicking an entry navigates to that slide.
 *
 * Frontmatter: `tocTitle` (defaults to `Contents`), `tocEn`
 * (defaults to `CONTENTS`), and `noSeal`.
 */
const props = withDefaults(defineProps<{
  tocTitle?: string
  tocEn?: string
  noSeal?: boolean
}>(), {
  tocTitle: 'Contents',
  tocEn: 'CONTENTS',
})

const fm = useFrontmatter()
const { slides, go } = useNav()

interface TocItem { page: number, title: string, level: number }

const items = computed<TocItem[]>(() => {
  const out: TocItem[] = []
  slides.value.forEach((route, i) => {
    // Always treat the first slide as the cover, even without an explicit layout.
    if (i === 0)
      return
    const slide = route?.meta?.slide
    const slideFm = slide?.frontmatter ?? {}
    if (slideFm.hideInToc)
      return
    if (['toc', 'cover', 'section', 'thanks'].includes(slideFm.layout))
      return
    const title = slideFm.title
    if (!title)
      return
    out.push({ page: i + 1, title, level: slideFm.level ?? 1 })
  })
  return out
})

const tocTitle = computed(() => fm.value.tocTitle ?? props.tocTitle)
const tocEn = computed(() => fm.value.tocEn ?? props.tocEn)
</script>

<template>
  <div class="slidev-layout pku-toc">
    <!-- Red panel on the left. -->
    <div class="pku-toc-red" />
    <PkuClouds class="pku-toc-clouds" :width="430" />

    <!-- White contents card. -->
    <div class="pku-toc-card">
      <div class="pku-toc-left">
        <div class="pku-toc-heading">
          <div class="pku-toc-title">{{ tocTitle }}</div>
          <div class="pku-toc-en">{{ tocEn }}</div>
        </div>
        <PkuSeal v-if="!(fm.noSeal ?? noSeal)" class="pku-toc-seal" :size="204" />
      </div>

      <div class="pku-toc-right">
        <slot :items="items">
          <div
            v-for="(item, i) in items"
            :key="item.page"
            class="pku-toc-item"
            :class="[`level-${item.level}`]"
            @click="go(item.page)"
          >
            <span class="pku-toc-num">{{ String(i + 1).padStart(2, '0') }}.</span>
            <span class="pku-toc-text">{{ item.title }}</span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pku-toc {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--slidev-theme-bg, var(--pku-bg));
}
.pku-toc-red {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 50%;
  background: var(--slidev-theme-primary);
}
.pku-toc-clouds {
  position: absolute;
  left: -36px;
  bottom: -30px;
}
.pku-toc-card {
  position: absolute;
  left: 62px;
  top: 50px;
  width: 1156px;
  height: 620px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 22%);
  display: flex;
}
.pku-toc-left {
  width: 42%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 46px;
  padding: 30px 0;
}
.pku-toc-heading {
  text-align: center;
  color: var(--slidev-theme-primary);
}
.pku-toc-title {
  font-size: 72px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-indent: 0.18em;
  line-height: 1.2;
}
.pku-toc-en {
  margin-top: 6px;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 0.1em;
  font-family: Arial, sans-serif;
}
.pku-toc-seal {
  color: var(--slidev-theme-sealColor, var(--pku-deep));
}
.pku-toc-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 56px;
  padding: 0 70px 0 8px;
}
.pku-toc-item {
  display: flex;
  align-items: baseline;
  gap: 34px;
  cursor: pointer;
}
.pku-toc-num {
  font-size: 42px;
  font-weight: 700;
  color: var(--slidev-theme-primary);
  font-family: Arial, sans-serif;
  line-height: 1;
  white-space: nowrap;
}
.pku-toc-text {
  font-size: 30px;
  color: var(--slidev-theme-text, var(--pku-text));
  line-height: 1.4;
}
.pku-toc-item:hover .pku-toc-text {
  color: var(--slidev-theme-primary);
}
.pku-toc-item.level-2 {
  padding-left: 76px;
}
.pku-toc-item.level-2 .pku-toc-text {
  font-size: 26px;
}
</style>
