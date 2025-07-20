<script setup lang="ts">

const saveHandler = useSaveHandler();

const save = async () => {
    console.log('Saving all changes...');
    await saveHandler.saveAll();
};

</script>

<template>
    <main>
        <div class="flex justify-center items-center my-4">
            <button @click="save()" 
            class="bg-blue-500 text-white px-4 py-2 rounded">
                Save All Changes
            </button>
        </div>
        <h1 class="text-2xl font-bold text-center my-4">
            <EditableAdminContent content-id="heading-text" class="text-center w-fit">
            </EditableAdminContent>
        </h1>
    </main>
</template>

<style scoped>
textarea:focus,
input:focus {
    outline: none;
}
</style>