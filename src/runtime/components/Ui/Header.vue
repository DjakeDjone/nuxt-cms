<script setup lang="ts">
import { useState, watch, onMounted } from '#imports'
import AnimatedMenuIcon from './AnimatedMenuIcon.vue'

defineOptions({ name: 'UiHeader' })

const openedNav = useState<boolean>('openedNav', () => false)

watch(openedNav, (newVal) => {
    if (import.meta.client) {
        if (newVal) {
            document.body.classList.add('no-scroll')
        }
        else {
            document.body.classList.remove('no-scroll')
        }
    }
})

onMounted(() => {
    if (import.meta.client && openedNav.value) {
        document.body.classList.add('no-scroll')
    }
})
</script>

<template>
    <header class="ui-header">
        <AnimatedMenuIcon :opened="openedNav" class="ui-header-btn" @click="openedNav = !openedNav" />
        <div :class="openedNav ? 'ui-header-content-opened' : 'ui-header-content-closed-mobile'"
            class="ui-header-content">
            <div class="ui-header-content-inner centered-flex">
                <NuxtLink to="/" class="ui-header-logo" @click="openedNav = false">
                    <slot name="logo">
                        HOME
                    </slot>
                </NuxtLink>
                <div class="ui-header-links centered-flex" @click="openedNav = false">
                    <slot />
                </div>
                <UiThemeSwitch class="ui-switch" :size="25" />
            </div>
        </div>
    </header>
</template>

<style scoped>
.centered-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.ui-header-btn {
    position: sticky;
    left: 0.5rem;
    top: 0.5rem;
    z-index: 1001;
}

.ui-header-content {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--sui-transparent-bg);
    backdrop-filter: blur(5px);
    border-radius: 0.25rem;
    transition: height 0.3s ease-in-out;
}

.ui-header-content-opened {
    opacity: 1;
    height: 100vh;
    z-index: 100;
}

.ui-header-content-closed-mobile {
    /* opacity: 0; */
    height: 0;
    overflow: hidden;
}

.ui-header-content-inner {
    padding: 0.5rem;
    gap: 0.5rem;
    height: calc(100vh - 8rem);
}

.ui-switch {
    position: fixed;
    right: .5rem;
    top: .5rem;
}

@media (min-width: 600px) {
    .ui-header {
        padding-bottom: 3rem;
    }

    .ui-header-btn {
        display: none;
    }

    .centered-flex {
        flex-direction: row;
        justify-content: space-between;
        gap: .5rem;
    }

    .ui-switch {
        position: relative;
        right: 0;
        top: 0;
    }

    .ui-header-content {
        height: auto;
        overflow: visible;
        opacity: 1;

    }

    .ui-header-content-inner {
        height: auto;
        padding: 1rem;
    }
}
</style>

<style>
body.no-scroll {
    overflow: hidden;
}
</style>
