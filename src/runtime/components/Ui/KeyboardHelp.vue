<script setup lang="ts">
defineOptions({
    name: 'UiKeyboardHelp',
})

</script>

<template>
    <div class="keyboard-help">
        <b>
            <slot name="title">Keyboard Shortcuts</slot>
        </b>
        <slot></slot>
    </div>
</template>

<style>
.keyboard-help {
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: var(--sui-active-bg);
    border-radius: var(--sui-border-radius);
    border: 1px solid var(--sui-border);
}

.keyboard-help b {
    line-height: 1.4;
}
</style>