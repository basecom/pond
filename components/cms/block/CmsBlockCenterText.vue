<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockCenterText.vue
import type { CmsBlockCenterText } from "@shopware/composables";
import { useCmsBlock } from "#imports";

const props = defineProps<{
  content: CmsBlockCenterText;
}>();

const { getSlotContent } = useCmsBlock(props.content);
const slotLeftContent = getSlotContent("left");
const slotRightContent = getSlotContent("right");
const slotCenterContent = getSlotContent("center");
</script>
<template>
  <!-- Change styling -->
  <div class="cms-block-center-text grid md:grid-cols-3 md:gap-10 content-center">
    <CmsGenericElement :content="slotLeftContent" />
    <CmsGenericElement :content="slotCenterContent" />
    <CmsGenericElement :content="slotRightContent" />
  </div>
</template>

<style>
/* change styling */
.cms-block-center-text .cms-element-image img {
    @media (width >= 640px) {
      @apply aspect-square object-contain h-auto;
    }
}

.cms-block-center-text .cms-element-image {
  @apply content-center;
}
</style>
