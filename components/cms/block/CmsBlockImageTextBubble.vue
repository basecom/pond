<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockImageTextBubble.vue
import type { CmsBlockImageTextBubble } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
  content: CmsBlockImageTextBubble;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftText = getSlotContent('left-text');
const leftImage = getSlotContent('left-image');
const centerText = getSlotContent('center-text');
const centerImage = getSlotContent('center-image');
const rightText = getSlotContent('right-text');
const rightImage = getSlotContent('right-image');
</script>

<template>
    <!-- Change styling -->
    <div class="cms-block-image-text-bubble grid md:grid-cols-3">
        <div class="cms-element-column p-4">
            <div class="flex justify-center">
                <CmsGenericElement
                    :content="leftImage"
                    class="*:object-center *:rounded-full *:aspect-square"
                />
            </div>
            <CmsGenericElement :content="leftText" />
        </div>
        <div class="cms-element-column p-4">
            <div class="flex justify-center">
                <CmsGenericElement
                    :content="centerImage"
                    class="*:object-center *:rounded-full *:aspect-square"
                />
            </div>
            <CmsGenericElement :content="centerText" />
        </div>
        <div class="cms-element-column p-4">
            <div class="flex justify-center">
                <CmsGenericElement
                    :content="rightImage"
                    class="*:object-center *:rounded-full *:aspect-square"
                />
            </div>
            <CmsGenericElement :content="rightText" />
        </div>
    </div>
</template>
