<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockImageSimpleGrid.vue
import type { CmsBlockImageThreeCover } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
    content: CmsBlockImageThreeCover;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftContent = getSlotContent('left');
const rightContent = getSlotContent('right');
const centerContent = getSlotContent('center');
</script>

<template>
    <!-- remove gap -->
    <div class="cms-block-image-three-cover grid md:grid-cols-3">
        <CmsGenericElement :content="leftContent" />
        <CmsGenericElement :content="centerContent" />
        <CmsGenericElement :content="rightContent" />
    </div>
</template>

<style scoped>
/* change styling */
.cms-block-image-three-cover .cms-element-image img {
    @apply aspect-square object-cover;
}
</style>
