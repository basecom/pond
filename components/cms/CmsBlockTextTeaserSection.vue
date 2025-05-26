<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/block/CmsBlockTextTeaserSection.vue
import type { CmsBlockTextTeaserSection } from '@shopware/composables';

defineProps<{
    content: CmsBlockTextTeaserSection;
}>();
</script>

<template>
    <!-- change: remove container class, because we have global paddings that we don't want here -->
    <!-- change: insert correct basis class -->
    <div class="mx-auto flex py-6">
        <CmsGenericElement
            v-for="(slot, i) in content.slots"
            :key="slot.id"
            :content="slot"
            class="cms-block-text-teaser-section flex"
            :class="{
                'basis-1/3 flex-col ': i == 0,
                'basis-2/3 pl-4 ': i == 1,
            }"
        />
    </div>
</template>
