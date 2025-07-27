<script setup lang="ts">
import { UiBtn } from '#components'
import type { Editor } from '@tiptap/core'

defineOptions({
  name: 'TiptapNav',
})

const props = defineProps<{
  editor: Editor | undefined
}>()

const showEditorBorder = defineModel<boolean>('showEditorBorder', {
  default: false,
  type: Boolean,
})

const focusedChain = () => {
  if (!props.editor) return
  return props.editor.chain().focus()
}

const getCurrentHeading = () => {
  if (!props.editor) return ''
  const heading = props.editor.getAttributes('heading')
  return heading.level ? `H${heading.level}` : 'Paragraph'
}
</script>

<template>
  <nav class="actions-bar">
    <UiTooltip content="Border">
      <UiSwitchCrossed
        v-model="showEditorBorder"
        :disabled="!props.editor"
      >
        B
      </UiSwitchCrossed>
    </UiTooltip>
    <UiOptions :nesting-count="2">
      <template #trigger>
        {{ getCurrentHeading() }}
      </template>
      <template #options>
        <UiBtnGroup>
          <UiBtn
            class="action-button"
            :active="props.editor?.isActive('heading', { level: 1 })"
            @click="focusedChain()?.toggleHeading({ level: 1 }).run()"
          >
            H1
          </UiBtn>
          <UiBtn
            class="action-button"
            :active="props.editor?.isActive('heading', { level: 2 })"
            @click="focusedChain()?.toggleHeading({ level: 2 }).run()"
          >
            H2
          </UiBtn>
          <UiBtn
            class="action-button"
            :active="props.editor?.isActive('heading', { level: 3 })"
            @click="focusedChain()?.toggleHeading({ level: 3 }).run()"
          >
            H3
          </UiBtn>
        </UiBtnGroup>
      </template>
    </UiOptions>

    <!-- align -->
    <UiBtnGroup rounded>
      <UiBtn
        class="action-button"
        :active="props.editor?.isActive({ textAlign: 'left' })"
        @click="focusedChain()?.setTextAlign('left').run()"
      >
        <Icon
          name="line-md:align-left"
          size="20"
        />
      </UiBtn>
      <UiBtn
        class="action-button"
        :active="props.editor?.isActive({ textAlign: 'center' })"
        @click="focusedChain()?.setTextAlign('center').run()"
      >
        <Icon
          name="line-md:align-center"
          size="20"
        />
      </UiBtn>
      <UiBtn
        class="action-button"
        :active="props.editor?.isActive({ textAlign: 'right' })"
        @click="focusedChain()?.setTextAlign('right').run()"
      >
        <Icon
          name="line-md:align-right"
          size="20"
        />
      </UiBtn>
      <UiBtn
        class="action-button"
        :active="props.editor?.isActive({ textAlign: 'justify' })"
        @click="focusedChain()?.setTextAlign('justify').run()"
      >
        <Icon
          name="line-md:align-justify"
          size="20"
        />
      </UiBtn>
    </UiBtnGroup>

    <!-- list -->
    <UiOptions :nesting-count="2">
      <template #trigger>
        List
      </template>
      <template #options>
        <UiBtnGroup>
          <UiBtn
            class="action-button"
            :active="props.editor?.isActive('bulletList')"
            @click="focusedChain()?.toggleBulletList().run()"
          >
            <Icon
              name="line-md:list-3"
              size="20"
            />
          </UiBtn>
          <UiBtn
            class="action-button"
            :active="props.editor?.isActive('orderedList')"
            @click="focusedChain()?.toggleOrderedList().run()"
          >
            <Icon
              name="bi:list-ol"
              size="20"
            />
          </UiBtn>
        </UiBtnGroup>
      </template>
    </UiOptions>
    <UiOptions :nesting-count="2">
      <template #trigger>
        More
      </template>
      <template #options>
        <UiBtnGroup>
          <UiBtn
            class="action-button"
            :active="props.editor?.isActive('blockquote')"
            @click="focusedChain()?.toggleBlockquote().run()"
          >
            Blockquote
          </UiBtn>
          <UiBtn
            class="action-button"
            :active="props.editor?.isActive('code')"
            @click="focusedChain()?.toggleCode().run()"
          >
            <code>Code</code>
          </UiBtn>
        </UiBtnGroup>
      </template>
    </UiOptions>
  </nav>
</template>

<style>
.actions-bar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}
</style>
