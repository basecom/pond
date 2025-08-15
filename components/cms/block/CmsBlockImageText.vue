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
    <!-- Added responsive design -->
    <div class="grid md:grid-cols-2 md:gap-10">
        <CmsGenericElement :content="leftContent" />
        <!-- Added mt-0 -->
        <CmsGenericElement class="*:mt-0" :content="rightContent" />
    </div>
</template>
