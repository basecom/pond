<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/block/CmsBlockProductListing.vue
import type { CmsBlockProductListing } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
  content: CmsBlockProductListing;
}>();

const { getSlotContent } = useCmsBlock(props.content);
const slotContent = getSlotContent('content');
</script>

<template>
    <div>
        <CmsGenericElement v-if="slotContent" :content="slotContent" />
    </div>
</template>
