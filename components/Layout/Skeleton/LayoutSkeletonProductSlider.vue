<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    slides: Schemas['Product'][];
}>();
</script>

<template>
    <div class="grid size-full grid-cols-1 gap-6 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="(slide, index) in slides.slice(0, 4)" :key="slide.id">
            <LayoutSkeletonProductCard
                :class="[
                    index === 1 && 'hidden sm:block',
                    index === 2 && 'hidden md:block',
                    index === 3 && 'hidden lg:block'
                ]"
            />
        </div>
    </div>
</template>
