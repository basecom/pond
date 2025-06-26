<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockImageHighlightRow.vue
import type { CmsBlockImageHighlightRow } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
    content: CmsBlockImageHighlightRow;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftContent = getSlotContent('left');
const rightContent = getSlotContent('right');
const centerContent = getSlotContent('center');
</script>

<template>
    <!-- change: add our custom gray & a padding -->
    <div class="cms-block-image-highlight-row grid md:grid-cols-3 gap-10 bg-gray-200 p-4">
        <CmsGenericElement class="*:border-8 *:border-white" :content="leftContent" />
        <CmsGenericElement class="*:border-8 *:border-white" :content="centerContent" />
        <CmsGenericElement class="*:border-8 *:border-white" :content="rightContent" />
    </div>
</template>
