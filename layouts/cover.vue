<script setup lang="ts">
import { computed } from 'vue'
import PkuSeal from '../components/PkuSeal.vue'
import { resolveAssetUrl, useFrontmatter, usePkuConfig } from '../layout-helper'
import defaultCover from '../assets/cover.jpg'

/**
 * Cover slide: an optional photo with an accent tint, a circular seal that
 * overlaps the photo, and title/metadata below it.
 *
 * Frontmatter: `title` / `subtitle` / `date` / `presenter` /
 * `supervisor` / `unit` / `discipline` / `coverImage` / `noImage` / `noInfo`.
 */
const props = withDefaults(defineProps<{
  subtitle?: string
  date?: string
  presenter?: string
  supervisor?: string
  unit?: string
  discipline?: string
  /** Custom metadata rows; when set, the named fields above are ignored. */
  info?: string[]
  coverImage?: string
  noImage?: boolean
  noInfo?: boolean
}>(), {})

const fm = useFrontmatter()

// Headmatter custom keys (subtitle/date/presenter, etc.) are exposed through
// the global config and used as fallbacks. `usePkuConfig` depends on inject and
// therefore must be called synchronously at setup's top level.
const cfgSubtitle = usePkuConfig('subtitle')
const cfgDate = usePkuConfig('date')
const cfgPresenter = usePkuConfig('presenter')
const cfgSupervisor = usePkuConfig('supervisor')
const cfgUnit = usePkuConfig('unit')
const cfgDiscipline = usePkuConfig('discipline')
const cfgInfo = usePkuConfig('info')
const cfgCoverImage = usePkuConfig('coverImage')

const image = computed(() => fm.value.coverImage ?? props.coverImage ?? cfgCoverImage.value)
const subtitle = computed(() => fm.value.subtitle ?? props.subtitle ?? cfgSubtitle.value)
const date = computed(() => fm.value.date ?? props.date ?? cfgDate.value)
const presenter = computed(() => fm.value.presenter ?? props.presenter ?? cfgPresenter.value)
const supervisor = computed(() => fm.value.supervisor ?? props.supervisor ?? cfgSupervisor.value)
const unit = computed(() => fm.value.unit ?? props.unit ?? cfgUnit.value)
const discipline = computed(() => fm.value.discipline ?? props.discipline ?? cfgDiscipline.value)

const rows = computed<{ label: string, value: string }[][]>(() => {
  const info = fm.value.info ?? props.info ?? cfgInfo.value
  if (info?.length) {
    const items = info.map((line: string) => {
      const m = line.match(/^([^：:]{1,12})[：:]\s*(.*)$/)
      return m ? { label: m[1], value: m[2] } : { label: '', value: line }
    })
    const half = Math.ceil(items.length / 2)
    return [items.slice(0, half), items.slice(half)].filter(c => c.length)
  }
    const left = [
      ['Presenter', presenter.value],
      ['Supervisor', supervisor.value],
    ].filter(([, v]) => !!v).map(([label, value]) => ({ label, value }))
    const right = [
      ['Affiliation', unit.value],
      ['Field', discipline.value],
    ].filter(([, v]) => !!v).map(([label, value]) => ({ label, value }))
    return [left, right].filter(c => c.length)
})
</script>

<template>
  <div class="slidev-layout pku-cover">
    <!-- Optional cover photo and accent tint. -->
    <div v-if="!(fm.noImage ?? noImage)" class="pku-cover-photo">
      <img :src="resolveAssetUrl(image || defaultCover)" alt="">
      <div class="pku-cover-tint" />
    </div>

    <!-- Seal on a white disc, overlapping the bottom edge of the photo. -->
    <div class="pku-cover-seal-wrap">
      <span class="pku-cover-seal-disc" />
      <PkuSeal class="pku-cover-seal" :size="144" />
    </div>

    <!-- The title comes from frontmatter; the injected h1 is hidden below. -->
    <div class="pku-cover-main">
      <h1 class="pku-cover-title">{{ fm.title }}</h1>
      <div v-if="subtitle" class="pku-cover-subtitle">{{ subtitle }}</div>
      <div v-if="date" class="pku-cover-date">{{ date }}</div>
    </div>

    <!-- Optional presenter and affiliation metadata. -->
    <div v-if="!(fm.noInfo ?? noInfo) && rows.length" class="pku-cover-info">
      <div v-for="(col, ci) in rows" :key="ci" class="pku-cover-info-col">
        <div v-for="row in col" :key="row.label + row.value" class="pku-cover-info-row">
          <template v-if="row.label"><span class="pku-cover-info-label">{{ row.label }}:</span>{{ row.value }}</template>
          <template v-else>{{ row.value }}</template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pku-cover {
  position: absolute;
  inset: 0;
  overflow: hidden;
  text-align: center;
}
/* Hide Slidev's automatically injected frontmatter title h1. */
.pku-cover :deep(h1) {
  display: none;
}
.pku-cover-title.pku-cover-title {
  display: block;
}
.pku-cover-photo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 312px;
}
.pku-cover-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}
.pku-cover-tint {
  position: absolute;
  inset: 0;
  background: var(--slidev-theme-primary);
  opacity: 0.23;
}
.pku-cover-seal-wrap {
  position: absolute;
  top: 228px;
  left: 50%;
  transform: translateX(-50%);
  width: 166px;
  height: 166px;
}
.pku-cover-seal-disc {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 14px rgb(0 0 0 / 10%);
}
.pku-cover-seal {
  position: absolute;
  inset: 11px;
}
.pku-cover-main {
  position: absolute;
  top: 400px;
  left: 60px;
  right: 60px;
}
.pku-cover-title {
  font-size: 40px;
  font-weight: 700;
  color: var(--slidev-theme-text, var(--pku-text));
  line-height: 1.3;
  margin: 0;
}
.pku-cover-subtitle {
  margin-top: 14px;
  font-size: 30px;
  font-weight: 700;
  color: var(--slidev-theme-text, var(--pku-text));
}
.pku-cover-date {
  margin-top: 14px;
  font-size: 20px;
  font-weight: 600;
  color: var(--slidev-theme-text, var(--pku-text));
}
.pku-cover-info {
  position: absolute;
  bottom: 56px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 90px;
}
.pku-cover-info-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: left;
}
.pku-cover-info-row {
  font-size: 24px;
  color: var(--slidev-theme-text, var(--pku-text));
  line-height: 1.4;
  border-left: 6px solid var(--slidev-theme-primary);
  padding-left: 16px;
}
.pku-cover-info-label {
  font-weight: 700;
}
</style>
