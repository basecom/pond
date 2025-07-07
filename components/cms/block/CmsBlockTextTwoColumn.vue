<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/block/CmsBlockTextTwoColumn.vue
import type { CmsBlockTextTwoColumn } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
    content: CmsBlockTextTwoColumn;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftContent = getSlotContent('left');
const rightContent = getSlotContent('right');
</script>

<template>
    <!-- change: fix responsivity, can be removed when fix in shopware is published -->
    <article class="cms-block-text-two-column grid gap-5 md:grid-cols-2 md:gap-20">
        <CmsGenericElement
            :content="leftContent"
            class="cms-block-text-two-column__text"
        />
        <CmsGenericElement
            :content="rightContent"
            class="cms-block-text-two-column__text"
        />
    </article>
</template>
