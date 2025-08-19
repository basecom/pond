<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockCenterText.vue
import type { CmsBlockCenterText } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
  content: CmsBlockCenterText;
}>();

const { getSlotContent } = useCmsBlock(props.content);
const slotLeftContent = getSlotContent('left');
const slotRightContent = getSlotContent('right');
const slotCenterContent = getSlotContent('center');
</script>

<template>
    <!-- Change styling & move styling to CmsGenericElement (otherwise we receive errors) -->
    <div class="cms-block-center-text grid md:grid-cols-3 md:gap-10 content-center">
        <CmsGenericElement :content="slotLeftContent" class="*:md:aspect-square *:md:object-contain *:md:h-auto *:content-center" />
        <CmsGenericElement :content="slotCenterContent" />
        <CmsGenericElement :content="slotRightContent" class="*:md:aspect-square *:md:object-contain *:md:h-auto *:content-center" />
    </div>
</template>
