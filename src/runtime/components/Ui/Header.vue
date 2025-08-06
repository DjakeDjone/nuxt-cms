<template>
    <header class="ui-header">
        <UiThemeSwitch class="ui-switch" :size="25" />
        <div class="ui-header-links">
            <slot />
        </div>
    </header>
</template>

<style scoped>
.ui-switch {
    position: absolute;
    top: .5rem;
    right: .5rem;
}

.ui-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem;
    border-bottom: 1px solid var(--sui-fg);
}

.ui-header-links {
    display: flex;
    gap: 1rem;
}
</style>