import { computed, type Ref } from 'vue'
import { useSlideContext } from '@slidev/client'
import type { CSSProperties } from 'vue'

/**
 * Resolve urls from frontmatter and append with the base url
 */
export function resolveAssetUrl(url: string) {
  if (!url.startsWith('/'))
    return url
  const base = import.meta.env.BASE_URL
  return (base.endsWith('/') ? base : `${base}/`) + url.slice(1)
}

export function handleBackground(background?: string, dim = false): CSSProperties {
  const isColor = background && ['#', 'rgb', 'hsl'].some(v => background.indexOf(v) === 0)

  const style: CSSProperties = {
    background: isColor ? background : undefined,
    backgroundImage: isColor || !background
      ? undefined
      : dim
        ? `linear-gradient(#0005, #0008), url(${resolveAssetUrl(background)})`
        : `url("${resolveAssetUrl(background)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  if (!style.background)
    delete style.background

  return style
}

/**
 * The current slide's `$slidev` context (the same value exposed as `$slidev`
 * in a template).
 */
export function useSlidevGlobal(): Ref<any> {
  const { $slidev } = useSlideContext()
  return computed(() => $slidev)
}

/**
 * Frontmatter for the current slide, including the merged headmatter from the
 * first slide. Slidev injects `$frontmatter` as a reactive object rather than
 * a ref, so this helper exposes a consistent computed ref.
 */
export function useFrontmatter(): Ref<Record<string, any>> {
  const { $frontmatter } = useSlideContext()
  return computed(() => ($frontmatter ?? {}) as Record<string, any>)
}

/**
 * Read a theme configuration value. A root-level headmatter key takes
 * precedence over the corresponding `themeConfig` key.
 * For example, `usePkuConfig('seal')` reads `seal:` or `themeConfig.seal:`.
 */
export function usePkuConfig(key: string) {
  const $slidev = useSlidevGlobal()
  return computed<any>(() => $slidev.value?.configs?.[key] ?? $slidev.value?.themeConfigs?.[key])
}
