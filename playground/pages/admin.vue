<template>
    <main>
        <h1 class="text-2xl font-bold text-center my-4">
            <EditableAdminContent content-id="heading-text">
                <template #default="{ content, onSave }">
                    <input v-model="content" placeholder="Editable content here..." />
                </template>
            </EditableAdminContent>
        </h1>
    </main>
</template>