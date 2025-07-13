<script setup lang="ts">
const isLoading = ref(true);
</script>

<template>
    <div class="flex justify-between items-center">
        <UiButton @click="isLoading = !isLoading">
            show Loaded State
        </UiButton>
        <div class="flex justify-center items-center">
            <LayoutLoader :is-loading="isLoading">
                <template #loading-spinner-content>
                    <div class="w-64 h-64 flex justify-center items-center border border-primary">
                        Content
                    </div>
                </template>
            </LayoutLoader>
        </div>
    </div>
</template>
