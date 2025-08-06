<script setup lang="ts">
import { ref, onMounted } from '#imports'

defineOptions({
  name: 'UiList',
})

const props = defineProps<{
  orientation?: 'horizontal' | 'vertical'
  nestingCount?: number
  animationDurationMs?: number
  animationSizeRem?: number
  staggerDelayMs?: number
}>()

const list = ref<HTMLElement | null>(null)
const items = ref<HTMLElement[]>([])

const getNthNestedChildren = (
  element: HTMLElement,
  n: number,
): HTMLElement[] => {
  if (n <= 0) return []
  const children = Array.from(element.children) as HTMLElement[]
  return children.reduce((acc: HTMLElement[], child) => {
    acc.push(child)
    acc.push(...getNthNestedChildren(child, n - 1))
    return acc
  }, [])
}

onMounted(() => {
  if (!list.value) return

  items.value = getNthNestedChildren(list.value, props.nestingCount || 1)

  items.value.forEach((item, index) => {
    item.style.opacity = '0'
    item.style.transform = `translateY(${props.animationSizeRem || 0.5}rem)`
    item.style.transition = `opacity ${
      props.animationDurationMs || 300
    }ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${
      props.animationDurationMs || 300
    }ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`

    setTimeout(() => {
      item.style.opacity = '1'
      item.style.transform = 'translateY(0)'
    }, index * (props.staggerDelayMs || 100))
  })
})
</script>

<template>
  <div
    ref="list"
    class="list"
    :class="`list-${props.orientation || 'vertical'}`"
  >
    <slot />
  </div>
</template>

<style scoped>
.list {
  overflow: hidden;
}

.list-horizontal {
  display: flex;
  flex-direction: row;
}

.list-vertical {
  display: flex;
  flex-direction: column;
}
</style>
