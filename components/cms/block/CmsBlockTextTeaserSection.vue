<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/block/CmsBlockTextTeaserSection.vue
import type { CmsBlockTextTeaserSection } from '@shopware/composables';

defineProps<{
    content: CmsBlockTextTeaserSection;
}>();
</script>

<template>
    <!-- change: remove container class, and fix responsivity, can be removed when fix in shopware is published -->
    <div class="mx-auto grid gap-4 py-6 md:grid-cols-3">
        <CmsGenericElement
            v-for="(slot, i) in content.slots"
            :key="slot.id"
            :content="slot"
            class="cms-block-text-teaser-section"
            :class="{
                'md:col-span-1': i === 0,
                'md:col-span-2': i === 1,
            }"
        />
    </div>
</template>
