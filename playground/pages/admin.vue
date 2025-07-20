<script setup lang="ts">

const saveHandler = useSaveHandler();

const save = async () => {
    console.log('Saving all changes...');
    await saveHandler.saveAll();
};

</script>

<template>
    <main>
        <EditableSaveBtn></EditableSaveBtn>
        <h1 class="text-2xl font-bold text-center my-4">
            <EditableContentAdmin content-id="heading-text" class="text-center w-fit">
            </EditableContentAdmin>
        </h1>
        <EditableContentAreaAdmin content-id="area-a" class="text-center w-fit"></EditableContentAreaAdmin>
    </main>
</template>

<style scoped>
textarea:focus,
input:focus {
    outline: none;
}
</style>