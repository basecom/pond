<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockImageBubbleRow.vue
import type { CmsBlockImageBubbleRow } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
    content: CmsBlockImageBubbleRow;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftContent = getSlotContent('left');
const rightContent = getSlotContent('right');
const centerContent = getSlotContent('center');
</script>

<template>
    <!-- change: move styling to CmsGenericElement (otherwise we receive errors) -->
    <div class="cms-block-image-bubble-row grid md:grid-cols-3 gap-10 *:w-[340px]">
        <div class="flex items-center justify-center mx-auto">
            <CmsGenericElement :content="leftContent" class="w-full *:object-cover *:overflow-hidden *:rounded-full *:aspect-square *:max-w-xs" />
        </div>
        <div class="flex items-center justify-center mx-auto">
            <CmsGenericElement :content="centerContent" class="w-full *:object-cover *:overflow-hidden *:rounded-full *:aspect-square *:max-w-xs" />
        </div>
        <div class="flex items-center justify-center mx-auto">
            <CmsGenericElement class="w-full *:object-cover *:overflow-hidden *:rounded-full *:aspect-square *:max-w-xs" :content="rightContent" />
        </div>
    </div>
</template>
