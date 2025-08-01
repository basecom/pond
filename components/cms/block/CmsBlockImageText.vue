<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockImageText.vue
import type { CmsBlockImageText } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
  content: CmsBlockImageText;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftContent = getSlotContent('left');
const rightContent = getSlotContent('right');
</script>
<template>
    <div class="cms-block-image-text grid md:grid-cols-2 md:gap-10">
        <CmsGenericElement :content="leftContent" />
        <CmsGenericElement class="" :content="rightContent" />
    </div>
</template>

<style>
/* change styling */
.cms-block-image-text .cms-element-image img {
  @apply object-contain;
}

.cms-block-image-text p, .cms-block-image-text h1, .cms-block-image-text h2, .cms-block-image-text h3 {
    margin-top: 0;
}
</style>
