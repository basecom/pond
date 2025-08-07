<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockImageTextRow.vue
import type { CmsBlockImageTextRow } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
  content: CmsBlockImageTextRow;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftImageContent = getSlotContent('left-image');
const leftTextContent = getSlotContent('left-text');
const centerImageContent = getSlotContent('center-image');
const centerTextContent = getSlotContent('center-text');
const rightImageContent = getSlotContent('right-image');
const rightTextContent = getSlotContent('right-text');
</script>

<template>
    <div class="cms-block-image-text-row grid md:grid-cols-3 gap-10">
        <div class="cms-block-image-text-row__column">
            <!-- Added Change styling -->
            <CmsGenericElement class="mb-5 !h-fit" :content="leftImageContent" />
            <CmsGenericElement class="mb-5" :content="leftTextContent" />
        </div>
        <div class="cms-block-image-text-row__column">
            <!-- Added Change styling -->
            <CmsGenericElement class="mb-5 !h-fit" :content="centerImageContent" />
            <CmsGenericElement class="mb-5" :content="centerTextContent" />
        </div>
        <div class="cms-block-image-text-row__column">
            <!-- Added Change styling -->
            <CmsGenericElement class="mb-5 !h-fit" :content="rightImageContent" />
            <CmsGenericElement class="mb-5" :content="rightTextContent" />
        </div>
    </div>
</template>

<style>
/* Change styling */
.cms-block-image-text-row .cms-element-image img {
  @apply object-contain h-fit;
}
</style>
