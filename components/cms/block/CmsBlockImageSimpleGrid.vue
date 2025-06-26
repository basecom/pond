<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockImageSimpleGrid.vue
import type { CmsBlockImageSimpleGrid } from '@shopware/composables';
import { useCmsBlock } from '#imports';

const props = defineProps<{
    content: CmsBlockImageSimpleGrid;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftTopContent = getSlotContent('left-top');
const leftBottomContent = getSlotContent('left-bottom');
const rightContent = getSlotContent('right');
</script>

<template>
    <div class="grid md:grid-cols-2 gap-10">
        <div class="grid gap-10">
            <CmsGenericElement :content="leftTopContent" />
            <CmsGenericElement :content="leftBottomContent" />
        </div>

        <!-- change: add object-cover -->
        <CmsGenericElement class="*:object-cover" :content="rightContent" />
    </div>
</template>
