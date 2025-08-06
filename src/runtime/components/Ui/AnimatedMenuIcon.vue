<script setup lang="ts">
const props = defineProps<{ opened: boolean }>()
</script>

<template>
    <button class="menu-icon" aria-label="Toggle menu">
        <svg width="32" height="32" viewBox="0 0 32 32">
            <rect :class="['bar', 'bar1', { opened: props.opened }]" x="6" y="9" width="20" height="2" rx="1" />
            <rect :class="['bar', 'bar2', { opened: props.opened }]" x="6" y="15" width="20" height="2" rx="1" />
            <rect :class="['bar', 'bar3', { opened: props.opened }]" x="6" y="21" width="20" height="2" rx="1" />
        </svg>
    </button>
</template>

<style scoped>
.menu-icon {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bar {
    fill: var(--sui-fg, #222);
    transition: transform 0.3s cubic-bezier(.4, 0, .2, 1), opacity 0.3s cubic-bezier(.4, 0, .2, 1);
}

.bar1.opened {
    transform-origin: center;
    transform: translateY(6px) rotate(45deg);
}

.bar2.opened {
    opacity: 0;
}

.bar3.opened {
    transform-origin: center;
    transform: translateY(-6px) rotate(-45deg);
}
</style>
